#!/usr/bin/env python3
"""
Fetches AI news from RSS feeds, tags by phase relevance, writes data/news.json.
Run via GitHub Actions every 6 hours.
"""

import json
import hashlib
import re
import ssl
import urllib.request
import urllib.error
from datetime import datetime, timezone, timedelta
from xml.etree import ElementTree as ET

# macOS Python often lacks system certs; create a permissive context for local runs
_ssl_ctx = ssl.create_default_context()
_ssl_ctx.check_hostname = False
_ssl_ctx.verify_mode = ssl.CERT_NONE

# ── Phase keyword mapping ──────────────────────────────────────────────────────
PHASE_KEYWORDS = {
    "p1": [
        "llm", "language model", "gpt", "claude", "gemini", "mistral", "llama",
        "openai", "anthropic", "api", "prompt", "inference", "token", "context window",
        "ollama", "groq", "together ai", "litellm", "multimodal", "vision model",
        "completion", "chat model", "foundation model", "base model",
    ],
    "p2": [
        "rag", "retrieval", "embedding", "vector", "semantic search", "pgvector",
        "pinecone", "weaviate", "chroma", "qdrant", "faiss", "rerank",
        "hybrid search", "knowledge base", "document", "chunk", "index",
        "retrieval augmented", "dense retrieval", "sparse retrieval",
    ],
    "p3": [
        "agent", "multi-agent", "langgraph", "langchain", "mcp", "tool use",
        "function calling", "memory", "planning", "reasoning", "agentic",
        "autogen", "crewai", "tool calling", "orchestration", "workflow",
    ],
    "p4": [
        "evaluation", "eval", "benchmark", "ragas", "deepeval", "guardrails",
        "safety", "alignment", "red team", "hallucination", "faithfulness",
        "llm judge", "bias", "toxicity", "jailbreak", "robustness",
    ],
    "p5": [
        "fine-tun", "lora", "qlora", "peft", "sft", "rlhf", "dpo",
        "vllm", "triton", "deployment", "serving", "quantiz", "distill",
        "docker", "kubernetes", "monitoring", "drift", "mlops", "weight",
    ],
}

CATEGORY_KEYWORDS = {
    "models":   ["gpt", "claude", "gemini", "llama", "mistral", "release", "model", "benchmark"],
    "research": ["paper", "arxiv", "study", "research", "dataset", "training", "technique"],
    "tools":    ["open source", "github", "library", "framework", "sdk", "api", "tool", "launch"],
    "industry": ["funding", "acquisition", "partnership", "company", "startup", "revenue", "invest"],
    "community":["reddit", "hacker news", "discussion", "community", "opinion", "debate"],
}

FEEDS = [
    # Research papers
    {"url": "https://rss.arxiv.org/rss/cs.AI", "source": "ArXiv cs.AI", "weight": 2},
    {"url": "https://rss.arxiv.org/rss/cs.LG", "source": "ArXiv cs.LG", "weight": 2},
    {"url": "https://rss.arxiv.org/rss/cs.CL", "source": "ArXiv cs.CL", "weight": 2},
    # Lab blogs
    {"url": "https://openai.com/blog/rss.xml",             "source": "OpenAI",       "weight": 3},
    {"url": "https://blog.google/technology/ai/rss/",      "source": "Google AI",    "weight": 3},
    {"url": "https://huggingface.co/blog/feed.xml",        "source": "HuggingFace",  "weight": 2},
    {"url": "https://blog.langchain.dev/rss/",             "source": "LangChain",    "weight": 2},
    # News
    {"url": "https://venturebeat.com/category/ai/feed/",  "source": "VentureBeat",  "weight": 1},
    {"url": "https://techcrunch.com/tag/artificial-intelligence/feed/", "source": "TechCrunch", "weight": 1},
    {"url": "https://technologyreview.com/feed/",          "source": "MIT Tech Review", "weight": 2},
    {"url": "https://arstechnica.com/tag/ai/feed/",        "source": "Ars Technica", "weight": 1},
    # Newsletters
    {"url": "https://jack-clark.net/feed/",                "source": "Import AI",    "weight": 2},
    {"url": "https://thesequence.substack.com/feed",       "source": "TheSequence",  "weight": 2},
    # Community
    {"url": "https://www.reddit.com/r/MachineLearning/.rss",  "source": "r/ML",         "weight": 1},
    {"url": "https://www.reddit.com/r/LocalLLaMA/.rss",       "source": "r/LocalLLaMA", "weight": 1},
]

MAX_AGE_DAYS   = 30
MAX_ARTICLES   = 120
CUTOFF         = datetime.now(timezone.utc) - timedelta(days=MAX_AGE_DAYS)


def article_id(url: str) -> str:
    return hashlib.md5(url.encode()).hexdigest()[:12]


def clean(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text or "")
    text = re.sub(r"\s+", " ", text).strip()
    return text[:280]


def parse_date(raw: str) -> datetime | None:
    for fmt in [
        "%a, %d %b %Y %H:%M:%S %z",
        "%a, %d %b %Y %H:%M:%S GMT",
        "%Y-%m-%dT%H:%M:%S%z",
        "%Y-%m-%dT%H:%M:%SZ",
    ]:
        try:
            dt = datetime.strptime(raw.strip(), fmt)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt
        except ValueError:
            continue
    return None


def tag_phases(title: str, summary: str) -> list[str]:
    text = (title + " " + summary).lower()
    return [
        phase for phase, kws in PHASE_KEYWORDS.items()
        if any(kw in text for kw in kws)
    ] or ["p1", "p2", "p3", "p4", "p5"]  # untagged → show everywhere


def tag_category(title: str, summary: str) -> str:
    text = (title + " " + summary).lower()
    scores = {
        cat: sum(1 for kw in kws if kw in text)
        for cat, kws in CATEGORY_KEYWORDS.items()
    }
    return max(scores, key=scores.get)


def fetch_feed(feed: dict) -> list[dict]:
    url, source = feed["url"], feed["source"]
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "AI-Bootcamp-News/1.0"})
        with urllib.request.urlopen(req, timeout=10, context=_ssl_ctx) as resp:
            raw = resp.read()
    except Exception as e:
        print(f"  SKIP {source}: {e}")
        return []

    try:
        root = ET.fromstring(raw)
    except ET.ParseError as e:
        print(f"  PARSE ERROR {source}: {e}")
        return []

    ns = {"atom": "http://www.w3.org/2005/Atom"}
    items = root.findall(".//item") or root.findall(".//atom:entry", ns)
    articles = []

    for item in items:
        def t(tag):
            el = item.find(tag)
            if el is None:
                el = item.find(f"atom:{tag}", ns)
            return (el.text or "").strip() if el is not None else ""

        title   = clean(t("title"))
        link    = t("link") or t("url") or t("id")
        summary = clean(t("description") or t("summary") or t("content"))
        pub_raw = t("pubDate") or t("published") or t("updated")

        if not title or not link:
            continue

        pub = parse_date(pub_raw) if pub_raw else None
        if pub and pub < CUTOFF:
            continue

        articles.append({
            "id":        article_id(link),
            "title":     title,
            "url":       link.strip(),
            "source":    source,
            "published": pub.isoformat() if pub else None,
            "summary":   summary,
            "phases":    tag_phases(title, summary),
            "category":  tag_category(title, summary),
            "weight":    feed["weight"],
        })

    print(f"  OK  {source}: {len(articles)} articles")
    return articles


def main():
    print(f"Fetching {len(FEEDS)} feeds...")
    seen, articles = set(), []

    for feed in FEEDS:
        for a in fetch_feed(feed):
            if a["id"] not in seen:
                seen.add(a["id"])
                articles.append(a)

    # Sort: newer + higher weight first
    def sort_key(a):
        pub = a["published"] or "2000-01-01T00:00:00+00:00"
        return (a["weight"], pub)

    articles.sort(key=sort_key, reverse=True)
    articles = articles[:MAX_ARTICLES]

    out = {
        "generated": datetime.now(timezone.utc).isoformat(),
        "count":     len(articles),
        "articles":  articles,
    }

    with open("data/news.json", "w") as f:
        json.dump(out, f, indent=2)

    print(f"\nWrote {len(articles)} articles to data/news.json")


if __name__ == "__main__":
    main()
