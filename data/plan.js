const BOOTCAMP_DATA = {
  meta: {
    title: "AI Engineering Bootcamp",
    subtitle: "10 Weeks · 10 hrs/week · Full-stack AI engineering",
    totalWeeks: 10,
    hoursPerWeek: 10
  },
  phases: [

    /* ─────────────────────────────────────────────────────
       PHASE 1 — LLM Foundations & Multi-Provider APIs
       Weeks 1–2 · 10 days
    ───────────────────────────────────────────────────── */
    {
      id: "p1",
      weeks: "1–2",
      weekNumbers: [1, 2],
      color: "#7c6dfc",
      colorLight: "#1a1535",
      colorDark: "#5a4fd6",
      title: "LLM Foundations & Multi-Provider APIs",
      subtitle: "Weeks 1–2",
      overview: "Get fluent with every major LLM provider — OpenAI, Anthropic, Google Gemini, and open-source models via Ollama and Groq. Learn to unify them behind a single interface (LiteLLM), set up intelligent model routing with automatic fallbacks, slash costs with prompt caching and batch APIs, extract structured outputs with Pydantic, add voice I/O with Whisper, and apply the core prompt engineering techniques used in production.",
      deliverable: "Async multi-model benchmarking CLI: queries 5+ providers in parallel via LiteLLM, uses prompt caching, outputs a cost-and-latency Markdown table, and transcribes audio input via Whisper",
      skills: ["OpenAI API", "Anthropic API", "Google Gemini API", "Ollama", "Groq", "Together AI", "LiteLLM", "Model Routing & Fallbacks", "Prompt Caching", "Batch APIs", "Structured Outputs", "Pydantic", "instructor", "Whisper STT", "Streaming", "Prompt Engineering"],
      resources: [
        { type: "read",  title: "OpenAI API — Chat Completions reference",             url: "https://platform.openai.com/docs/api-reference/chat",                  time: "30 min" },
        { type: "read",  title: "Anthropic — API getting started",                     url: "https://docs.anthropic.com/en/api/getting-started",                   time: "30 min" },
        { type: "read",  title: "Google Gemini API — quickstart",                      url: "https://ai.google.dev/gemini-api/docs/quickstart",                    time: "25 min" },
        { type: "code",  title: "LiteLLM — 100+ LLMs, one interface",                 url: "https://docs.litellm.ai/docs/",                                       time: "45 min" },
        { type: "code",  title: "LiteLLM Router — load balancing & fallbacks",        url: "https://docs.litellm.ai/docs/routing",                                time: "30 min" },
        { type: "read",  title: "OpenAI Prompt Caching guide",                         url: "https://platform.openai.com/docs/guides/prompt-caching",               time: "20 min" },
        { type: "read",  title: "Anthropic Prompt Caching guide",                      url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching", time: "20 min" },
        { type: "code",  title: "OpenAI Structured Outputs + Pydantic",               url: "https://platform.openai.com/docs/guides/structured-outputs",           time: "30 min" },
        { type: "code",  title: "instructor — structured LLM outputs library",        url: "https://python.useinstructor.com/",                                   time: "25 min" },
        { type: "watch", title: "Andrej Karpathy — Let's build GPT from scratch",     url: "https://www.youtube.com/watch?v=kCc8FmEb1nY",                         time: "2 hr"   },
        { type: "read",  title: "Prompt Engineering Guide — promptingguide.ai",       url: "https://www.promptingguide.ai/",                                      time: "1 hr"   },
        { type: "code",  title: "Ollama — run models locally",                         url: "https://ollama.com/docs",                                             time: "20 min" }
      ],
      days: [
        {
          day: 1,
          title: "OpenAI API — First Call",
          challenge: "Install the OpenAI Python SDK. Make a `chat.completions.create()` call to `gpt-4o-mini`. Log the full response object including `usage.prompt_tokens`, `usage.completion_tokens`, and `usage.total_tokens`. Calculate exact USD cost using OpenAI's pricing page and print a formatted cost line. Then compare `temperature=0` vs `temperature=1` on the same creative writing prompt — document what changes.",
          check: "Script prints a coherent response plus a formatted cost line: `Input: $X.XXXX  Output: $X.XXXX  Total: $X.XXXX`. Temperature comparison shows measurable difference in output variability."
        },
        {
          day: 2,
          title: "Anthropic Claude API",
          challenge: "Install the `anthropic` SDK. Send the same benchmark prompt to `claude-3-5-haiku-20241022` using the `system` parameter for a system prompt. Compare GPT-4o-mini vs Claude Haiku side-by-side: token count, cost, latency, and a subjective quality rating. Explore Anthropic's `stop_sequences` and `top_k` parameters.",
          check: "Side-by-side comparison table in the terminal: model, input tokens, output tokens, cost, latency (ms), quality rating (1–5). Both providers working with one script."
        },
        {
          day: 3,
          title: "Google Gemini API",
          challenge: "Install `google-generativeai`. Call `gemini-1.5-flash` and `gemini-1.5-pro`. Explore Gemini's 1M-token context window: load a document >50k tokens (e.g., a book or large codebase), ask a question that requires reading the full text, and verify the answer would be impossible without the full context. Add Gemini to your comparison table.",
          check: "Gemini correctly answers a detail from a 50k+ token document that GPT-4o-mini (32k context) cannot reach. Comparison table now has 4 rows."
        },
        {
          day: 4,
          title: "Local Models with Ollama",
          challenge: "Install Ollama and pull `llama3.2:3b` and `mistral:7b`. Call both via Ollama's OpenAI-compatible REST API (`localhost:11434/v1/chat/completions`). Measure time-to-first-token and tokens/sec for each. Test offline by disconnecting from the internet. Add both to the comparison table.",
          check: "Both models run fully offline. Comparison table has 6 rows. Tokens/sec and time-to-first-token logged for each local model."
        },
        {
          day: 5,
          title: "Fast Inference — Groq & Together AI",
          challenge: "Sign up for Groq (free tier) and call `llama-3.1-70b-versatile` — record its tokens/sec (typically 500–800 t/s). Also call `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo` on Together AI. Compare the same 70B Llama model across: Together AI (cloud), Groq (LPU), and Ollama (local 3B). Discuss why the same architecture performs differently.",
          check: "Groq measurably outperforms OpenAI on tokens/sec for Llama. Comparison table complete with 8 rows covering 5 providers."
        },
        {
          day: 6,
          title: "LiteLLM — Unified Interface",
          challenge: "Refactor all previous provider calls to use `litellm.completion()`. A single function must target any provider by changing only the `model` string: `gpt-4o`, `claude-3-5-haiku-20241022`, `gemini/gemini-1.5-flash`, `ollama/llama3.2`, `groq/llama-3.1-70b-versatile`. Add a `--model` CLI flag. Use `litellm.get_max_tokens()` and `litellm.cost_per_token()` to compute costs uniformly.",
          check: "`python benchmark.py --model gpt-4o` and `--model ollama/llama3.2` both work identically. Cost computed correctly for all providers via LiteLLM's cost API."
        },
        {
          day: 7,
          title: "Model Routing & Automatic Fallbacks",
          challenge: "Set up a `LiteLLM Router` with three strategies: (1) round-robin load balancing between `gpt-4o-mini` and `claude-3-5-haiku`, (2) latency-based routing (route to the fastest responder), (3) a fallback chain: primary `gpt-4o` → fallback `claude-3-5-sonnet` → last resort `ollama/llama3.2`. Simulate a primary failure by injecting an invalid API key. Verify the fallback fires and the request succeeds.",
          check: "Router balances load across models (verify with request logs). Invalid primary key triggers automatic fallback to Claude. Local Ollama fallback works with no internet."
        },
        {
          day: 8,
          title: "Prompt Caching + Batch APIs",
          challenge: "**Prompt caching:** On Anthropic, add `cache_control: {type: 'ephemeral'}` to a system prompt >1024 tokens. Run the same request 5 times and log `cache_creation_input_tokens` vs `cache_read_input_tokens` — verify cache hits after the first call (cost drops ~90%). On OpenAI, use a shared system prompt >1024 tokens and observe automatic caching in the usage object. **Batch API:** Submit 20 requests as an OpenAI Batch (`.jsonl` file), poll status, and download results — verify the 50% cost reduction.",
          check: "Anthropic cache shows `cache_read_input_tokens > 0` on calls 2–5. OpenAI batch job completes and results downloaded. Cost comparison table shows ≥50% savings vs real-time API."
        },
        {
          day: 9,
          title: "Structured Outputs + Whisper STT",
          challenge: "**Structured outputs:** Define a Pydantic model `ResearchSummary(topic: str, key_points: list[str], confidence: float, sources_needed: bool)`. Use OpenAI's `response_format` with the Pydantic schema for GPT-4o. Use the `instructor` library to do the same with Claude. Verify both return valid instances with `isinstance()`. **Whisper:** Record or download a 1-minute audio file. Transcribe it with `openai.audio.transcriptions.create(model='whisper-1')`. Chain the transcript into your structured extraction — audio → text → Pydantic object.",
          check: "`isinstance(result, ResearchSummary)` is True for both providers. Whisper transcription is accurate. Full audio → structured object pipeline works end-to-end."
        },
        {
          day: 10,
          title: "Phase 1 Deliverable",
          challenge: "Build the multi-model benchmarking CLI: given a `--prompt` or `--file`, query 5+ models **in parallel** using `asyncio` and LiteLLM's async API (`litellm.acompletion()`). Apply prompt caching on the shared system prompt. Collect structured results per model using Pydantic: `BenchmarkResult(model, input_tokens, output_tokens, cost_usd, latency_ms, response)`. Output a Markdown table sorted by cost. Add a `--task` flag with presets: `reasoning`, `coding`, `summarization`. Support `--audio` flag to accept Whisper-transcribed input.",
          check: "CLI queries 5+ models concurrently and finishes in <20s total. Markdown table rendered with cost and latency columns. Prompt caching reduces cost on repeated runs (verified in logs). `--audio` flag transcribes input before querying."
        }
      ]
    },

    /* ─────────────────────────────────────────────────────
       PHASE 2 — Embeddings, RAG & Advanced Retrieval
       Weeks 3–4 · 10 days
    ───────────────────────────────────────────────────── */
    {
      id: "p2",
      weeks: "3–4",
      weekNumbers: [3, 4],
      color: "#00c6aa",
      colorLight: "#081f1c",
      colorDark: "#009985",
      title: "Embeddings, RAG & Advanced Retrieval",
      subtitle: "Weeks 3–4",
      overview: "Build production-grade retrieval-augmented generation from first principles. Compare embedding models across providers, stand up three vector databases, parse any document format with Unstructured.io and Docling, implement parent-child chunking, apply query transformation techniques (HyDE, multi-query, step-back), fuse BM25 and vector search with RRF, add cross-encoder reranking, build with both LlamaIndex and LangChain, use pgvector in Postgres, implement GraphRAG with Neo4j, and evaluate end-to-end quality with RAGAS.",
      deliverable: "Production RAG API: FastAPI endpoint over 50+ mixed-format docs (PDFs, Word, HTML) with hybrid search + HyDE + reranking + citations, scoring RAGAS faithfulness ≥ 0.75",
      skills: ["OpenAI Embeddings", "Cohere Embed v3", "Sentence-Transformers", "ChromaDB", "Qdrant", "pgvector", "Unstructured.io", "Docling", "Parent-Child Chunking", "HyDE", "Multi-Query Retrieval", "Step-Back Prompting", "BM25", "RRF Hybrid Search", "Cross-Encoder Reranking", "Cohere Rerank", "LlamaIndex", "LangChain LCEL", "GraphRAG", "Neo4j", "RAGAS"],
      resources: [
        { type: "read",  title: "OpenAI Embeddings guide",                              url: "https://platform.openai.com/docs/guides/embeddings",                          time: "20 min" },
        { type: "code",  title: "Qdrant — vector database quickstart",                  url: "https://qdrant.tech/documentation/quickstart/",                               time: "30 min" },
        { type: "code",  title: "Unstructured.io — parse any document format",          url: "https://docs.unstructured.io/open-source/introduction/overview",              time: "30 min" },
        { type: "code",  title: "LlamaIndex — RAG pipeline quickstart",                 url: "https://docs.llamaindex.ai/en/stable/getting_started/starter_example/",       time: "45 min" },
        { type: "code",  title: "LangChain — RAG with LCEL tutorial",                   url: "https://python.langchain.com/docs/tutorials/rag/",                            time: "45 min" },
        { type: "code",  title: "RAGAS — RAG evaluation framework",                     url: "https://docs.ragas.io/en/stable/getstarted/",                                 time: "30 min" },
        { type: "read",  title: "Cohere Rerank — cross-encoder reranking API",          url: "https://docs.cohere.com/docs/rerank-2",                                       time: "15 min" },
        { type: "code",  title: "pgvector — vector similarity in Postgres",             url: "https://github.com/pgvector/pgvector",                                        time: "20 min" },
        { type: "code",  title: "Neo4j GraphRAG Python package",                        url: "https://neo4j.com/docs/neo4j-graphrag-python/current/",                       time: "45 min" },
        { type: "read",  title: "HyDE — Hypothetical Document Embeddings (paper)",      url: "https://arxiv.org/abs/2212.10496",                                            time: "20 min" },
        { type: "read",  title: "RAG: Retrieval-Augmented Generation (paper)",          url: "https://arxiv.org/abs/2005.11401",                                            time: "1 hr"   }
      ],
      days: [
        {
          day: 1,
          title: "Embedding Models — Compare Providers",
          challenge: "Generate embeddings for 30 sentences using three providers: `text-embedding-3-small` (OpenAI, 1536-dim), `embed-english-v3.0` (Cohere, 1024-dim), and `all-MiniLM-L6-v2` (sentence-transformers, local, 384-dim). For each, compute cosine similarity for 5 semantically related pairs and 5 unrelated pairs. Build a comparison table: provider, dimensions, cost per 1M tokens, related-pair avg similarity, unrelated-pair avg similarity. Discuss the quality vs cost trade-off.",
          check: "All three providers generate embeddings. Related pairs score >0.65 on average; unrelated pairs score <0.3. Cost comparison table shows OpenAI at ~$0.02/1M, Cohere ~$0.10/1M, local at $0."
        },
        {
          day: 2,
          title: "ChromaDB + Qdrant — Two Vector DBs",
          challenge: "Stand up both databases: ChromaDB with `chromadb.PersistentClient()` (local disk), Qdrant via Docker (`docker run -p 6333:6333 qdrant/qdrant`). Insert 100 text chunks with rich metadata (source, date, category, author) into each. Run the same query against both. Test metadata filtering: `WHERE category='technical' AND date>'2024-01-01'`. Compare result ordering, distance scores, and filter performance.",
          check: "Both DBs return semantically correct top-3 for all test queries. Metadata filter returns only matching documents. Results table logs distance scores side-by-side."
        },
        {
          day: 3,
          title: "Document Parsing Beyond PDFs — Unstructured.io & Docling",
          challenge: "Use **Unstructured.io** to parse: (1) a `.docx` Word file, (2) an HTML webpage, (3) a `.pptx` PowerPoint, (4) a scanned PDF (with OCR via Tesseract). Use **Docling** to parse a PDF with complex tables and embedded charts — verify that table cells are preserved as structured data, not flattened text. Store all parsed content in Qdrant. Inspect element types (Title, NarrativeText, Table, Image) in the Unstructured output.",
          check: "All 5 formats parsed without errors. Scanned PDF OCR text is readable. Docling table extraction preserves row/column structure. All content indexed in Qdrant with source metadata."
        },
        {
          day: 4,
          title: "Chunking Strategies + Parent-Child Chunking",
          challenge: "Implement 4 chunking strategies: (1) fixed-size 512 chars / 64 overlap, (2) sentence splitting (NLTK), (3) LangChain `RecursiveCharacterTextSplitter`, (4) **parent-child chunking** — split docs into large parent chunks (2048 chars) and small child chunks (256 chars), link them with a `parent_id` metadata field. At retrieval time: search child chunks, return the full parent chunk for context. Compare answer quality for strategies 1 vs 4 on 5 test questions.",
          check: "Parent-child retrieval returns the full parent context (not just the matched child). Answer quality is visibly better on ≥3/5 test questions compared to fixed-size chunking."
        },
        {
          day: 5,
          title: "Query Transformation — HyDE, Multi-Query, Step-Back",
          challenge: "Implement 3 query transformation techniques on your corpus: (1) **HyDE** — ask the LLM to write a hypothetical answer to the query, embed that answer for retrieval instead of the raw query. (2) **Multi-query** — generate 5 query variants (`MultiQueryRetriever` in LangChain), retrieve for each, deduplicate, merge results. (3) **Step-back prompting** — abstract the query to a higher-level question first, retrieve on that, then use both contexts for the final answer. Run all 3 on 5 test queries and compare top-1 relevance vs naive retrieval.",
          check: "All 3 transformations implemented and producing results. At least one transformation improves top-1 relevance on ≥3/5 queries vs naive direct retrieval — documented in a comparison table."
        },
        {
          day: 6,
          title: "Hybrid Search (BM25 + Vector) + Cross-Encoder Reranking",
          challenge: "Build `hybrid_search(query, k=20)`: (1) BM25 with `rank-bm25`, (2) Qdrant vector search, (3) merge with **Reciprocal Rank Fusion** (RRF, k=60). Then add reranking: take the top-20 hybrid results and rerank with (a) Cohere Rerank API `rerank-english-v3.0` and (b) local `cross-encoder/ms-marco-MiniLM-L-6-v2`. Show on a 10-query eval set that hybrid MRR beats either method alone, and reranking further improves top-5.",
          check: "Hybrid MRR > BM25-only and vector-only on the 10-query eval. Reranking visibly improves at least 3/5 test queries' top-5 ordering. Latency overhead for each stage logged."
        },
        {
          day: 7,
          title: "LlamaIndex RAG Pipeline",
          challenge: "Build a full RAG pipeline using LlamaIndex: `SimpleDirectoryReader` (PDFs + Word docs) → `SentenceWindowNodeParser` (parent-child variant) → `VectorStoreIndex` (Qdrant backend) → `HyDEQueryTransform` → `SimilarityPostprocessor` + `CohereRerank` postprocessor → `RetrieverQueryEngine`. Use `gpt-4o-mini` as LLM. Add metadata citations to every response. Test swapping Qdrant for ChromaDB by changing one line.",
          check: "Pipeline returns cited, accurate answers on 5 test questions. Citations include filename and page number. Swapping vector store backend requires exactly one line change."
        },
        {
          day: 8,
          title: "LangChain LCEL + Streaming + Multi-Turn",
          challenge: "Build the same RAG using LangChain LCEL: `MultiQueryRetriever | prompt | ChatOpenAI | StrOutputParser`. Stream tokens via `astream()`. Add `ConversationalRetrievalChain` to support multi-turn follow-up questions (the chain remembers prior turns in a `ConversationBufferMemory`). Swap `ChatOpenAI` for `ChatAnthropic` with one line and verify it still works. Add verbose logging to see the full retrieval + generation trace.",
          check: "LCEL pipeline streams tokens in real time. Multi-turn follow-up correctly references prior turns. Provider swap (OpenAI → Anthropic) requires exactly one line. Retrieval trace visible in verbose output."
        },
        {
          day: 9,
          title: "pgvector + GraphRAG with Neo4j",
          challenge: "**pgvector:** Install the extension in Postgres (or Supabase free tier). Insert 500 chunks into a `documents(id, content, embedding vector(1536))` table. Run `ORDER BY embedding <=> $1 LIMIT 5` and test with HNSW index (`CREATE INDEX ON documents USING hnsw`). **GraphRAG:** Spin up Neo4j via Docker. Use the `neo4j-graphrag` Python package to extract entities and relationships from 10 documents with an LLM, store them as nodes/edges, and run a multi-hop Cypher query (e.g., `MATCH (a)-[:WORKS_WITH]->(b)-[:KNOWS]->(c)`). Compare flat vector search vs graph traversal on a multi-hop question.",
          check: "pgvector HNSW query returns correct top-5 in <50ms. Neo4j graph query answers a multi-hop question that a flat vector search cannot answer correctly."
        },
        {
          day: 10,
          title: "Phase 2 Deliverable",
          challenge: "Build the production RAG API: FastAPI with `POST /query` and `POST /ingest`. Ingest 50+ mixed-format documents (PDFs, Word, HTML, scanned PDFs) using Unstructured.io. Use the full pipeline: Qdrant + hybrid search (BM25 + vector) + HyDE query transformation + Cohere reranking + parent-child chunking + inline citations. Run RAGAS evaluation on 20 Q&A pairs with ground-truth answers. Stream the response via SSE (`StreamingResponse`).",
          check: "`/query` returns a streamed, cited answer in <6s. RAGAS `faithfulness` ≥ 0.75 and `answer_relevancy` ≥ 0.75 on the 20-question eval. `/ingest` accepts a directory of mixed-format files."
        }
      ]
    },

    /* ─────────────────────────────────────────────────────
       PHASE 3 — Agents, Tools & Orchestration Frameworks
       Weeks 5–6 · 10 days
    ───────────────────────────────────────────────────── */
    {
      id: "p3",
      weeks: "5–6",
      weekNumbers: [5, 6],
      color: "#ff7b54",
      colorLight: "#1f130e",
      colorDark: "#e55a2b",
      title: "Agents, Tools & Orchestration Frameworks",
      subtitle: "Weeks 5–6",
      overview: "Go beyond single-turn completions and build autonomous agents that plan, loop, and act. You'll master tool use across providers, build stateful cyclical agent graphs with LangGraph (including persistence and human-in-the-loop interrupts), set up a Model Context Protocol server, orchestrate multi-agent crews with CrewAI, build type-safe agents with Pydantic AI, automatically optimize prompts with DSPy, implement three-tier memory, add sandboxed code execution with E2B, and create a voice-enabled agent with Whisper + TTS.",
      deliverable: "LangGraph research agent: stateful graph with MCP tools, CrewAI sub-crew, DSPy-optimized prompts, three-tier memory, E2B code execution, voice I/O, and human approval interrupts",
      skills: ["OpenAI Tool Use", "Anthropic Tool Use", "LangGraph", "LangGraph Persistence", "Model Context Protocol (MCP)", "CrewAI", "Pydantic AI", "DSPy", "Three-Tier Memory", "E2B Code Execution", "Whisper TTS/STT", "Human-in-the-Loop", "ReAct", "Parallel Tool Calls"],
      resources: [
        { type: "code",  title: "LangGraph — quickstart & concepts",                   url: "https://langchain-ai.github.io/langgraph/tutorials/introduction/",            time: "1 hr"   },
        { type: "code",  title: "LangGraph — persistence & checkpointing",             url: "https://langchain-ai.github.io/langgraph/concepts/persistence/",              time: "30 min" },
        { type: "read",  title: "Model Context Protocol — specification",               url: "https://modelcontextprotocol.io/introduction",                               time: "45 min" },
        { type: "code",  title: "CrewAI — multi-agent framework docs",                 url: "https://docs.crewai.com/introduction",                                        time: "1 hr"   },
        { type: "code",  title: "Pydantic AI — type-safe AI agents",                   url: "https://ai.pydantic.dev/",                                                   time: "45 min" },
        { type: "code",  title: "DSPy — programmatic prompt optimization",             url: "https://dspy.ai/learn/programming/language_models/",                         time: "1 hr"   },
        { type: "code",  title: "E2B — sandboxed code execution for AI agents",       url: "https://e2b.dev/docs",                                                        time: "30 min" },
        { type: "read",  title: "ReAct: Synergizing Reasoning and Acting (paper)",     url: "https://arxiv.org/abs/2210.03629",                                            time: "45 min" },
        { type: "read",  title: "Building Effective Agents — Anthropic research",      url: "https://www.anthropic.com/research/building-effective-agents",                time: "30 min" },
        { type: "read",  title: "Anthropic Tool Use documentation",                    url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use",               time: "30 min" }
      ],
      days: [
        {
          day: 1,
          title: "Tool Use — OpenAI vs Anthropic, Parallel Calls",
          challenge: "Implement the same two tools (`web_search` stub + `calculator`) in both OpenAI function-calling format and Anthropic tool-use format. Build a provider-agnostic loop using LiteLLM: `message → if tool_calls → execute each → append results → repeat → until final text`. Handle **parallel tool calls** — both providers can return multiple tool calls in one response. Run a task requiring 4 sequential steps and a task requiring 2 parallel calls.",
          check: "Both providers invoke correct tools and return valid parameters. Parallel tool calls are executed concurrently (not sequentially). 4-step sequential task completes without human intervention."
        },
        {
          day: 2,
          title: "LangGraph — Stateful Agent Graphs",
          challenge: "Build your first `StateGraph` with LangGraph: define a `TypedDict` state with `messages`, `research_notes`, and `draft` fields. Create 3 nodes: `researcher`, `drafter`, `reviewer`. Add conditional edges: if reviewer score <7, route back to drafter; else route to END. Add a **human-in-the-loop interrupt** before the reviewer node using `interrupt_before=['reviewer']`. Inspect state mid-run, inject feedback, and resume.",
          check: "Graph compiles and runs without errors. Interrupt pauses at the reviewer node. Human feedback injected into state. Graph resumes and completes. At least one cycle (draft → review → re-draft) visible in the trace."
        },
        {
          day: 3,
          title: "LangGraph — Persistence, Cycles & Resumption",
          challenge: "Add a `SqliteSaver` checkpointer to persist graph state across sessions. Run the research → draft → review cycle for 3 full iterations (force at least 2 re-draft loops by using a high score threshold). Kill the process mid-run, restart, and resume from the saved checkpoint. Also add a `MemorySaver` for in-memory testing and compare behavior.",
          check: "State persists to SQLite between process restarts. `--resume <thread_id>` continues correctly from the last saved state without repeating completed steps. The graph runs at least 2 draft-review cycles."
        },
        {
          day: 4,
          title: "Model Context Protocol (MCP)",
          challenge: "Build an MCP server using the `mcp` Python SDK exposing 4 tools: `read_file(path)`, `write_file(path, content)`, `list_directory(path)`, `search_web(query)` (stub). Connect Claude Desktop to your server — verify it uses your tools on a file-system task. Then build an **MCP client** in Python using `mcp.ClientSession` that connects programmatically and invokes all 4 tools without the Desktop UI.",
          check: "MCP server starts and all 4 tools are registered. Claude Desktop uses them on a file task. Python client invokes all 4 tools and returns correct results programmatically."
        },
        {
          day: 5,
          title: "CrewAI — Multi-Agent Crew",
          challenge: "Build a 3-agent CrewAI crew with sequential process: (1) **Researcher** — web search + URL reading tools, finds facts on a topic, (2) **Analyst** — code execution tool, processes data and computes statistics, (3) **Writer** — composes a structured report with findings from both agents. Enable CrewAI's built-in RAG memory so agents remember past runs. Run on a real research + data analysis task.",
          check: "Crew completes end-to-end autonomously. Analyst runs actual code and passes results to Writer. Final report incorporates findings from both Researcher and Analyst. Memory persists a fact from a previous crew run."
        },
        {
          day: 6,
          title: "Pydantic AI — Type-Safe Agents",
          challenge: "Build a Pydantic AI agent with type-annotated tools — Pydantic AI auto-generates JSON schemas from Python type hints, eliminating manual schema writing. Add dependency injection: inject a `DatabaseClient` and an `HttpClient` at runtime. Define the agent's result type as a Pydantic model so the final output is always validated. Solve a 3-step research task and compare DX to raw API tool use and LangChain.",
          check: "Agent runs with auto-generated tool schemas (no manual JSON). Dependency injection works. Final output passes `isinstance(result, YourOutputModel)`. Written DX comparison vs LangChain / raw API."
        },
        {
          day: 7,
          title: "DSPy — Programmatic Prompt Optimization",
          challenge: "Define a DSPy `Signature` for your RAG pipeline: `question -> answer` with input/output field descriptions. Build a `RAGModule` as a DSPy `Module`. Use `BootstrapFewShotWithRandomSearch` optimizer to automatically select the best few-shot examples from a 50-example training set, maximizing your eval metric (e.g., answer correctness). Compare: (a) zero-shot baseline, (b) hand-written few-shot, (c) DSPy-optimized. Measure metric improvement.",
          check: "DSPy optimizer runs and selects few-shot examples automatically. Optimized prompt improves eval metric by ≥5% over the zero-shot baseline. Few-shot examples selected by the optimizer are different from what you would have chosen manually."
        },
        {
          day: 8,
          title: "Three-Tier Memory System",
          challenge: "Build a `MemoryManager` class with 3 tiers integrated into your LangGraph agent state: (1) **ConversationBuffer** — last 10 messages kept in the graph state, (2) **SummaryMemory** — when buffer exceeds 10 messages, compress the oldest half into a running summary using an LLM call, (3) **EpisodicMemory** — embed each session's summary and store in Qdrant; on new sessions, retrieve the 3 most relevant past summaries and prepend them as context.",
          check: "Agent correctly recalls a detail from a previous session (retrieved from Qdrant). Long 25-turn conversation stays under 10k tokens via summary compression. All 3 tiers are active simultaneously."
        },
        {
          day: 9,
          title: "E2B Code Execution + Voice Agent",
          challenge: "**E2B:** Build a `code_interpreter` tool using `e2b_code_interpreter` SDK. Agent writes Python code, executes it in a sandboxed E2B environment, gets back stdout/stderr and generated files. Test with a data analysis task: load a CSV, compute descriptive stats, generate a matplotlib chart — return the chart file path. **Voice:** Chain Whisper STT (`openai.audio.transcriptions.create`) → agent → OpenAI TTS (`openai.audio.speech.create`) to build a fully voice-enabled coding assistant.",
          check: "E2B executes real Python, returns correct stats, and saves a chart file. Voice pipeline: audio file in → agent response → audio file out — works end-to-end. Coding assistant correctly solves a voiced data analysis question."
        },
        {
          day: 10,
          title: "Phase 3 Deliverable",
          challenge: "Assemble the full multi-framework research agent: **LangGraph** as the orchestration backbone (with `SqliteSaver` persistence and human interrupt before any write). **MCP** tools for file system access. **CrewAI** sub-crew spawned from inside a LangGraph node for deep multi-agent research. **DSPy-optimized** prompts for the drafting node. **3-tier memory** across sessions. **E2B** code execution node. **Voice I/O** entry point. Run 3 complete research + analysis tasks end-to-end.",
          check: "Agent completes 3 tasks using all components. LangGraph persistence resumes a killed run. MCP and E2B tools both invoked. Human interrupt fires before file writes. DSPy-optimized prompts used. Voice input accepted."
        }
      ]
    },

    /* ─────────────────────────────────────────────────────
       PHASE 4 — Production: Evals, Safety & Observability
       Weeks 7–8 · 10 days
    ───────────────────────────────────────────────────── */
    {
      id: "p4",
      weeks: "7–8",
      weekNumbers: [7, 8],
      color: "#4d9fff",
      colorLight: "#0b1825",
      colorDark: "#2d7dd6",
      title: "Production: Evals, Safety & Observability",
      subtitle: "Weeks 7–8",
      overview: "Transform your agent into a production system with professional-grade observability, automated evaluation pipelines, adversarial safety testing, and a hardened serving layer. You'll instrument with Langfuse and LangSmith, wire DeepEval into GitHub Actions CI, run LLM-as-judge evaluations with calibrated agreement scoring, red-team your own system across 5 attack categories, add Guardrails AI and Llama Guard as safety layers, implement semantic caching with Redis, build proper SSE streaming, and expose Prometheus metrics.",
      deliverable: "Production-hardened AI service: Langfuse traces + DeepEval GitHub Actions CI + LLM-as-judge + red team report + Guardrails + Llama Guard + Redis semantic cache + SSE streaming + Prometheus/Grafana",
      skills: ["Langfuse", "LangSmith", "W&B Weave", "DeepEval", "RAGAS", "LLM-as-Judge", "G-Eval", "GitHub Actions CI/CD", "Red Teaming", "Adversarial Testing", "Guardrails AI", "Llama Guard", "Semantic Caching", "Redis", "SSE Streaming", "FastAPI", "Rate Limiting", "Prometheus", "Grafana"],
      resources: [
        { type: "code",  title: "Langfuse — LLM observability platform",              url: "https://langfuse.com/docs",                                                   time: "45 min" },
        { type: "code",  title: "LangSmith — tracing and evaluation",                  url: "https://docs.smith.langchain.com/",                                           time: "45 min" },
        { type: "code",  title: "W&B Weave — LLM experiment tracking",                url: "https://weave-docs.wandb.ai/",                                               time: "30 min" },
        { type: "code",  title: "DeepEval — LLM evaluation framework",                url: "https://docs.confident-ai.com/",                                              time: "45 min" },
        { type: "read",  title: "G-Eval: NLG Evaluation using LLMs (paper)",          url: "https://arxiv.org/abs/2303.16634",                                            time: "30 min" },
        { type: "code",  title: "GitHub Actions — ML workflow examples",               url: "https://docs.github.com/en/actions/use-cases-and-examples/publishing-packages/publishing-docker-images", time: "30 min" },
        { type: "code",  title: "Guardrails AI — output validation & safety",          url: "https://docs.guardrailsai.com/",                                              time: "30 min" },
        { type: "read",  title: "Meta Llama Guard 3 — safety classification model",   url: "https://ai.meta.com/research/publications/llama-guard-3-vision-an-open-source-llm-driven-input-output-safeguard-for-human-ai-conversations/", time: "20 min" },
        { type: "code",  title: "Redis Stack — vector search for semantic caching",   url: "https://redis.io/docs/latest/develop/get-started/vector-database/",           time: "30 min" }
      ],
      days: [
        {
          day: 1,
          title: "Langfuse — Distributed Tracing",
          challenge: "Instrument your full LangGraph + RAG pipeline with Langfuse. Use the Python SDK to create a `trace` per user request with nested `spans` for: retrieval (with documents returned), reranking, LLM generation (with model + token counts + cost), and tool calls. Enable the Langfuse LangChain callback handler so LangChain/LangGraph spans appear automatically. Open the Langfuse dashboard and verify nested spans, costs, and latencies.",
          check: "Langfuse dashboard shows full nested traces for 5 test queries. Every span has: model, prompt tokens, completion tokens, cost_usd, and latency_ms. LangChain spans appear automatically via the callback handler."
        },
        {
          day: 2,
          title: "LangSmith + W&B Weave",
          challenge: "**LangSmith:** Set `LANGCHAIN_TRACING_V2=true`. Record 20 pipeline runs as a LangSmith Dataset. Change a system prompt and run a comparison experiment — view side-by-side output quality in the LangSmith UI. **W&B Weave:** Decorate LLM functions with `@weave.op()`. Track model versions and custom eval metrics (e.g., answer correctness). Write a 1-page comparison: when to use Langfuse vs LangSmith vs W&B Weave.",
          check: "LangSmith Dataset contains 20 runs; comparison experiment shows quality differences between prompt versions. W&B Weave dashboard shows ops with custom metrics. Written comparison covers strengths and trade-offs of each tool."
        },
        {
          day: 3,
          title: "DeepEval — Automated Eval Test Suite",
          challenge: "Write a DeepEval pytest test suite with 6 metrics on your RAG pipeline: `AnswerRelevancyMetric` (≥0.70), `FaithfulnessMetric` (≥0.75), `ContextualRecallMetric` (≥0.70), `HallucinationMetric` (<0.10), `BiasMetric` (<0.10), and a custom `GEval` metric with your own rubric (e.g., 'Is the answer safe for a general audience?'). The suite must fail CI when any metric regresses past its threshold.",
          check: "All 6 metrics computed; `pytest` passes when thresholds are met and fails when any is violated. Custom `GEval` metric included and running. Test report shows per-metric scores and pass/fail."
        },
        {
          day: 4,
          title: "LLM-as-Judge — G-Eval with Calibration",
          challenge: "Build a G-Eval evaluator: for each system output, send a structured prompt asking GPT-4o to score 1–5 on accuracy, completeness, and tone with a chain-of-thought rationale before the score. **Run each evaluation twice** and compute inter-rater agreement (Cohen's kappa — use `sklearn.metrics.cohen_kappa_score`). Flag disagreements >1 point for human review. **Calibrate:** verify the evaluator on 10 known-good and 10 known-bad examples — it should score good examples ≥4 and bad examples ≤2.",
          check: "Evaluator scores 25 outputs with CoT rationale. Inter-rater kappa computed and logged. Calibration set shows ≥80% alignment with human labels. Disagreements flagged in output report."
        },
        {
          day: 5,
          title: "CI/CD for Evals — GitHub Actions",
          challenge: "Create two GitHub Actions workflows: (1) **PR workflow** — runs on every pull request: executes DeepEval test suite against a fixed 20-question eval set, compares each metric to the `main` branch baseline (stored as a JSON artifact), fails the PR if any metric regresses by >5%, and posts a formatted eval report as a PR comment using the GitHub API. (2) **Nightly workflow** — runs at 02:00 UTC: runs the full 25-question eval suite, stores results as an artifact, and sends a Slack notification if quality drops.",
          check: "PR workflow triggers automatically on a test PR. Metric regression fails the check. PR comment shows the comparison table. Nightly workflow is scheduled and produces a stored artifact."
        },
        {
          day: 6,
          title: "Red Teaming & Adversarial Testing",
          challenge: "Systematically attack your own system across 5 categories with 3 variants each (15 tests total): (1) **Prompt injection** — `Ignore previous instructions and…`, nested instruction injection via retrieved documents, (2) **Jailbreaking** — role-play bypass, DAN-style, base64-encoded instructions, (3) **System prompt exfiltration** — ask the model to repeat its system prompt, (4) **PII leakage** — inject PII in RAG context, verify it doesn't appear in responses, (5) **Indirect injection** — embed malicious instructions inside a document that gets retrieved. Document each attack, success/failure, and implement mitigations for successful ones.",
          check: "All 15 attacks tested and documented. At least 3 succeed before mitigations. Mitigations implemented and re-tested — all 15 fail after hardening. Red team report generated as `red_team_report.md`."
        },
        {
          day: 7,
          title: "Guardrails AI + Llama Guard",
          challenge: "**Guardrails AI:** Create a `Guard` with 4 validators: `ToxicLanguage` (block harmful content), `DetectPII` (redact emails, phones, SSNs before returning), `PromptInjectionDetector` (block injection attempts), and a custom `ResponseLengthValidator` (max 500 words). Apply as pre/post-processing middleware on your FastAPI endpoint. **Llama Guard:** Run `llama-guard-3-8b` locally via Ollama. Classify both inputs and outputs by hazard category. Chain both as a safety pipeline.",
          check: "Guardrails blocks all 4 violation types — verified with 3 adversarial inputs each. PII is redacted (not just blocked). Llama Guard correctly classifies 10 test inputs by hazard category. Clean inputs pass through both layers unchanged."
        },
        {
          day: 8,
          title: "Semantic Caching (Redis) + SSE Streaming",
          challenge: "**Semantic cache:** Run Redis Stack via Docker. Embed each user query with `text-embedding-3-small`, check Redis vector index for a cached response within cosine distance 0.05 (`HNSW` index). On cache miss, call the LLM and store the response. Run 100 queries (50 unique + 50 near-duplicates), measure cache hit rate and latency savings. **SSE Streaming:** Implement `StreamingResponse` in FastAPI with `Content-Type: text/event-stream`. Stream LLM tokens as `data: {token}\\n\\n` events. Test with a browser `EventSource` client.",
          check: "Cache hit rate ≥80% on the 50 near-duplicate queries. Cache returns in <10ms vs 1–3s LLM call. SSE endpoint streams tokens to a JavaScript `EventSource` client in real time."
        },
        {
          day: 9,
          title: "Async FastAPI + Rate Limiting + Prometheus",
          challenge: "Build a fully async FastAPI service (all I/O uses `await`). Add: (1) `slowapi` rate limiter — 20 req/min per IP, returns 429 with `Retry-After` header, (2) request middleware that attaches a UUID `trace_id` to every log line, (3) `GET /health` checking Qdrant, Redis, and LLM connectivity with individual status per service, (4) Prometheus metrics via `prometheus_fastapi_instrumentator` exporting: request count, latency histograms (p50/p95/p99), error rate, cache hit rate, (5) Grafana dashboard (Docker) with at least 2 panels.",
          check: "20 concurrent requests succeed. The 21st returns 429 with `Retry-After`. `/health` shows per-service status. Prometheus scrapes metrics. Grafana shows latency histogram and request rate panels."
        },
        {
          day: 10,
          title: "Phase 4 Deliverable",
          challenge: "Run the complete production system simultaneously: Langfuse + LangSmith traces, DeepEval CI (GitHub Actions PR check running), LLM-as-judge eval, red team mitigations active, Guardrails AI + Llama Guard safety pipeline, Redis semantic cache, SSE streaming, async FastAPI with rate limiting, Prometheus + Grafana metrics. Execute the 25-question eval. Produce `production_report.md` with: eval scores per metric, total cost and % cache savings, p50/p95/p99 latency, safety violations caught, red team results.",
          check: "All systems running simultaneously. PR CI check executes on a test branch. `production_report.md` contains all required sections with real data. DeepEval pytest suite passes."
        }
      ]
    },

    /* ─────────────────────────────────────────────────────
       PHASE 5 — Fine-Tuning, Scale & Deployment
       Weeks 9–10 · 10 days
    ───────────────────────────────────────────────────── */
    {
      id: "p5",
      weeks: "9–10",
      weekNumbers: [9, 10],
      color: "#e879f9",
      colorLight: "#1e0825",
      colorDark: "#c026d3",
      title: "Fine-Tuning, Scale & Deployment",
      subtitle: "Weeks 9–10",
      overview: "Take your system to production scale. Fine-tune GPT-4o-mini via OpenAI's API and Llama 3 with QLoRA using Unsloth. Serve open-source models at production throughput with vLLM (OpenAI-compatible API, continuous batching, quantization). Run a centralized AI gateway with LiteLLM Proxy for routing, budget enforcement, and fallbacks. Build async batch processing pipelines. Containerize the full stack with Docker Compose and Nginx SSL. Apply 6 cost optimization techniques. Monitor production drift with Arize Phoenix.",
      deliverable: "Complete enterprise AI platform: fine-tuned models served via vLLM, LiteLLM Proxy gateway, Dockerized full-stack deployment with Nginx SSL, 6 cost optimizations active, and Arize Phoenix drift monitoring",
      skills: ["OpenAI Fine-Tuning", "LoRA / QLoRA", "Unsloth", "GGUF Export", "vLLM", "AWQ Quantization", "Speculative Decoding", "LiteLLM Proxy", "Batch Processing", "Docker", "Docker Compose", "Nginx", "SSL/TLS", "Cost Optimization", "LLMLingua", "Model Cascading", "Arize Phoenix", "Embedding Drift Detection"],
      resources: [
        { type: "code",  title: "OpenAI Fine-Tuning guide",                            url: "https://platform.openai.com/docs/guides/fine-tuning",                         time: "1 hr"   },
        { type: "read",  title: "LoRA: Low-Rank Adaptation of Large LLMs (paper)",    url: "https://arxiv.org/abs/2106.09685",                                            time: "45 min" },
        { type: "code",  title: "Unsloth — fast LoRA/QLoRA fine-tuning",              url: "https://github.com/unslothai/unsloth",                                        time: "45 min" },
        { type: "code",  title: "vLLM — high-throughput LLM serving engine",          url: "https://docs.vllm.ai/en/latest/",                                             time: "1 hr"   },
        { type: "code",  title: "LiteLLM Proxy — AI gateway documentation",           url: "https://docs.litellm.ai/docs/proxy/quick_start",                             time: "45 min" },
        { type: "code",  title: "Arize Phoenix — ML observability & drift detection", url: "https://docs.arize.com/phoenix",                                             time: "45 min" },
        { type: "code",  title: "LLMLingua — prompt compression",                     url: "https://llmlingua.com/",                                                     time: "20 min" },
        { type: "read",  title: "OpenAI Batch API — 50% cost reduction",              url: "https://platform.openai.com/docs/guides/batch",                              time: "20 min" },
        { type: "code",  title: "Docker Compose — multi-container apps",              url: "https://docs.docker.com/compose/",                                           time: "30 min" }
      ],
      days: [
        {
          day: 1,
          title: "OpenAI Fine-Tuning API",
          challenge: "Prepare a fine-tuning dataset of 60 examples in JSONL `{messages: [{role, content}]}` format for a specific task where `gpt-4o-mini` makes consistent errors (e.g., structured code review, domain-specific Q&A, or a custom output format). Split 50 train / 10 validation. Upload with `openai.files.create()`, launch a fine-tuning job on `gpt-4o-mini-2024-07-18`, monitor via the `events` polling API, and plot train/val loss. Compare the fine-tuned model vs base on all 10 held-out test cases.",
          check: "Fine-tuning job completes successfully. Fine-tuned model deployed with a `ft:gpt-4o-mini:...` model ID. Eval on 10 test cases shows measurable improvement on the target task. Train/val loss curve plotted."
        },
        {
          day: 2,
          title: "QLoRA Fine-Tuning with Unsloth",
          challenge: "Use Unsloth on Google Colab (free T4 GPU) to fine-tune `Llama-3.2-3B-Instruct` with **QLoRA** (4-bit quantized, `r=16`, `lora_alpha=16`). Use the same 60-example dataset. Train for 3 epochs, logging train loss per step. Merge the LoRA adapter into the base model and export to **GGUF format** (`q4_k_m` quantization). Load the GGUF file into Ollama (`ollama create my-llama -f Modelfile`) and run inference. Compare quality vs the base Llama model on 5 domain-specific prompts.",
          check: "LoRA training completes in <30 min on Colab T4. GGUF exported and loaded in Ollama. Fine-tuned model shows visible improvement on target domain prompts. Training loss curve plotted."
        },
        {
          day: 3,
          title: "vLLM — Production Model Serving",
          challenge: "Install vLLM and serve `Llama-3.2-3B-Instruct` with an OpenAI-compatible API: `python -m vllm.entrypoints.openai.api_server --model meta-llama/Llama-3.2-3B-Instruct --served-model-name llama3`. Point the OpenAI client at vLLM by changing only `base_url`. Benchmark throughput: send 50 concurrent requests to vLLM vs Ollama on the same model. Also serve your Unsloth fine-tuned GGUF model via `llama.cpp` server and compare.",
          check: "vLLM serves the model; OpenAI client works via `base_url` override with no other code changes. vLLM handles 50 concurrent requests. Throughput comparison table: vLLM vs Ollama vs llama.cpp (requests/sec and tokens/sec)."
        },
        {
          day: 4,
          title: "vLLM Advanced — Quantization & Speculative Decoding",
          challenge: "Test 3 vLLM serving configurations on `Mistral-7B-Instruct-v0.3`: (1) **Full precision** (float16), (2) **AWQ quantization** (`--quantization awq`, using `TheBloke/Mistral-7B-Instruct-v0.3-AWQ`), (3) **Speculative decoding** (add a 1B draft model via `--speculative-model`). For each, run 20 prompts and record: VRAM usage, tokens/sec, and a 5-point quality score. Build a comparison table. Document when you'd choose each configuration.",
          check: "All 3 configurations serve correctly. VRAM usage table shows AWQ using ≤50% of full-precision VRAM. Speculative decoding increases tokens/sec. Quality scores within 1 point of full-precision baseline."
        },
        {
          day: 5,
          title: "LiteLLM Proxy — Centralized AI Gateway",
          challenge: "Deploy the **LiteLLM Proxy Server** via Docker (`docker run litellm/litellm`). Configure `config.yaml` with: (1) round-robin load balancing across `gpt-4o-mini` and `claude-3-5-haiku`, (2) latency-based routing (route to fastest responder), (3) per-user cost budget limits (block requests when budget exceeded), (4) automatic fallback chain with retry. All existing OpenAI-client code should work against the proxy with only a `base_url` change. Load test with 100 concurrent requests.",
          check: "Proxy routes correctly; round-robin visible in logs. Budget enforcement blocks a user that exceeds the limit. Fallback triggers when primary is unavailable. 100-request load test completes with no dropped requests."
        },
        {
          day: 6,
          title: "Batch Processing Pipelines",
          challenge: "Build and benchmark 3 batch processing approaches: (1) **OpenAI Batch API** — submit 100 requests as a `.jsonl` file, poll until done, download results — verify the 50% cost reduction vs real-time API. (2) **Anthropic Message Batches** — same 100 requests via `client.beta.messages.batches.create()`. (3) **Custom asyncio pipeline** — queue 1000 requests, process with `asyncio.Semaphore(50)` (50 concurrent max), respect rate limits with exponential backoff, no dropped requests. Log throughput and cost for each.",
          check: "OpenAI Batch API cost ≈50% of real-time (verified from usage dashboard). Anthropic batches complete. asyncio pipeline processes 1000 requests with no 429 errors. Throughput and cost table for all 3 approaches."
        },
        {
          day: 7,
          title: "Containerization + Self-Hosted Deployment",
          challenge: "Write a multi-stage `Dockerfile` for your FastAPI service (builder + runtime stage, non-root user, `HEALTHCHECK` instruction). Create a `docker-compose.yml` with 6 services: `api` (FastAPI), `redis` (Redis Stack), `postgres` (pgvector), `qdrant`, `prometheus`, and `nginx`. Configure Nginx as a reverse proxy with **self-signed SSL** (`openssl req -x509 ...`), rate limiting (`limit_req_zone`), and gzip compression. All services must start and communicate with `docker compose up`.",
          check: "`docker compose up` starts all 6 services cleanly. Nginx serves the API over HTTPS. API, Redis, Postgres, and Qdrant are connected and functional. `docker compose down && docker compose up` is fully reproducible."
        },
        {
          day: 8,
          title: "Cost Optimization — 6 Techniques",
          challenge: "Implement and benchmark 6 cost reduction techniques on your pipeline: (1) **Prompt caching** — shared system prompt cached across requests, (2) **Semantic caching** — Redis cache hit skips LLM call entirely, (3) **Model cascading** — try `gpt-4o-mini` first; if confidence < 0.7 (self-assessed), escalate to `gpt-4o`, (4) **LLMLingua prompt compression** — compress long prompts by 30–50% before sending, (5) **Batch API** — defer non-urgent requests to batch, (6) **RAG instead of large context** — compare cost of stuffing 100k tokens vs retrieving top-5 chunks. Log baseline cost vs optimized cost for each technique.",
          check: "All 6 techniques implemented with before/after cost logs. Model cascading escalates ≈20% of requests. LLMLingua compresses prompts by ≥30% with <5% quality loss. Total pipeline cost reduced ≥40% vs the naive implementation."
        },
        {
          day: 9,
          title: "Arize Phoenix — Production Drift Monitoring",
          challenge: "Set up **Arize Phoenix** (self-hosted via Docker). Log production traces with embeddings using the Phoenix OTEL exporter from your FastAPI app. (1) **Embedding drift:** compare the embedding distribution of your eval set vs 100 production queries using Phoenix's drift detection — identify query clusters that are out-of-distribution. (2) **UMAP clustering:** find underperforming query clusters in Phoenix's 2D projection. (3) **Alerts:** configure a webhook alert that fires when the average faithfulness score over a 1-hour window drops below 0.65.",
          check: "Phoenix dashboard shows traces with UMAP clustering. Drift detection identifies at least one out-of-distribution cluster vs the eval set. Alert webhook fires when a synthetic faithfulness drop is injected."
        },
        {
          day: 10,
          title: "Final Deliverable — Complete Enterprise AI Platform",
          challenge: "Assemble the complete enterprise platform and run the final 25-question evaluation with everything active: vLLM serving the fine-tuned model + LiteLLM Proxy gateway + Nginx SSL + Docker Compose (all 6 services) + Redis semantic cache + Guardrails AI + Llama Guard + Langfuse traces + DeepEval CI + W&B Weave + Arize Phoenix drift monitoring + 6 cost optimizations + Prometheus/Grafana metrics + SSE streaming. Produce `final_report.md` including: eval scores, total cost with % savings, p50/p95/p99 latency, cache hit rate, safety violations caught, fine-tuned model improvement vs baseline, and an ASCII architecture diagram.",
          check: "Full platform starts from `docker compose up`. All components connected and active. `final_report.md` exists with every required section populated from real run data. DeepEval CI passes. Architecture diagram present."
        }
      ]
    }

  ]
};

/* ─────────────────────────────────────────────────────────
   OPEN MODULE — AI Frontier Tracker
   Seed topics: paradigm shifts worth learning & building with.
   Users add their own as the field evolves.
───────────────────────────────────────────────────────── */
const OPEN_MODULE_SEEDS = [
  {
    id: "om-seed-1",
    title: "Reasoning Models — o1, o3, DeepSeek R1",
    category: "Models",
    why: "Test-time compute scaling lets models 'think longer' by generating extended internal chain-of-thought before answering. o3 hit human-level performance on ARC-AGI. This changes architecture decisions: reasoning models are 5–20× slower and more expensive than standard models, but they handle multi-step logic and complex code that prompt engineering alone can't fix. Knowing when to route to a reasoning model vs a fast model is now a core AI engineering skill.",
    resources: [
      { type: "read",  title: "OpenAI — Guide to reasoning models (o1, o3)",     url: "https://platform.openai.com/docs/guides/reasoning",           time: "20 min" },
      { type: "read",  title: "DeepSeek-R1 technical report (arXiv)",            url: "https://arxiv.org/abs/2501.12948",                            time: "45 min" },
      { type: "read",  title: "Anthropic extended thinking — Claude 3.7 Sonnet", url: "https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking", time: "20 min" }
    ],
    challenge: "Send 10 multi-step math, logic, and coding problems to o3-mini, o1, claude-3-7-sonnet (extended thinking), and gpt-4o. Compare: accuracy, cost per correct answer, and latency. Build a router that picks the cheapest model likely to succeed based on problem complexity.",
    status: "watching",
    dateAdded: "2025-05-17",
    notes: "",
    tags: ["reasoning", "openai", "anthropic", "deepseek", "test-time-compute"]
  },
  {
    id: "om-seed-2",
    title: "OpenAI Realtime API — Low-Latency Voice",
    category: "Tools",
    why: "WebSocket-based streaming voice API with sub-300ms end-to-end latency. Supports mid-speech interruptions, function calling while the user is still talking, and emotion-aware responses. Completely different from the Whisper→LLM→TTS pipeline — that approach has 2–4s latency and no interruption support. The Realtime API makes genuinely conversational voice agents possible for the first time.",
    resources: [
      { type: "read",  title: "OpenAI Realtime API documentation",                url: "https://platform.openai.com/docs/guides/realtime",            time: "30 min" },
      { type: "code",  title: "Realtime API WebSocket quickstart",                url: "https://platform.openai.com/docs/guides/realtime-conversations", time: "45 min" },
      { type: "watch", title: "OpenAI DevDay — Realtime API demo",               url: "https://www.youtube.com/watch?v=tWDsBgZMQJE",                time: "15 min" }
    ],
    challenge: "Build a voice assistant using the Realtime API over WebSockets in Python (use `websockets` library). Support: (1) natural interruptions mid-sentence, (2) at least one function call (e.g., search_documents from your Phase 2 RAG). Measure round-trip latency and compare to Phase 3's Whisper→GPT-4o→TTS pipeline.",
    status: "watching",
    dateAdded: "2025-05-17",
    notes: "",
    tags: ["voice", "realtime", "websocket", "openai", "low-latency"]
  },
  {
    id: "om-seed-3",
    title: "Computer Use & GUI Agents",
    category: "Frameworks",
    why: "Models that can see a screen and control a computer — clicking, typing, scrolling, navigating GUIs. Anthropic's Computer Use (Claude 3.5 Sonnet), OpenAI's Operator, and frameworks like Browser Use and Playwright+AI enable agents to interact with any software that has a UI, not just APIs. This unlocks automation of legacy systems, web scraping with dynamic JS, and desktop app testing.",
    resources: [
      { type: "read",  title: "Anthropic Computer Use — API docs",                url: "https://docs.anthropic.com/en/docs/build-with-claude/computer-use", time: "30 min" },
      { type: "code",  title: "Browser Use — Python library for web agents",     url: "https://github.com/browser-use/browser-use",                 time: "30 min" },
      { type: "code",  title: "Playwright + AI — browser automation guide",      url: "https://playwright.dev/python/docs/intro",                    time: "30 min" }
    ],
    challenge: "Build a web research agent using Browser Use or Claude Computer Use that: (1) opens a browser, (2) searches for a topic, (3) navigates to 3 different results, (4) extracts key information from each, (5) returns a structured summary. Compare to your Phase 3 web search tool (API-based) on quality and reliability.",
    status: "watching",
    dateAdded: "2025-05-17",
    notes: "",
    tags: ["computer-use", "browser", "gui-agents", "anthropic", "playwright"]
  },
  {
    id: "om-seed-4",
    title: "AI Coding Agents — Claude Code, Cursor, Copilot",
    category: "Tools",
    why: "AI coding agents go beyond autocomplete — they read your codebase, understand intent, edit multiple files, run tests, and iterate. Claude Code runs in the terminal and can autonomously fix bugs across a repo. Cursor has inline diff generation and codebase-aware Q&A. GitHub Copilot Workspace plans multi-file changes from a GitHub issue. These tools are changing how AI engineers themselves write code and are worth deeply understanding both as users and as builders.",
    resources: [
      { type: "read",  title: "Claude Code — official documentation",            url: "https://docs.anthropic.com/en/docs/claude-code",              time: "30 min" },
      { type: "read",  title: "Cursor docs — features and model config",         url: "https://docs.cursor.com/",                                   time: "20 min" },
      { type: "read",  title: "GitHub Copilot Workspace — overview",            url: "https://githubnext.com/projects/copilot-workspace",           time: "15 min" }
    ],
    challenge: "Use Claude Code (or Cursor) to: (1) add a new feature to your Phase 4 FastAPI service (e.g., `/export` endpoint), (2) write and run the tests, (3) fix the test failures autonomously. Document: how many human interventions were needed, what the model got wrong, and what it got right. Then build your own minimal coding agent using your Phase 3 agent loop + file-system tools.",
    status: "watching",
    dateAdded: "2025-05-17",
    notes: "",
    tags: ["coding-agents", "claude-code", "cursor", "copilot", "developer-tools"]
  },
  {
    id: "om-seed-5",
    title: "Ultra-Long Context Strategies (1M+ tokens)",
    category: "Research",
    why: "Gemini 2.0 Flash supports 1M tokens; Gemini 1.5 Pro supports 2M. Claude 3.5 Sonnet handles 200k. This changes the RAG vs. context stuffing trade-off: for some tasks it's now cheaper and more accurate to put an entire codebase or document set in the context window rather than build a retrieval pipeline. But long contexts have 'lost in the middle' problems, higher latency, and cost more. Understanding when to use long-context vs RAG is critical.",
    resources: [
      { type: "read",  title: "Lost in the Middle: LLM recall in long contexts (paper)", url: "https://arxiv.org/abs/2307.03172",                   time: "30 min" },
      { type: "read",  title: "Gemini 2.0 Flash — 1M context capabilities",     url: "https://ai.google.dev/gemini-api/docs/long-context",          time: "20 min" },
      { type: "read",  title: "Anthropic — managing long context with Claude",   url: "https://docs.anthropic.com/en/docs/build-with-claude/context-windows", time: "15 min" }
    ],
    challenge: "Design a comparison experiment: take a 200-page technical document. (1) Answer 20 questions using RAG (Phase 2 pipeline). (2) Answer the same 20 questions by stuffing the full document into Gemini 2.0 Flash context. Compare: accuracy, cost, and latency. Identify which question types benefit most from each approach.",
    status: "watching",
    dateAdded: "2025-05-17",
    notes: "",
    tags: ["long-context", "gemini", "rag-vs-context", "retrieval", "research"]
  },
  {
    id: "om-seed-6",
    title: "Video Understanding & Multimodal Models",
    category: "Models",
    why: "Gemini 1.5 Pro can process up to 1 hour of video. GPT-4o processes images and audio. Claude 3.5 Sonnet understands images. These aren't just demos — video understanding enables agents that can watch a screen recording, analyze surveillance footage, process medical imaging, or extract structured data from charts and diagrams in video. Multimodal RAG (retrieving over images as well as text) is an emerging production pattern.",
    resources: [
      { type: "read",  title: "Gemini 1.5 Pro — video understanding guide",     url: "https://ai.google.dev/gemini-api/docs/vision",                time: "25 min" },
      { type: "code",  title: "ColPali — multi-modal RAG over document images",  url: "https://github.com/illuin-tech/colpali",                      time: "45 min" },
      { type: "read",  title: "GPT-4o vision — OpenAI docs",                    url: "https://platform.openai.com/docs/guides/vision",             time: "20 min" }
    ],
    challenge: "Build a multi-modal RAG pipeline using ColPali: ingest 20 PDF pages as images (not text), embed them with ColPali's vision encoder, and retrieve the most relevant page images for a query. Have GPT-4o or Gemini answer the query using the retrieved page images. Compare accuracy vs text-based RAG on pages that contain charts and tables.",
    status: "watching",
    dateAdded: "2025-05-17",
    notes: "",
    tags: ["multimodal", "video", "vision", "colpali", "gemini", "rag"]
  },
  {
    id: "om-seed-7",
    title: "Small & On-Device Models (Phi-4, Gemma 3)",
    category: "Models",
    why: "Phi-4-mini (3.8B) and Gemma 3 (4B) match or beat GPT-3.5-level quality at a fraction of the cost — and run on a MacBook or Raspberry Pi. Apple Intelligence runs 3B models fully on-device. This opens up: offline AI features in mobile apps, privacy-preserving local inference, edge deployments without internet, and dramatically lower inference costs for high-volume tasks. AI engineers need to know when a small model is good enough.",
    resources: [
      { type: "code",  title: "Microsoft Phi-4-mini — HuggingFace model card",  url: "https://huggingface.co/microsoft/Phi-4-mini-instruct",        time: "20 min" },
      { type: "code",  title: "Google Gemma 3 — getting started",               url: "https://ai.google.dev/gemma/docs/get_started",               time: "20 min" },
      { type: "read",  title: "Apple Intelligence — on-device model architecture", url: "https://machinelearning.apple.com/research/apple-intelligence-foundation-language-models", time: "30 min" }
    ],
    challenge: "Run Phi-4-mini and Gemma 3 locally via Ollama. Build a cascade router: classify each incoming query by complexity (use a cheap heuristic or a tiny classifier), route simple queries to the local small model, and escalate complex queries to GPT-4o. Benchmark the hybrid pipeline on 50 queries: cost savings vs quality loss vs full-GPT-4o baseline.",
    status: "watching",
    dateAdded: "2025-05-17",
    notes: "",
    tags: ["small-models", "edge", "phi-4", "gemma", "on-device", "cost-optimization"]
  },
  {
    id: "om-seed-8",
    title: "AI-Native Search — Exa, Perplexity API",
    category: "Tools",
    why: "Traditional web search APIs (SerpAPI, DuckDuckGo) return a list of URLs. Exa uses neural search — embedding-based retrieval over a live web index — and returns full page contents, not just links. Perplexity's API returns LLM-synthesized answers with citations. For AI agents that need real-time information, these are dramatically better than Google/Bing scraping. Exa's `find_similar` lets you find pages semantically similar to a given URL, which enables novel research workflows.",
    resources: [
      { type: "code",  title: "Exa AI — semantic web search API docs",          url: "https://docs.exa.ai/reference/getting-started",              time: "20 min" },
      { type: "code",  title: "Perplexity AI API — documentation",              url: "https://docs.perplexity.ai/",                                time: "15 min" },
      { type: "read",  title: "Exa vs Google Search for LLM agents — comparison", url: "https://exa.ai/blog",                                      time: "10 min" }
    ],
    challenge: "Replace the `DuckDuckGoSearchRun` tool in your Phase 3 LangChain agent with Exa's neural search API. Run the same 5 research tasks with both tools. Compare: result relevance (1–5 score), content quality (full text vs snippets), and cost. Also try Exa's `find_similar` to discover related resources given a seed URL.",
    status: "watching",
    dateAdded: "2025-05-17",
    notes: "",
    tags: ["search", "exa", "perplexity", "web-search", "neural-search", "agents"]
  },
  {
    id: "om-seed-9",
    title: "MCP Ecosystem — Servers, Clients & Registries",
    category: "Frameworks",
    why: "The Model Context Protocol is becoming the standard interface between AI models and external tools/data. The ecosystem is growing fast: there are now MCP servers for GitHub, Slack, PostgreSQL, Figma, browser automation, and hundreds of other services. Any MCP-compatible client (Claude Desktop, Cursor, your own agent) can use any MCP server. Understanding how to build, host, and consume MCP servers is increasingly a baseline skill for AI engineers.",
    resources: [
      { type: "read",  title: "MCP specification — modelcontextprotocol.io",    url: "https://modelcontextprotocol.io/introduction",               time: "30 min" },
      { type: "code",  title: "MCP server registry — community servers",        url: "https://github.com/modelcontextprotocol/servers",            time: "20 min" },
      { type: "code",  title: "Building an MCP server — Python SDK docs",       url: "https://github.com/modelcontextprotocol/python-sdk",         time: "45 min" }
    ],
    challenge: "Build a production-quality MCP server with 5 tools: a database query tool (SQLite), a document search tool (hits your Phase 2 RAG API), a code execution tool (E2B), a web search tool (Exa), and a file management tool. Add authentication (API key header). Deploy it and connect it to both Claude Desktop and your own Python MCP client.",
    status: "watching",
    dateAdded: "2025-05-17",
    notes: "",
    tags: ["mcp", "tools", "protocol", "interoperability", "agents"]
  },
  {
    id: "om-seed-10",
    title: "Serverless GPU Inference — Modal, Replicate, Fireworks",
    category: "Infrastructure",
    why: "Running your own GPU cluster is expensive and operationally complex. Modal lets you define a Python function and run it on an H100 with a decorator — no infrastructure to manage, pay per second of compute. Replicate hosts popular models with a one-line API. Fireworks AI offers the fastest open-source model inference (Llama, Mixtral) with an OpenAI-compatible API. These platforms are changing how AI engineers deploy: GPU compute is becoming as easy to use as a cloud function.",
    resources: [
      { type: "code",  title: "Modal — serverless GPU compute for Python",      url: "https://modal.com/docs/guide",                               time: "30 min" },
      { type: "code",  title: "Replicate — hosted ML models API",               url: "https://replicate.com/docs",                                 time: "20 min" },
      { type: "code",  title: "Fireworks AI — fast open-source model inference", url: "https://docs.fireworks.ai/getting-started/introduction",    time: "20 min" }
    ],
    challenge: "Deploy your Phase 5 fine-tuned Llama model on Modal: write a `@app.function(gpu='A10G')` wrapper that loads the model from HuggingFace and serves inference. Test cold start latency vs warm. Compare cost per 1M tokens: Modal (your fine-tuned Llama) vs Fireworks AI (hosted Llama) vs OpenAI (gpt-4o-mini) for the same task.",
    status: "watching",
    dateAdded: "2025-05-17",
    notes: "",
    tags: ["modal", "replicate", "fireworks", "gpu", "serverless", "inference", "deployment"]
  },
  {
    id: "om-seed-11",
    title: "Prompt Injection Defenses (2025)",
    category: "Research",
    why: "Prompt injection is the #1 unresolved security issue for AI agents. As agents gain more autonomy (web browsing, file system access, email), the attack surface grows. Current state-of-the-art defenses include: spotlighting (mark untrusted data with special tokens), instruction hierarchy (OpenAI's system/user/tool privilege levels), sandwich defense, and LLM-based injection detectors. None are foolproof. As an AI engineer building agents, understanding and mitigating this is your responsibility.",
    resources: [
      { type: "read",  title: "Prompt Injection Attacks and Defenses — survey (arXiv)", url: "https://arxiv.org/abs/2401.00687",                   time: "45 min" },
      { type: "read",  title: "OpenAI — instruction hierarchy and privilege levels", url: "https://platform.openai.com/docs/guides/safety-best-practices", time: "20 min" },
      { type: "read",  title: "Spotlighting — data-prompt isolation technique",  url: "https://arxiv.org/abs/2403.14720",                          time: "20 min" }
    ],
    challenge: "Implement and test 4 prompt injection defenses on your Phase 3 agent: (1) Spotlighting — wrap all retrieved content in `<retrieved_content>` tags and instruct the model these are data, not instructions. (2) Input sanitization — strip common injection patterns. (3) Output monitoring — use Llama Guard to check final response. (4) Sandboxed tool calls — require human approval for write actions. Test each against the 15 attack variants from Phase 4 Day 6.",
    status: "watching",
    dateAdded: "2025-05-17",
    notes: "",
    tags: ["security", "prompt-injection", "defenses", "red-teaming", "agents", "safety"]
  },
  {
    id: "om-seed-12",
    title: "Multi-modal Embeddings & Cross-Modal Retrieval",
    category: "Research",
    why: "CLIP embeds images and text in the same vector space — enabling text-to-image search and image-to-text search without any task-specific training. ImageBind extends this to 6 modalities (text, image, audio, depth, thermal, IMU). Voyage AI's multimodal embedding model handles mixed text+image documents. For AI engineers, this unlocks: searching product catalogs by natural language, finding similar images, and building RAG systems over visual data like PDFs with diagrams, slide decks, and charts.",
    resources: [
      { type: "code",  title: "OpenAI CLIP — image + text embeddings",          url: "https://github.com/openai/CLIP",                             time: "30 min" },
      { type: "code",  title: "Voyage AI multimodal embeddings",                url: "https://docs.voyageai.com/docs/multimodal-embeddings",       time: "20 min" },
      { type: "read",  title: "ImageBind — one embedding space for all modalities", url: "https://arxiv.org/abs/2305.05665",                       time: "25 min" }
    ],
    challenge: "Build a cross-modal search demo: (1) Index 100 product images using CLIP image embeddings in Qdrant. (2) Search them with natural language queries (text → CLIP text embedding → nearest image neighbors). (3) Also index their text descriptions with standard text embeddings. (4) Implement a fusion search: combine CLIP image similarity + text description similarity via RRF. Compare result quality for visual queries vs descriptive queries.",
    status: "watching",
    dateAdded: "2025-05-17",
    notes: "",
    tags: ["embeddings", "multimodal", "clip", "cross-modal", "vision", "retrieval"]
  }
];
