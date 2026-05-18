const State = (() => {
  const STORAGE_KEY = 'ai_bootcamp_v2';

  function defaultState() {
    return {
      startDate: null,
      completedDays: {},
      skippedDays: {},
      dayNotes: {},
      totalHoursLogged: 0,
      sessionLog: []
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return Object.assign(defaultState(), parsed);
    } catch {
      return defaultState();
    }
  }

  let _state = load();

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_state));
  }

  function dayKey(phaseId, dayNum) {
    return `${phaseId}-d${dayNum}`;
  }

  function setStartDate(dateStr) {
    _state.startDate = dateStr;
    save();
  }

  function completeDay(phaseId, dayNum, hours, notes) {
    const key = dayKey(phaseId, dayNum);
    const hoursNum = Math.max(0, parseFloat(hours) || 0);
    _state.completedDays[key] = {
      completedAt: new Date().toISOString(),
      hoursSpent: hoursNum,
      notes: notes || ''
    };
    delete _state.skippedDays[key];
    _state.totalHoursLogged = parseFloat(
      (_state.totalHoursLogged + hoursNum).toFixed(2)
    );
    _state.sessionLog.push({
      date: new Date().toISOString(),
      dayKey: key,
      hoursSpent: hoursNum,
      action: 'complete'
    });
    save();
  }

  function skipDay(phaseId, dayNum, reason) {
    const key = dayKey(phaseId, dayNum);
    if (_state.completedDays[key]) return;
    _state.skippedDays[key] = {
      skippedAt: new Date().toISOString(),
      reason: reason || ''
    };
    _state.sessionLog.push({
      date: new Date().toISOString(),
      dayKey: key,
      hoursSpent: 0,
      action: 'skip'
    });
    save();
  }

  function undoComplete(phaseId, dayNum) {
    const key = dayKey(phaseId, dayNum);
    const entry = _state.completedDays[key];
    if (!entry) return;
    _state.totalHoursLogged = Math.max(
      0,
      parseFloat((_state.totalHoursLogged - (entry.hoursSpent || 0)).toFixed(2))
    );
    delete _state.completedDays[key];
    _state.sessionLog = _state.sessionLog.filter(
      e => !(e.dayKey === key && e.action === 'complete')
    );
    save();
  }

  function undoSkip(phaseId, dayNum) {
    const key = dayKey(phaseId, dayNum);
    delete _state.skippedDays[key];
    _state.sessionLog = _state.sessionLog.filter(
      e => !(e.dayKey === key && e.action === 'skip')
    );
    save();
  }

  function isDayComplete(phaseId, dayNum) {
    return !!_state.completedDays[dayKey(phaseId, dayNum)];
  }

  function isDaySkipped(phaseId, dayNum) {
    return !!_state.skippedDays[dayKey(phaseId, dayNum)];
  }

  function saveNote(phaseId, dayNum, value) {
    _state.dayNotes[dayKey(phaseId, dayNum)] = value;
    save();
  }

  function getNote(phaseId, dayNum) {
    return _state.dayNotes[dayKey(phaseId, dayNum)] || '';
  }

  function getCompletionData(phaseId, dayNum) {
    return _state.completedDays[dayKey(phaseId, dayNum)] || null;
  }

  function getPhaseProgress(phaseId) {
    const phase = BOOTCAMP_DATA.phases.find(p => p.id === phaseId);
    if (!phase) return { completed: 0, skipped: 0, total: 0, pct: 0 };
    const total = phase.days.length;
    const completed = phase.days.filter(d => isDayComplete(phaseId, d.day)).length;
    const skipped  = phase.days.filter(d => isDaySkipped(phaseId, d.day)).length;
    return { completed, skipped, total, pct: total > 0 ? Math.round((completed / total) * 100) : 0 };
  }

  function getTimeline() {
    if (!_state.startDate) return null;

    const start = new Date(_state.startDate + 'T00:00:00');
    const now   = new Date();
    const TOTAL_DAYS    = 50;
    const CALENDAR_DAYS = 70;
    const DAYS_PER_LEARNING_DAY = CALENDAR_DAYS / TOTAL_DAYS; // 1.4

    const originalEnd = new Date(start);
    originalEnd.setDate(originalEnd.getDate() + CALENDAR_DAYS);

    const completedCount = Object.keys(_state.completedDays).length;
    const skippedCount   = Object.keys(_state.skippedDays).length;

    const extraDays  = Math.ceil(skippedCount * DAYS_PER_LEARNING_DAY);
    const adaptiveEnd = new Date(originalEnd);
    adaptiveEnd.setDate(adaptiveEnd.getDate() + extraDays);

    const calendarDaysElapsed = Math.max(
      0,
      Math.floor((now - start) / (1000 * 60 * 60 * 24))
    );
    const expectedByNow = Math.floor(calendarDaysElapsed / DAYS_PER_LEARNING_DAY);
    const pctComplete   = Math.min(100, Math.round((completedCount / TOTAL_DAYS) * 100));

    let paceStatus;
    if      (completedCount >= expectedByNow)                     paceStatus = 'on-track';
    else if ((expectedByNow - completedCount) <= 2)               paceStatus = 'slightly-behind';
    else                                                           paceStatus = 'behind';

    return {
      startDate: _state.startDate,
      originalEnd:  originalEnd.toISOString().split('T')[0],
      adaptiveEnd:  adaptiveEnd.toISOString().split('T')[0],
      calendarDaysElapsed,
      completedCount,
      skippedCount,
      totalDays: TOTAL_DAYS,
      pctComplete,
      paceStatus,
      expectedByNow,
      extraDays
    };
  }

  function getUpNext() {
    for (const phase of BOOTCAMP_DATA.phases) {
      for (const day of phase.days) {
        if (!isDayComplete(phase.id, day.day) && !isDaySkipped(phase.id, day.day)) {
          return { phase, day };
        }
      }
    }
    return null;
  }

  function getCurrentPhase() {
    for (const phase of BOOTCAMP_DATA.phases) {
      const prog = getPhaseProgress(phase.id);
      if (prog.completed < prog.total) return phase;
    }
    return BOOTCAMP_DATA.phases[BOOTCAMP_DATA.phases.length - 1];
  }

  function getStreak() {
    const logs = _state.sessionLog
      .filter(e => e.action === 'complete')
      .map(e => e.date.split('T')[0])
      .filter((d, i, arr) => arr.indexOf(d) === i)
      .sort();
    if (!logs.length) return 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 864e5).toISOString().split('T')[0];
    const last = logs[logs.length - 1];
    if (last !== today && last !== yesterday) return 0;
    let streak = 1;
    for (let i = logs.length - 2; i >= 0; i--) {
      const diff = (new Date(logs[i + 1]) - new Date(logs[i])) / 864e5;
      if (diff <= 1.5) streak++;
      else break;
    }
    return streak;
  }

  function getState() { return _state; }

  function resetAll() {
    _state = defaultState();
    save();
  }

  return {
    dayKey,
    setStartDate,
    completeDay,
    skipDay,
    undoComplete,
    undoSkip,
    isDayComplete,
    isDaySkipped,
    saveNote,
    getNote,
    getCompletionData,
    getPhaseProgress,
    getTimeline,
    getUpNext,
    getCurrentPhase,
    getStreak,
    getState,
    resetAll
  };
})();

/* ─────────────────────────────────────────────────────────
   OpenModule — AI Frontier Tracker state
───────────────────────────────────────────────────────── */
const OpenModule = (() => {
  const OM_KEY = 'ai_bootcamp_frontier';

  function load() {
    try {
      const raw = localStorage.getItem(OM_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    // First load: seed with OPEN_MODULE_SEEDS
    const seeded = OPEN_MODULE_SEEDS.map(t => ({ ...t }));
    localStorage.setItem(OM_KEY, JSON.stringify(seeded));
    return seeded;
  }

  let _topics = load();

  function save() {
    localStorage.setItem(OM_KEY, JSON.stringify(_topics));
  }

  function getTopics() { return _topics; }

  function getTopic(id) { return _topics.find(t => t.id === id) || null; }

  function addTopic(topic) {
    const newTopic = {
      id: 'om-' + Date.now(),
      title: topic.title || 'Untitled',
      category: topic.category || 'Research',
      why: topic.why || '',
      resources: topic.resources || [],
      challenge: topic.challenge || '',
      status: 'watching',
      dateAdded: new Date().toISOString().split('T')[0],
      notes: '',
      tags: topic.tags || []
    };
    _topics.unshift(newTopic);
    save();
    return newTopic;
  }

  function updateTopic(id, updates) {
    const idx = _topics.findIndex(t => t.id === id);
    if (idx === -1) return;
    _topics[idx] = { ..._topics[idx], ...updates };
    save();
  }

  function deleteTopic(id) {
    _topics = _topics.filter(t => t.id !== id);
    save();
  }

  function setStatus(id, status) {
    updateTopic(id, { status });
  }

  function saveNote(id, note) {
    updateTopic(id, { notes: note });
  }

  function getStats() {
    const counts = { watching: 0, learning: 0, building: 0, shipped: 0 };
    _topics.forEach(t => { if (counts[t.status] !== undefined) counts[t.status]++; });
    return counts;
  }

  return { getTopics, getTopic, addTopic, updateTopic, deleteTopic, setStatus, saveNote, getStats };
})();
