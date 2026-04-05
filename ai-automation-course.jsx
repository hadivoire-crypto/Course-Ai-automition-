import { useState, useEffect, useRef } from "react";

const COURSES = {
  beginner: {
    label: "مبتدئ",
    labelEn: "BEGINNER",
    color: "#00ff88",
    glow: "0 0 20px #00ff8855",
    xpMultiplier: 1,
    courses: [
      {
        id: "b1", title: "مقدمة في الأتمتة بالذكاء الاصطناعي",
        channel: "AI Automation Society", link: "https://www.youtube.com/@aiautomationsociety",
        icon: "🤖", duration: "4 ساعات", lessons: 12, xp: 150,
        desc: "فهم أساسيات الأتمتة وكيف يغير الذكاء الاصطناعي طريقة عملنا"
      },
      {
        id: "b2", title: "Zapier من الصفر إلى الاحتراف",
        channel: "Liam Ottley", link: "https://www.youtube.com/@LiamOttley",
        icon: "⚡", duration: "3 ساعات", lessons: 9, xp: 120,
        desc: "ربط التطبيقات وأتمتة المهام اليومية بدون كود"
      },
      {
        id: "b3", title: "Make.com - بناء أول سيناريو",
        channel: "Make Official", link: "https://www.youtube.com/@Make",
        icon: "🔗", duration: "5 ساعات", lessons: 14, xp: 180,
        desc: "بناء workflows احترافية باستخدام Make.com"
      },
      {
        id: "b4", title: "ChatGPT API للمبتدئين",
        channel: "TechWithTim", link: "https://www.youtube.com/@TechWithTim",
        icon: "💬", duration: "2.5 ساعات", lessons: 8, xp: 100,
        desc: "استخدام ChatGPT API في مشاريع حقيقية"
      },
    ],
    projects: [
      { id: "bp1", title: "مؤتمت الإيميلات", desc: "أنشئ workflow يرسل إيميلات تلقائية عند تلقي رسائل معينة", xp: 200, difficulty: 1 },
      { id: "bp2", title: "جدولة المحتوى", desc: "نظام ينشر تلقائياً على منصات التواصل الاجتماعي", xp: 250, difficulty: 2 },
      { id: "bp3", title: "بوت خدمة العملاء", desc: "بوت بسيط يجيب على الأسئلة الشائعة باستخدام ChatGPT", xp: 300, difficulty: 2 },
    ]
  },
  intermediate: {
    label: "متوسط",
    labelEn: "INTERMEDIATE",
    color: "#00d4ff",
    glow: "0 0 20px #00d4ff55",
    xpMultiplier: 2,
    courses: [
      {
        id: "m1", title: "N8N - أتمتة متقدمة مفتوحة المصدر",
        channel: "Leon Van Zyl", link: "https://www.youtube.com/@leonvanzyl",
        icon: "⚙️", duration: "8 ساعات", lessons: 22, xp: 350,
        desc: "بناء workflows معقدة باستخدام N8N self-hosted"
      },
      {
        id: "m2", title: "OpenRouter - نماذج AI متعددة",
        channel: "Matthew Berman", link: "https://www.youtube.com/@matthew_berman",
        icon: "🌐", duration: "5 ساعات", lessons: 15, xp: 280,
        desc: "استخدام OpenRouter للوصول لأفضل نماذج AI"
      },
      {
        id: "m3", title: "بناء AI Agents بـ LangChain",
        channel: "Sam Witteveen", link: "https://www.youtube.com/@samwitteveenai",
        icon: "🕸️", duration: "10 ساعات", lessons: 28, xp: 420,
        desc: "إنشاء عملاء ذكاء اصطناعي قادرين على اتخاذ قرارات"
      },
      {
        id: "m4", title: "Airtable + AI Integration",
        channel: "Ben Collis", link: "https://www.youtube.com/@bencollis",
        icon: "📊", duration: "4 ساعات", lessons: 11, xp: 220,
        desc: "ربط قواعد البيانات بنماذج الذكاء الاصطناعي"
      },
      {
        id: "m5", title: "Webhook وAPI الاحترافية",
        channel: "Liam Ottley", link: "https://www.youtube.com/@LiamOttley",
        icon: "🔌", duration: "6 ساعات", lessons: 18, xp: 300,
        desc: "بناء integrations متقدمة باستخدام Webhooks"
      },
    ],
    projects: [
      { id: "mp1", title: "نظام CRM ذكي", desc: "CRM يصنف العملاء تلقائياً ويرسل عروضاً مخصصة باستخدام N8N", xp: 500, difficulty: 3 },
      { id: "mp2", title: "مساعد أبحاث AI", desc: "أداة تجمع المعلومات من الإنترنت وتلخصها بشكل تلقائي", xp: 600, difficulty: 3 },
      { id: "mp3", title: "منصة محتوى ذكية", desc: "نظام يولد ويجدول ويحلل أداء المحتوى تلقائياً", xp: 700, difficulty: 4 },
    ]
  },
  advanced: {
    label: "متقدم",
    labelEn: "ADVANCED",
    color: "#ff6b35",
    glow: "0 0 20px #ff6b3555",
    xpMultiplier: 3,
    courses: [
      {
        id: "a1", title: "OpenCrew - Multi-Agent Systems",
        channel: "CrewAI Official", link: "https://www.youtube.com/@crewAI-official",
        icon: "👥", duration: "12 ساعات", lessons: 32, xp: 600,
        desc: "بناء أنظمة متعددة الوكلاء تتعاون لإنجاز مهام معقدة"
      },
      {
        id: "a2", title: "N8N + LLM: منظومة ذكاء متكاملة",
        channel: "Leon Van Zyl", link: "https://www.youtube.com/@leonvanzyl",
        icon: "🧠", duration: "15 ساعات", lessons: 40, xp: 750,
        desc: "دمج N8N مع نماذج اللغة الكبيرة لبناء أنظمة ذكية"
      },
      {
        id: "a3", title: "بناء SaaS بالأتمتة الكاملة",
        channel: "Liam Ottley", link: "https://www.youtube.com/@LiamOttley",
        icon: "🚀", duration: "20 ساعات", lessons: 55, xp: 900,
        desc: "من الفكرة إلى منتج حقيقي يحقق دخلاً باستخدام AI"
      },
      {
        id: "a4", title: "RAG وقواعد المعرفة المخصصة",
        channel: "AI Jason", link: "https://www.youtube.com/@AIJasonZ",
        icon: "📚", duration: "10 ساعات", lessons: 27, xp: 650,
        desc: "بناء أنظمة RAG لإنشاء AI يعرف كل شيء عن مجالك"
      },
      {
        id: "a5", title: "نشر AI على Production",
        channel: "Patrick Loeber", link: "https://www.youtube.com/@patloeber",
        icon: "🏭", duration: "8 ساعات", lessons: 22, xp: 500,
        desc: "نشر وإدارة وتوسيع أنظمة الذكاء الاصطناعي"
      },
    ],
    projects: [
      { id: "ap1", title: "وكيل أعمال متكامل", desc: "نظام multi-agent يدير التسويق والمبيعات والدعم تلقائياً", xp: 1200, difficulty: 5 },
      { id: "ap2", title: "منصة SaaS بالذكاء الاصطناعي", desc: "منتج كامل به مستخدمون ودفع ومنطق أعمال مؤتمت", xp: 1500, difficulty: 5 },
      { id: "ap3", title: "نظام RAG المؤسسي", desc: "نظام معرفة ذكي لشركة كاملة مع تكامل Slack وNotion", xp: 1800, difficulty: 5 },
    ]
  }
};

const TOOLS = [
  { name: "N8N", desc: "أتمتة مفتوحة المصدر", icon: "⚙️", color: "#ff6b35", link: "https://n8n.io" },
  { name: "OpenRouter", desc: "بوابة نماذج AI", icon: "🌐", color: "#00d4ff", link: "https://openrouter.ai" },
  { name: "CrewAI", desc: "نظام Multi-Agent", icon: "👥", color: "#00ff88", link: "https://crewai.com" },
  { name: "Make.com", desc: "أتمتة بصرية", icon: "🔗", color: "#a855f7", link: "https://make.com" },
  { name: "LangChain", desc: "إطار LLM", icon: "🕸️", color: "#fbbf24", link: "https://langchain.com" },
  { name: "Zapier", desc: "ربط التطبيقات", icon: "⚡", color: "#ff4d4d", link: "https://zapier.com" },
  { name: "Flowise", desc: "AI Flows بصرياً", icon: "🌊", color: "#06b6d4", link: "https://flowiseai.com" },
  { name: "Voiceflow", desc: "بناء بوتات صوتية", icon: "🎙️", color: "#8b5cf6", link: "https://voiceflow.com" },
];

const BADGES = [
  { id: "first_lesson", icon: "🎯", title: "أول خطوة", desc: "أكملت أول درس", xp: 50 },
  { id: "first_project", icon: "🔨", title: "صانع", desc: "سلّمت أول مشروع", xp: 100 },
  { id: "week_streak", icon: "🔥", title: "أسبوع ملتزم", desc: "7 أيام متواصلة", xp: 200 },
  { id: "beginner_done", icon: "🌱", title: "خطوة المبتدئ", desc: "أكملت المستوى المبتدئ", xp: 500 },
  { id: "intermediate_done", icon: "⭐", title: "محترف صاعد", desc: "أكملت المستوى المتوسط", xp: 1000 },
  { id: "advanced_done", icon: "🏆", title: "خبير الأتمتة", desc: "أكملت المستوى المتقدم", xp: 2000 },
  { id: "tool_master", icon: "🛠️", title: "سيد الأدوات", desc: "استخدمت 5 أدوات مختلفة", xp: 300 },
  { id: "early_bird", icon: "🌅", title: "النهوض مبكراً", desc: "درست في الساعة 6 صباحاً", xp: 150 },
];

function XPBar({ current, max, color }) {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div style={{ background: "#ffffff10", borderRadius: 99, height: 8, overflow: "hidden" }}>
      <div style={{
        width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${color}88, ${color})`,
        borderRadius: 99, transition: "width 1s ease", boxShadow: `0 0 10px ${color}66`
      }} />
    </div>
  );
}

function StarRating({ n }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: 10, color: i <= n ? "#fbbf24" : "#ffffff20" }}>★</span>
      ))}
    </div>
  );
}

export default function App() {
  const [activeLevel, setActiveLevel] = useState("beginner");
  const [activeTab, setActiveTab] = useState("courses");
  const [completedCourses, setCompletedCourses] = useState({});
  const [completedProjects, setCompletedProjects] = useState({});
  const [earnedBadges, setEarnedBadges] = useState({});
  const [streak, setStreak] = useState(3);
  const [showBadgeToast, setShowBadgeToast] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [notes, setNotes] = useState({});
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const canvasRef = useRef(null);

  const totalXP = Object.entries(completedCourses).reduce((acc, [id, done]) => {
    if (!done) return acc;
    for (const lvl of Object.values(COURSES)) {
      const c = lvl.courses.find(x => x.id === id);
      if (c) return acc + c.xp;
    }
    return acc;
  }, 0) + Object.entries(completedProjects).reduce((acc, [id, done]) => {
    if (!done) return acc;
    for (const lvl of Object.values(COURSES)) {
      const p = lvl.projects.find(x => x.id === id);
      if (p) return acc + p.xp;
    }
    return acc;
  }, 0);

  const level = totalXP < 1000 ? 1 : totalXP < 3000 ? 2 : totalXP < 6000 ? 3 : totalXP < 10000 ? 4 : 5;
  const nextLevelXP = [1000, 3000, 6000, 10000, 15000][level - 1];
  const prevLevelXP = [0, 1000, 3000, 6000, 10000][level - 1];

  const levelNames = ["", "Automation Novice", "Workflow Builder", "AI Engineer", "Automation Master", "AI Architect"];

  function toggleCourse(id) {
    setCompletedCourses(p => {
      const next = { ...p, [id]: !p[id] };
      if (!p[id]) {
        setShowBadgeToast({ icon: "✅", msg: "درس مكتمل! +XP" });
        setTimeout(() => setShowBadgeToast(null), 2500);
      }
      return next;
    });
  }

  function toggleProject(id) {
    setCompletedProjects(p => {
      const next = { ...p, [id]: !p[id] };
      if (!p[id]) {
        setShowBadgeToast({ icon: "🚀", msg: "مشروع مكتمل! +XP مضاعف" });
        setTimeout(() => setShowBadgeToast(null), 2500);
      }
      return next;
    });
  }

  function toggleBadge(id) {
    setEarnedBadges(p => ({ ...p, [id]: !p[id] }));
  }

  function levelProgress(lvl) {
    const data = COURSES[lvl];
    const total = data.courses.length + data.projects.length;
    const done = data.courses.filter(c => completedCourses[c.id]).length +
      data.projects.filter(p => completedProjects[p.id]).length;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      a: Math.random()
    }));
    let raf;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.a * 0.4})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  const lvData = COURSES[activeLevel];

  const s = {
    app: {
      minHeight: "100vh", background: "#060810", color: "#e2e8f0",
      fontFamily: "'Tajawal', 'Cairo', sans-serif", direction: "rtl", position: "relative", overflow: "hidden"
    },
    canvas: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, width: "100%", height: "100%" },
    grid: {
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
      backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(6,8,16,0.9)", borderBottom: "1px solid rgba(0,212,255,0.15)",
      backdropFilter: "blur(20px)", padding: "0 24px", display: "flex", alignItems: "center",
      justifyContent: "space-between", height: 64
    },
    logo: { fontSize: 20, fontWeight: 900, letterSpacing: 2, color: "#00d4ff", textTransform: "uppercase" },
    navLinks: { display: "flex", gap: 4 },
    navLink: (active) => ({
      padding: "6px 14px", borderRadius: 6, fontSize: 13, cursor: "pointer", border: "none",
      background: active ? "rgba(0,212,255,0.15)" : "transparent",
      color: active ? "#00d4ff" : "#94a3b8", fontFamily: "'Tajawal', sans-serif",
      transition: "all 0.2s", fontWeight: active ? 700 : 400
    }),
    main: { paddingTop: 80, paddingBottom: 40, maxWidth: 1200, margin: "0 auto", padding: "80px 20px 40px", position: "relative", zIndex: 1 },
    hero: {
      textAlign: "center", padding: "60px 20px 40px",
      background: "linear-gradient(180deg, rgba(0,212,255,0.05) 0%, transparent 100%)"
    },
    heroTag: {
      display: "inline-block", padding: "4px 16px", borderRadius: 99,
      border: "1px solid rgba(0,255,136,0.4)", color: "#00ff88", fontSize: 12,
      letterSpacing: 3, textTransform: "uppercase", marginBottom: 20, fontWeight: 700
    },
    heroTitle: { fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 16,
      background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #00ff88 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
    },
    heroSub: { fontSize: 17, color: "#94a3b8", maxWidth: 600, margin: "0 auto 40px" },
    statsRow: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 },
    statCard: (color) => ({
      background: `rgba(${color === "#00ff88" ? "0,255,136" : color === "#00d4ff" ? "0,212,255" : "255,107,53"},0.07)`,
      border: `1px solid ${color}25`, borderRadius: 12, padding: "16px 24px", textAlign: "center", minWidth: 120
    }),
    statNum: (color) => ({ fontSize: 28, fontWeight: 900, color, display: "block" }),
    statLabel: { fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 },
    xpSection: {
      background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.15)",
      borderRadius: 16, padding: 20, marginBottom: 24
    },
    xpHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
    xpLevel: { fontSize: 13, color: "#00d4ff", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 },
    xpPoints: { fontSize: 13, color: "#64748b" },
    levelTabs: { display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" },
    levelTab: (active, color) => ({
      flex: 1, minWidth: 120, padding: "12px 16px", borderRadius: 10, cursor: "pointer",
      border: `1px solid ${active ? color : "rgba(255,255,255,0.08)"}`,
      background: active ? `${color}15` : "rgba(255,255,255,0.02)",
      color: active ? color : "#64748b", textAlign: "center", transition: "all 0.3s",
      boxShadow: active ? `0 0 20px ${color}30` : "none"
    }),
    tabLabel: { fontSize: 16, fontWeight: 900, display: "block" },
    tabSub: { fontSize: 11, display: "block", marginTop: 2, opacity: 0.7 },
    tabProgress: { fontSize: 11, display: "block", marginTop: 6, fontWeight: 700 },
    innerTabs: { display: "flex", gap: 6, marginBottom: 20 },
    innerTab: (active) => ({
      padding: "8px 16px", borderRadius: 8, cursor: "pointer", border: "none", fontSize: 13,
      background: active ? "#00d4ff20" : "rgba(255,255,255,0.04)",
      color: active ? "#00d4ff" : "#64748b", fontFamily: "'Tajawal', sans-serif",
      transition: "all 0.2s", fontWeight: active ? 700 : 400
    }),
    courseCard: (done, color) => ({
      background: done ? `${color}08` : "rgba(255,255,255,0.02)",
      border: `1px solid ${done ? color + "40" : "rgba(255,255,255,0.07)"}`,
      borderRadius: 14, padding: 18, marginBottom: 12, cursor: "pointer",
      transition: "all 0.3s", boxShadow: done ? `0 0 20px ${color}15` : "none"
    }),
    courseRow: { display: "flex", alignItems: "flex-start", gap: 14 },
    courseIcon: (done, color) => ({
      width: 44, height: 44, borderRadius: 10, fontSize: 22, display: "flex",
      alignItems: "center", justifyContent: "center", flexShrink: 0,
      background: done ? `${color}20` : "rgba(255,255,255,0.06)",
      border: `1px solid ${done ? color + "40" : "rgba(255,255,255,0.08)"}`
    }),
    courseTitle: (done, color) => ({
      fontSize: 15, fontWeight: 700, color: done ? color : "#e2e8f0", marginBottom: 4
    }),
    courseMeta: { fontSize: 12, color: "#64748b", display: "flex", gap: 12, marginTop: 4, flexWrap: "wrap" },
    courseCheck: (done, color) => ({
      width: 22, height: 22, borderRadius: 6, border: `2px solid ${done ? color : "#ffffff20"}`,
      background: done ? color : "transparent", display: "flex", alignItems: "center", justifyContent: "center",
      marginRight: "auto", flexShrink: 0, cursor: "pointer", transition: "all 0.2s", marginLeft: 0
    }),
    linkBtn: (color) => ({
      display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px",
      borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none",
      background: `${color}15`, color, border: `1px solid ${color}30`,
      transition: "all 0.2s", marginTop: 10
    }),
    projectCard: (done, color) => ({
      background: done ? `${color}08` : "rgba(255,255,255,0.02)",
      border: `1px solid ${done ? color + "40" : "rgba(255,255,255,0.07)"}`,
      borderRadius: 14, padding: 18, marginBottom: 12,
      boxShadow: done ? `0 0 20px ${color}15` : "none"
    }),
    projRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    projTitle: (done, color) => ({ fontSize: 16, fontWeight: 700, color: done ? color : "#e2e8f0", marginBottom: 6 }),
    projDesc: { fontSize: 13, color: "#94a3b8", lineHeight: 1.6 },
    projXP: (color) => ({
      fontSize: 12, fontWeight: 700, color, background: `${color}15`,
      border: `1px solid ${color}30`, borderRadius: 99, padding: "4px 12px", whiteSpace: "nowrap"
    }),
    completeBtn: (done, color) => ({
      marginTop: 14, padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700,
      cursor: "pointer", border: "none", fontFamily: "'Tajawal', sans-serif", transition: "all 0.2s",
      background: done ? `${color}20` : color, color: done ? color : "#060810",
      boxShadow: done ? "none" : `0 4px 15px ${color}40`
    }),
    toolsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 },
    toolCard: (color) => ({
      background: `${color}06`, border: `1px solid ${color}20`, borderRadius: 12, padding: 16,
      textAlign: "center", cursor: "pointer", transition: "all 0.3s", textDecoration: "none",
      display: "block"
    }),
    toolIcon: { fontSize: 32, display: "block", marginBottom: 8 },
    toolName: (color) => ({ fontSize: 15, fontWeight: 800, color, display: "block", marginBottom: 4 }),
    toolDesc: { fontSize: 12, color: "#64748b" },
    badgesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 },
    badgeCard: (earned) => ({
      background: earned ? "rgba(0,255,136,0.07)" : "rgba(255,255,255,0.02)",
      border: `1px solid ${earned ? "#00ff8840" : "rgba(255,255,255,0.07)"}`,
      borderRadius: 12, padding: 16, textAlign: "center", cursor: "pointer",
      transition: "all 0.3s", opacity: earned ? 1 : 0.45,
      boxShadow: earned ? "0 0 20px rgba(0,255,136,0.1)" : "none"
    }),
    badgeIcon: { fontSize: 36, display: "block", marginBottom: 8 },
    badgeTitle: (earned) => ({ fontSize: 13, fontWeight: 700, color: earned ? "#00ff88" : "#64748b" }),
    badgeDesc: { fontSize: 11, color: "#64748b", marginTop: 4 },
    badgeXP: { fontSize: 11, color: "#fbbf24", fontWeight: 700, marginTop: 6 },
    streakBox: {
      background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.25)",
      borderRadius: 12, padding: "14px 20px", display: "flex", alignItems: "center",
      gap: 14, marginBottom: 20
    },
    streakNum: { fontSize: 36, fontWeight: 900, color: "#fbbf24" },
    sectionTitle: { fontSize: 20, fontWeight: 800, color: "#e2e8f0", marginBottom: 16, letterSpacing: -0.5 },
    noteArea: {
      width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.2)",
      borderRadius: 8, color: "#e2e8f0", padding: 12, fontSize: 13, resize: "vertical",
      fontFamily: "'Tajawal', sans-serif", minHeight: 80, boxSizing: "border-box"
    },
    toast: {
      position: "fixed", bottom: 30, right: 30, zIndex: 999,
      background: "rgba(0,255,136,0.15)", border: "1px solid #00ff8840",
      backdropFilter: "blur(12px)", borderRadius: 12, padding: "12px 20px",
      display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 700,
      color: "#00ff88", animation: "slideIn 0.4s ease", boxShadow: "0 0 30px rgba(0,255,136,0.3)"
    }
  };

  return (
    <div style={s.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Cairo:wght@400;600;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060810; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #00d4ff30; border-radius: 2px; }
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        .course-card:hover { transform: translateY(-2px) !important; }
        .tool-card:hover { transform: scale(1.04) !important; border-opacity: 1 !important; }
        .nav-link:hover { color: #00d4ff !important; }
        a { color: inherit; }
      `}</style>

      <canvas ref={canvasRef} style={s.canvas} />
      <div style={s.grid} />

      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.logo}>⚡ AI<span style={{ color: "#00ff88" }}>AUTO</span></div>
        <div style={s.navLinks}>
          {[["dashboard","لوحة التحكم"],["courses","الدورات"],["tools","الأدوات"],["badges","الإنجازات"]].map(([k,v]) => (
            <button key={k} style={s.navLink(activeSection === k)} onClick={() => setActiveSection(k)} className="nav-link">{v}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: "#fbbf24" }}>🔥 {streak} يوم</span>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#00d4ff,#00ff88)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#060810" }}>
            {level}
          </div>
        </div>
      </nav>

      <div style={s.main}>

        {/* DASHBOARD */}
        {activeSection === "dashboard" && (
          <div>
            <div style={s.hero}>
              <div style={s.heroTag}>Professional AI Automation Path</div>
              <h1 style={s.heroTitle}>احترف الأتمتة<br />بالذكاء الاصطناعي</h1>
              <p style={s.heroSub}>من الصفر إلى بناء منظومات ذكاء اصطناعي متكاملة — بمنهج تطبيقي، مشاريع حقيقية، وتتبع تقدم ذكي</p>
              <div style={s.statsRow}>
                <div style={s.statCard("#00ff88")}><span style={s.statNum("#00ff88")}>{totalXP.toLocaleString()}</span><span style={s.statLabel}>نقطة XP</span></div>
                <div style={s.statCard("#00d4ff")}><span style={s.statNum("#00d4ff")}>Lv.{level}</span><span style={s.statLabel}>{levelNames[level]}</span></div>
                <div style={s.statCard("#ff6b35")}><span style={s.statNum("#ff6b35")}>{streak}</span><span style={s.statLabel}>أيام متواصلة</span></div>
                <div style={s.statCard("#a855f7")}><span style={s.statNum("#a855f7")}>{Object.values(earnedBadges).filter(Boolean).length}</span><span style={s.statLabel}>إنجازات</span></div>
              </div>
            </div>

            {/* XP Progress */}
            <div style={s.xpSection}>
              <div style={s.xpHeader}>
                <span style={s.xpLevel}>المستوى {level} — {levelNames[level]}</span>
                <span style={s.xpPoints}>{totalXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP</span>
              </div>
              <XPBar current={totalXP - prevLevelXP} max={nextLevelXP - prevLevelXP} color="#00d4ff" />
              <div style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}>
                {nextLevelXP - totalXP > 0 ? `${(nextLevelXP - totalXP).toLocaleString()} XP حتى المستوى التالي` : "وصلت للقمة! 🏆"}
              </div>
            </div>

            {/* Streak */}
            <div style={s.streakBox}>
              <span style={s.streakNum}>🔥 {streak}</span>
              <div>
                <div style={{ fontWeight: 800, color: "#fbbf24", marginBottom: 4 }}>سلسلة التعلم المتواصل</div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>تعلمت {streak} أيام متتالية — استمر للحصول على مكافأة أسبوع!</div>
              </div>
            </div>

            {/* Level Progress Summary */}
            <div style={s.sectionTitle}>تقدمك في كل مستوى</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 32 }}>
              {Object.entries(COURSES).map(([key, lvl]) => {
                const { done, total, pct } = levelProgress(key);
                return (
                  <div key={key} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${lvl.color}20`, borderRadius: 14, padding: 20, cursor: "pointer" }}
                    onClick={() => { setActiveSection("courses"); setActiveLevel(key); }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ fontWeight: 800, color: lvl.color }}>{lvl.label}</span>
                      <span style={{ fontSize: 12, color: "#64748b" }}>{done}/{total} مكتمل</span>
                    </div>
                    <XPBar current={done} max={total} color={lvl.color} />
                    <div style={{ marginTop: 8, fontSize: 13, color: "#94a3b8" }}>{pct}% مكتمل</div>
                  </div>
                );
              })}
            </div>

            {/* Quick Tools */}
            <div style={s.sectionTitle}>الأدوات الأساسية</div>
            <div style={s.toolsGrid}>
              {TOOLS.slice(0, 4).map(t => (
                <a key={t.name} href={t.link} target="_blank" rel="noreferrer" style={s.toolCard(t.color)} className="tool-card">
                  <span style={s.toolIcon}>{t.icon}</span>
                  <span style={s.toolName(t.color)}>{t.name}</span>
                  <span style={s.toolDesc}>{t.desc}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* COURSES */}
        {activeSection === "courses" && (
          <div>
            <div style={s.sectionTitle}>مسار التعلم</div>

            {/* Level Selector */}
            <div style={s.levelTabs}>
              {Object.entries(COURSES).map(([key, lvl]) => {
                const { pct, done, total } = levelProgress(key);
                return (
                  <div key={key} style={s.levelTab(activeLevel === key, lvl.color)} onClick={() => setActiveLevel(key)}>
                    <span style={s.tabLabel}>{lvl.label}</span>
                    <span style={s.tabSub}>{lvl.labelEn}</span>
                    <span style={s.tabProgress}>{pct}% ({done}/{total})</span>
                    <div style={{ marginTop: 8 }}><XPBar current={done} max={total} color={lvl.color} /></div>
                  </div>
                );
              })}
            </div>

            {/* Inner Tabs */}
            <div style={s.innerTabs}>
              {[["courses","الدروس"],["projects","المشاريع"]].map(([k,v]) => (
                <button key={k} style={s.innerTab(activeTab === k)} onClick={() => setActiveTab(k)}>{v}</button>
              ))}
            </div>

            {/* Courses List */}
            {activeTab === "courses" && (
              <div>
                {lvData.courses.map(course => {
                  const done = !!completedCourses[course.id];
                  const expanded = expandedCourse === course.id;
                  return (
                    <div key={course.id} style={s.courseCard(done, lvData.color)} className="course-card"
                      onClick={() => setExpandedCourse(expanded ? null : course.id)}>
                      <div style={s.courseRow}>
                        <div style={s.courseIcon(done, lvData.color)}>{course.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={s.courseTitle(done, lvData.color)}>{course.title}</div>
                          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>{course.channel}</div>
                          <div style={s.courseMeta}>
                            <span>⏱ {course.duration}</span>
                            <span>📖 {course.lessons} درس</span>
                            <span style={{ color: "#fbbf24" }}>⚡ {course.xp} XP</span>
                          </div>
                        </div>
                        <div style={s.courseCheck(done, lvData.color)} onClick={e => { e.stopPropagation(); toggleCourse(course.id); }}>
                          {done && <span style={{ color: "#060810", fontSize: 13, fontWeight: 900 }}>✓</span>}
                        </div>
                      </div>
                      {expanded && (
                        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                          <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 12, lineHeight: 1.7 }}>{course.desc}</p>
                          <a href={course.link} target="_blank" rel="noreferrer" style={s.linkBtn(lvData.color)} onClick={e => e.stopPropagation()}>
                            🎬 فتح القناة على YouTube ↗
                          </a>
                          <div style={{ marginTop: 14 }}>
                            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>ملاحظاتي:</div>
                            {editingNote === course.id ? (
                              <div>
                                <textarea style={s.noteArea} value={noteText} onChange={e => setNoteText(e.target.value)}
                                  placeholder="أضف ملاحظاتك هنا..." onClick={e => e.stopPropagation()} />
                                <button style={{ ...s.completeBtn(false, "#00d4ff"), marginTop: 8 }}
                                  onClick={e => { e.stopPropagation(); setNotes(p => ({ ...p, [course.id]: noteText })); setEditingNote(null); }}>
                                  حفظ الملاحظة
                                </button>
                              </div>
                            ) : (
                              <div onClick={e => { e.stopPropagation(); setEditingNote(course.id); setNoteText(notes[course.id] || ""); }}
                                style={{ fontSize: 13, color: notes[course.id] ? "#94a3b8" : "#334155", background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 8, padding: 10, cursor: "text", minHeight: 40 }}>
                                {notes[course.id] || "اضغط لإضافة ملاحظة..."}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Projects List */}
            {activeTab === "projects" && (
              <div>
                <div style={{ background: `${lvData.color}08`, border: `1px solid ${lvData.color}20`, borderRadius: 12, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#94a3b8" }}>
                  💡 المشاريع مرتبة تصاعدياً — أكمل الأبسط أولاً ثم تحرك لمشاريع أكبر وأكثر تعقيداً
                </div>
                {lvData.projects.map(proj => {
                  const done = !!completedProjects[proj.id];
                  return (
                    <div key={proj.id} style={s.projectCard(done, lvData.color)}>
                      <div style={s.projRow}>
                        <div>
                          <div style={s.projTitle(done, lvData.color)}>{proj.title}</div>
                          <StarRating n={proj.difficulty} />
                          <p style={{ ...s.projDesc, marginTop: 8 }}>{proj.desc}</p>
                        </div>
                        <div style={s.projXP(lvData.color)}>+{proj.xp} XP</div>
                      </div>
                      <button style={s.completeBtn(done, lvData.color)} onClick={() => toggleProject(proj.id)}>
                        {done ? "✓ مكتمل" : "🚀 علّم كمكتمل"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TOOLS */}
        {activeSection === "tools" && (
          <div>
            <div style={s.sectionTitle}>الأدوات الجوهرية للأتمتة بالذكاء الاصطناعي</div>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>كل أداة تمثل ركيزة في منظومة الأتمتة الحديثة</p>
            <div style={s.toolsGrid}>
              {TOOLS.map(t => (
                <a key={t.name} href={t.link} target="_blank" rel="noreferrer" style={s.toolCard(t.color)} className="tool-card">
                  <span style={s.toolIcon}>{t.icon}</span>
                  <span style={s.toolName(t.color)}>{t.name}</span>
                  <span style={s.toolDesc}>{t.desc}</span>
                </a>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <div style={s.sectionTitle}>مسار تعلم الأدوات</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { step: 1, label: "ابدأ بـ Zapier", desc: "أبسط طريقة لفهم الأتمتة", color: "#ff4d4d" },
                  { step: 2, label: "انتقل لـ Make.com", desc: "workflows أكثر تعقيداً وتحكماً", color: "#a855f7" },
                  { step: 3, label: "احترف N8N", desc: "الحرية الكاملة مع الكود المفتوح", color: "#ff6b35" },
                  { step: 4, label: "أتقن OpenRouter", desc: "الوصول لأفضل نماذج AI", color: "#00d4ff" },
                  { step: 5, label: "ابنِ مع CrewAI", desc: "أنظمة multi-agent متقدمة", color: "#00ff88" },
                ].map(item => (
                  <div key={item.step} style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 18px" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: item.color, color: "#060810", fontWeight: 900, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.step}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: item.color }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BADGES */}
        {activeSection === "badges" && (
          <div>
            <div style={s.sectionTitle}>نظام الإنجازات والمكافآت</div>
            <div style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 12, padding: "12px 16px", marginBottom: 24, fontSize: 13, color: "#94a3b8" }}>
              🏅 اجمع الشارات بإتمام الدورات والمشاريع والتحديات اليومية — كل شارة تمنحك XP إضافية!
            </div>
            <div style={{ marginBottom: 28 }}>
              <div style={s.streakBox}>
                <span style={s.streakNum}>🔥 {streak}</span>
                <div>
                  <div style={{ fontWeight: 800, color: "#fbbf24" }}>سلسلة يومية</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
                    يومياتك المتواصلة — لا تكسر السلسلة!
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                    {Array.from({ length: 7 }, (_, i) => (
                      <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: i < streak % 7 || streak >= 7 ? "#fbbf24" : "rgba(255,255,255,0.06)", border: "1px solid rgba(251,191,36,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>
                        {i < streak % 7 || streak >= 7 ? "✓" : ""}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={s.badgesGrid}>
              {BADGES.map(b => {
                const earned = !!earnedBadges[b.id];
                return (
                  <div key={b.id} style={s.badgeCard(earned)} onClick={() => toggleBadge(b.id)}>
                    <span style={s.badgeIcon}>{b.icon}</span>
                    <div style={s.badgeTitle(earned)}>{b.title}</div>
                    <div style={s.badgeDesc}>{b.desc}</div>
                    <div style={s.badgeXP}>+{b.xp} XP</div>
                    {!earned && <div style={{ fontSize: 10, color: "#334155", marginTop: 6 }}>اضغط للتفعيل</div>}
                  </div>
                );
              })}
            </div>

            {/* Leaderboard */}
            <div style={{ marginTop: 32 }}>
              <div style={s.sectionTitle}>🏆 لوحة الصدارة</div>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
                {[
                  { rank: 1, name: "أحمد المطيري", xp: 12500, badge: "🏆", color: "#fbbf24" },
                  { rank: 2, name: "سارة الأنصاري", xp: 9800, badge: "🥈", color: "#94a3b8" },
                  { rank: 3, name: "محمد العمري", xp: 8200, badge: "🥉", color: "#ff6b35" },
                  { rank: 4, name: "أنت", xp: totalXP, badge: "⭐", color: "#00d4ff" },
                ].map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: p.name === "أنت" ? "rgba(0,212,255,0.05)" : "transparent" }}>
                    <span style={{ fontSize: 20 }}>{p.badge}</span>
                    <span style={{ width: 20, fontSize: 12, color: "#64748b", fontWeight: 700 }}>{p.rank}</span>
                    <span style={{ flex: 1, fontWeight: 700, color: p.name === "أنت" ? "#00d4ff" : "#e2e8f0" }}>{p.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{p.xp.toLocaleString()} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {showBadgeToast && (
        <div style={s.toast}>
          <span style={{ fontSize: 22 }}>{showBadgeToast.icon}</span>
          <span>{showBadgeToast.msg}</span>
        </div>
      )}
    </div>
  );
}
