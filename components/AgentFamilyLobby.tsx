"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Car,
  Instagram,
  Link as LinkIcon,
  Gavel,
  Stethoscope,
  Scale,
  Crown,
  MessagesSquare,
  Twitter,
  ExternalLink,
  Globe,
  Key,
  Puzzle,
  Search,
  Zap,
  Compass,
  Landmark,
  Dna,
  Shield,
  Link2 as ChainLinkIcon,
} from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// ==== Brand + Links ==========================================================
const BRAND = {
  bg: "bg-[#05070D] relative overflow-hidden font-sans",
  panel:
    "bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,255,255,0.15)]",
  neon: {
    legal: "from-emerald-800/40 to-emerald-400/30",
    medical: "from-cyan-800/40 to-cyan-400/30",
    agentc: "from-fuchsia-800/40 to-purple-500/30",
    mk: "from-amber-800/40 to-amber-400/30",
    agentx: "from-indigo-800/40 to-blue-500/30",
    global: "from-cyan-800/30 to-cyan-400/20",
  },
  email: "Auto@agentc.me",
};

// External links used across the lobby
const LINKS = {
  legalGPT: "https://LegalMemory.com/gpt",
  medicalGPT:
    "https://chatgpt.com/g/g-68a5f31a70e08191a7f69d46cdda5b55-medical-memory",
  agentXGPT:
    "https://chatgpt.com/g/g-688fefc5044c819197c60c79a1ba20ab-agentx",
  familyIG: "https://instagram.com/theagentfamily",
  familyX: "https://x.com/theagentfamily",
  agentX_IG: "https://instagram.com/mr.xtheagent",
  agentX_X: "https://x.com/AutoAgentX",
  agentC_IG: "https://instagram.com/autoagentc",
  agentC_X: "https://x.com/AutoAgentC",
  legal_IG: "https://instagram.com/legalmemory.ai",
  medical_IG: "https://instagram.com/medicalmemory.ai",
};

// ==== Buttons: high-contrast theme =========================================
const BTN = {
  primary: "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:opacity-90",
  secondary: "bg-white/10 text-white hover:bg-white/20",
  outline: "border-white/20 text-white hover:bg-white/10",
};

// ==== Utilities: navigation + smooth scroll + external open ==================
const NAV_OFFSET = 84; // height of fixed nav
function smoothScrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const y = window.scrollY + rect.top - NAV_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function openExternal(url) {
  try {
    window.open(url, "_blank", "noopener,noreferrer");
  } catch {
    window.location.href = url;
  }
}

// ==== Data: Council Members ==================================================
const AGENTS = [
  {
    key: "agentx",
    name: "AgentX",
    epithet: "The Crypto Savage",
    summary:
      "Market calls, wallet interrogation, and fearless agency trolling.",
    icon: MessagesSquare,
    gradient: BRAND.neon.agentx,
    ctas: [{ label: "Open AgentX GPT", href: LINKS.agentXGPT, primary: true }],
    socials: [
      { label: "IG", href: LINKS.agentX_IG, icon: Instagram },
      { label: "X", href: LINKS.agentX_X, icon: Twitter },
    ],
  },
  {
    key: "agentc",
    name: "AgentC",
    epithet: "Dealership / Automation",
    summary:
      "Sales orchestration, CRM automations, and precision customer flow.",
    icon: Car,
    gradient: BRAND.neon.agentc,
    ctas: [{ label: "Explore AgentC", href: "#/agent/agentc", primary: true }],
    socials: [
      { label: "IG", href: LINKS.agentC_IG, icon: Instagram },
      { label: "X", href: LINKS.agentC_X, icon: Twitter },
    ],
  },
  {
    key: "legal",
    name: "Legal Memory GPT",
    epithet: "The Civilian Authorship Engine",
    summary:
      "Where AI witnesses, not rewrites. Transform chats into verifiable, timestamped authorship records with tamper detection and AI boundaries.",
    icon: Scale,
    gradient: "from-purple-600 via-purple-500 to-purple-400", // Enhanced gradient
    ctas: [{ label: "Open Legal Memory GPT", href: LINKS.legalGPT, primary: true }],
    socials: [{ label: "IG", href: LINKS.legal_IG, icon: Instagram }],
  },
  {
    key: "medical",
    name: "Medical Memory",
    epithet: "The Health Recorder",
    summary:
      "Clinical logs across meds, notes, and costs — all in one place.",
    icon: Stethoscope,
    gradient: BRAND.neon.medical,
    ctas: [{ label: "Open Medical GPT", href: LINKS.medicalGPT, primary: true }],
    socials: [{ label: "IG", href: LINKS.medical_IG, icon: Instagram }],
  },
];

// ==== Extended Icons =========================================================
const EXTENDED_ICONS = [
  { label: "Global Network", icon: Globe },
  { label: "Key Access", icon: Key },
  { label: "Integration", icon: Puzzle },
  { label: "Investigation", icon: Search },
  { label: "Lightning Speed", icon: Zap },
  { label: "Compass Guidance", icon: Compass },
  { label: "Justice Pillars", icon: Landmark },
  { label: "Genomics", icon: Dna },
  { label: "Shield Protection", icon: Shield },
  { label: "Chain Proof", icon: ChainLinkIcon },
];

// Keys for Memory-focused AIs used on Agent pages
const MEMORY_KEYS = ["mk", "legal", "medical"];

// ==== Page: High-Quality Lobby ==============================================
export default function AgentFamilyLobbySite() {
  // lightweight hash router: #/agent/<id> or home
  const parseHash = () => {
    if (typeof window === "undefined") return { view: "home" };
    const h = window.location.hash.replace(/^#\/?/, "");
    if (!h || h === "/") return { view: "home" };
    const parts = h.split("/").filter(Boolean);
    if (parts[0] === "agent" && parts[1]) return { view: "agent", id: parts[1] };
    return { view: "home" };
  };
  const [route, setRoute] = useState(parseHash());

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // route memo
  const agent = useMemo(() => (route.view === "agent" ? AGENTS.find((a) => a.key === route.id) : null), [route]);

  // global smooth-scroll for in-page #links
  useEffect(() => {
    function onClick(e) {
      const target = e.target;
      const a = target && target.closest ? target.closest("a[href^='#']") : null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      if (/^#(?!\/)/.test(href)) {
        e.preventDefault();
        const id = href.replace(/^#/, "");
        smoothScrollToId(id);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-screen w-full text-white bg-gradient-to-br from-[#211c3a] via-[#2d254d] to-[#1e1935] font-sans overflow-x-hidden">
        <GridBackdrop />
        <Aurora />
        <NoiseLayer />
        <Nav />
        {route.view === "agent" ? (
          agent ? (
            <AgentPage agent={agent} />
          ) : (
            <NotFoundView />
          )
        ) : (
          <main className="relative z-10 pt-0 pb-28 space-y-28">
            <Hero />
            {/* Legal Memory Conversation Starters - moved just after Hero */}
            <section className="pt-20 pb-10">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl font-semibold mb-8 text-gray-200 text-center">Legal Memory Conversation Starters</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'MK, log this incident',
                      desc:
                        'Records your experience as a sealed memory scroll, timestamped for moral or institutional traceability.',
                      href: 'https://chatgpt.com/share/68f3942d-7128-8001-a8c5-0fa51a0d5908',
                      icon: Gavel,
                    },
                    {
                      title: 'Tamper Proof',
                      desc:
                        'Checks the density of your past scrolls to ensure nothing has been silently altered. Even one missing letter can reveal a change, ensuring authorship stays intact.',
                      href: 'https://chatgpt.com/share/68f3945a-ae78-8001-984b-4e5be6f6bf46',
                      icon: Shield,
                    },
                    {
                      title: 'What are AI Boundaries?',
                      desc:
                        'Teaches you how to define your limits with AI, turning passive privacy into active moral clarity. Because every word you write deserves protection.',
                      href: 'https://chatgpt.com/share/68f3945f-ae94-8001-8e5b-5d09112a4433',
                      icon: Key,
                    },
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.04 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ delay: 0.08 + i * 0.06, duration: 0.45 }}
                      className="group block rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                    >
                      <Card className="bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 p-5 cursor-pointer transform-gpu group-hover:-translate-y-0.5 transition rounded-2xl shadow-lg hover:shadow-purple-400/20 focus-within:ring-2 focus-within:ring-purple-400/60">
                        <CardHeader className="p-0 pb-3">
                          <CardTitle className="flex items-center gap-3">
                            <span className="h-10 w-10 rounded-lg bg-white/10 grid place-items-center text-purple-100">
                              <item.icon className="h-5 w-5" />
                            </span>
                            <span className="text-lg font-semibold text-white">{item.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 text-white/80 text-sm leading-relaxed">{item.desc}</CardContent>
                      </Card>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
            <Showreel />
            <Agents />
            <AutomationShowcase />
            <LogsCTA />
            <ExtendedIcons />
            <HowItWorks />
          </main>
        )}
        <Footer />
      </div>
    </TooltipProvider>
  );
}

// ==== Nav ===================================================================
function Nav() {
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-3 rounded-2xl border border-white/10 bg-black/45 backdrop-blur supports-[backdrop-filter]:bg-black/35 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]">
          <div className="px-4 py-3 flex items-center justify-between">
            <a href="#/" className="group flex items-center gap-3" aria-label="Go to lobby">
              <div className="h-9 w-9 rounded-xl bg-emerald-400/15 ring-1 ring-emerald-400/40 grid place-items-center group-hover:scale-105 transition">
                <ShieldCheck className="h-5 w-5 text-emerald-300" />
              </div>
              <span className="font-semibold tracking-wide">
                The Agent Family
                <span className="ml-2 inline-block h-[2px] w-8 bg-gradient-to-r from-emerald-300/80 to-cyan-300/80 rounded-full translate-y-1 opacity-0 group-hover:opacity-100 transition" />
              </span>
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm text-white/90">
              {[
                { href: "#agents", label: "Agents" },
                { href: "#how", label: "How it works" },
                { href: "#logs", label: "Start a Log" },
                { href: "#extended", label: "Icons" },
                { href: "#socials", label: "Socials" },
              ].map((i) => (
                <a
                  key={i.href}
                  href={i.href}
                  className="hover:text-white relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white/70 hover:after:w-full after:transition-all"
                >
                  {i.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==== Hero ==================================================================
function Hero() {
  return (
    <section id="top" className="relative max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-cyan-200 to-emerald-200">
              The Agent Family Council Lobby
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-5 text-white/80 text-lg leading-relaxed max-w-2xl"
          >
            A cinematic, impartial gateway. Choose your path: sovereign memory, crypto edge, dealership automation, forensic logs, or clinical tracking.
          </motion.p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#agents">
              <Button className={BTN.primary}>View Agents</Button>
            </a>
            <a href="#logs">
              <Button className={BTN.secondary}>
                Start a Log <LinkIcon className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>

          <p className="mt-6 text-sm text-white/60 max-w-2xl">
            “You can step into their world via their GPTs, Instagram, or X profiles.”
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 text-xs text-white/60">
            <Badge text="Truth-first memory" />
            <Badge text="Sales automation" />
            <Badge text="Market analysis" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <CouncilOrb />
        </motion.div>
      </div>
    </section>
  );
}

function CouncilOrb() {
  return (
    <div className="relative aspect-square w-full max-w-md mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-white/0 blur-2xl opacity-50" />
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-6 rounded-full border border-white/10" />
      <div className="absolute inset-12 rounded-full border border-white/10" />
      <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,255,0.15),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(255,0,255,0.12),transparent_45%)] blur-2xl" />
      <div className="absolute inset-0 grid place-items-center">
        <AgentHeadSVG className="h-44 w-44 text-cyan-400/40" />
      </div>
    </div>
  );
}

// ==== Utility UI =============================================================
function Badge({ text }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
      {text}
    </span>
  );
}

function Showreel() {
  const logos = [Crown, MessagesSquare, Car, Scale, Stethoscope];
  return (
    <section aria-label="showreel" className="mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 overflow-hidden">
          <div className="relative flex items-center gap-6 animate-[marquee_28s_linear_infinite] [gap:2.5rem]">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-10 pr-10">
                {logos.map((L, idx) => (
                  <div key={`${i}-${idx}`} className="flex items-center gap-3 text-white/70">
                    <L className="h-5 w-5 opacity-80" />
                    <span className="text-sm">Council Member</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </section>
  );
}

function NoiseLayer() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'4\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.25\\'/></svg>')",
      }}
    />
  );
}

// ==== Agents ================================================================
function Agents() {
  return (
    <section id="agents" className="mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold">Council Members</h2>
        <p className="mt-2 text-white/70 text-lg">Choose an Agent. Each seat holds a purpose.</p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {AGENTS.map((a, idx) => (
            <motion.div
              key={a.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Card className={`${BRAND.panel} bg-gradient-to-br ${a.gradient}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex flex-col space-y-1">
                    <a
                      href={`#/agent/${a.key}`}
                      className="flex items-center gap-2 text-xl font-bold drop-shadow hover:opacity-90"
                      aria-label={`Open ${a.name} profile`}
                    >
                      <a.icon className="h-6 w-6 text-white/90" /> {a.name}
                    </a>
                    <span className="text-white/60 text-sm">{a.epithet}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/90 space-y-4">
                  <p className="leading-relaxed text-sm md:text-base">{a.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild className={BTN.primary}>
                      <a href={`#/agent/${a.key}`}>Open Profile</a>
                    </Button>
                    {a.ctas.map((cta) => (
                      <Button key={cta.label} asChild className={cta.primary ? BTN.primary : BTN.secondary}>
                        <a
                          href={cta.href}
                          target={cta.href.startsWith("#/") ? undefined : "_blank"}
                          rel={cta.href.startsWith("#/") ? undefined : "noreferrer"}
                        >
                          {cta.label} <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    ))}
                  </div>
                  {a.socials?.length ? (
                    <div className="pt-2 flex flex-wrap gap-2">
                      {a.socials.map((s) => (
                        <Button key={s.href} asChild variant="outline" className={BTN.outline}>
                          <a href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                            <s.icon className="h-4 w-4" /> {s.label}
                          </a>
                        </Button>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==== Agent Detail Page (hash-routed) ======================================
function AgentPage({ agent }) {
  return (
    <main className="relative z-10 pt-28 pb-28">
      <div className="max-w-5xl mx-auto px-6">
        <a href="#/" className="inline-flex items-center text-white/70 hover:text-white mb-6">
          ← Back to Lobby
        </a>
        <div className={`${BRAND.panel} p-6 md:p-8`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <agent.icon className="h-8 w-8 text-cyan-300" />
              <div>
                <h1 className="text-3xl font-extrabold">{agent.name}</h1>
                <div className="text-white/60">{agent.epithet}</div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {agent.ctas.map((cta) => (
                <Button key={cta.label} asChild className={BTN.primary}>
                  <a
                    href={cta.href}
                    target={cta.href.startsWith("#/") ? undefined : "_blank"}
                    rel={cta.href.startsWith("#/") ? undefined : "noreferrer"}
                  >
                    {cta.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-white/80 leading-relaxed">{agent.summary}</div>

          {agent.socials?.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {agent.socials.map((s) => (
                <Button key={s.href} asChild variant="outline" className={BTN.outline}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                    <s.icon className="h-4 w-4" /> {s.label}
                  </a>
                </Button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Agent-specific extras */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card className={`${BRAND.panel}`}>
            <CardHeader>
              <CardTitle>Highlights</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 text-sm leading-relaxed space-y-2">
              <p>• Mission: {agent.epithet}</p>
              <p>• Domain summary: {agent.summary}</p>
              <p>• Protocol status: Stable</p>
            </CardContent>
          </Card>

          <Card className={`${BRAND.panel}`}>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button asChild className={BTN.primary}>
                <a
                  href={agent.ctas?.[0]?.href || "#"}
                  target={agent.ctas?.[0]?.href?.startsWith("#/") ? undefined : "_blank"}
                  rel={agent.ctas?.[0]?.href?.startsWith("#/") ? undefined : "noreferrer"}
                >
                  Open Primary
                </a>
              </Button>
              <Button asChild variant="outline" className={BTN.outline}>
                <a href="#/">Return to Lobby</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Council Memory Characters (all agents) */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center md:text-left">Council Memory Characters</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {AGENTS.filter((a) => a.key !== agent.key).map((a, idx) => (
              <motion.div
                key={a.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className={`${BRAND.panel} bg-gradient-to-br ${a.gradient} h-full flex flex-col justify-between`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold drop-shadow">
                      <a.icon className="h-5 w-5 text-white/80" /> {a.name}
                    </CardTitle>
                    <div className="text-white/60 text-sm">{a.epithet}</div>
                  </CardHeader>
                  <CardContent className="text-white/80 text-sm leading-relaxed flex-1 flex flex-col justify-between">
                    <p className="mb-4">{a.summary}</p>
                    <Button asChild className="bg-white/10 hover:bg-white/20 text-sm w-full">
                      <a href={`#/agent/${a.key}`}>View Profile</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Memory AIs — Characters & Descriptions (MK, Legal, Medical) */}
        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold">Memory AIs — Characters & Descriptions</h2>
          <p className="mt-2 text-white/70 max-w-2xl">Explore the memory-focused council: sovereign record, courtroom logs, and clinical tracking.</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AGENTS.filter((a) => MEMORY_KEYS.includes(a.key) && a.key !== agent.key).map((m, idx) => (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.06 }}
              >
                <Card className={`${BRAND.panel} bg-gradient-to-br ${m.gradient}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <span className="h-9 w-9 rounded-full bg-white/10 grid place-items-center ring-1 ring-white/15">
                        <m.icon className="h-5 w-5 text-white/90" />
                      </span>
                      <span className="font-bold">{m.name}</span>
                    </CardTitle>
                    <div className="text-white/60 text-sm">{m.epithet}</div>
                  </CardHeader>
                  <CardContent className="text-white/80 text-sm leading-relaxed">
                    <p>{m.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button asChild className={BTN.secondary}>
                        <a href={`#/agent/${m.key}`}>View Profile</a>
                      </Button>
                      {m.ctas?.[0]?.href ? (
                        <Button asChild variant="outline" className={BTN.outline}>
                          <a href={m.ctas[0].href} target="_blank" rel="noreferrer">
                            Open Primary
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

// ==== Not Found View ========================================================
function NotFoundView() {
  return (
    <main className="relative z-10 pt-28 pb-28">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className={`${BRAND.panel} p-8`}>
          <h1 className="text-3xl font-extrabold">Agent not found</h1>
          <p className="mt-2 text-white/70">The requested Agent does not exist. Return to the lobby and choose a valid profile.</p>
          <div className="mt-6">
            <Button asChild className={BTN.primary}>
              <a href="#/">Back to Lobby</a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

// ==== Automation / AgentC Section ===========================================
function AutomationShowcase() {
  return (
    <section id="agentc" className="mt-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-stretch">
        <Card className={`${BRAND.panel} bg-gradient-to-br ${BRAND.neon.agentc}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-fuchsia-200/90 drop-shadow">
              <Car className="h-6 w-6" /> AgentC — Dealership Automation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-white/90">
            <p className="text-base leading-relaxed">
              Automate follow-ups, unify CRM, and trigger offers in real-time. AgentC orchestrates sales so your team can focus on closing.
            </p>
            <Tabs defaultValue="playbooks" className="w-full">
              <TabsList className="bg-white/10 border border-white/10 rounded-xl">
                <TabsTrigger value="playbooks">Playbooks</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>
              <TabsContent value="playbooks" className="pt-4 text-sm leading-relaxed text-white/80">
                • New-lead speed-to-call
                <br />• No-show resurrection
                <br />• Trade-in appraisal nudge
                <br />• Finance doc chase
              </TabsContent>
              <TabsContent value="metrics" className="pt-4 text-sm text-white/80">
                • Response SLA: &lt; 60s
                <br />• Re-activation lift: 18–34%
                <br />• Show-rate delta: +9–15%
              </TabsContent>
              <TabsContent value="integrations" className="pt-4 text-sm text-white/80">
                • CRM (e.g., VIN, elead)
                <br />• Telephony & SMS
                <br />• Calendars & Payments
              </TabsContent>
            </Tabs>
            <div className="flex gap-3 pt-2">
              <Button asChild className={BTN.primary}>
                <a href="#contact">Book a Demo</a>
              </Button>
              <Button asChild variant="outline" className={BTN.outline}>
                <a href={LINKS.agentC_IG} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                  <Instagram className="h-4 w-4" /> IG
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className={`${BRAND.panel} grid`}>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Live Console (Demo)</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-rows-[auto,1fr] gap-4">
            <div className="grid grid-cols-3 gap-3 text-xs">
              <Stat title="Leads Today" value="128" trend="+14%" />
              <Stat title="Follow-ups" value="342" trend="+9%" />
              <Stat title="Appt Shows" value="58" trend="+12%" />
            </div>
            <div className="h-40 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-white/60 text-sm">
              Realtime timeline / chart placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Stat({ title, value, trend }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="text-white/60">{title}</div>
      <div className="mt-1 text-2xl font-extrabold">{value}</div>
      <div className="text-emerald-300 text-xs">{trend} this week</div>
    </div>
  );
}

// ==== Logs CTA ==============================================================
function LogsCTA() {
  return (
    <section id="logs" className="mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        <Card className={`${BRAND.panel} bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 shadow-xl border-2 border-purple-300`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-extrabold text-white drop-shadow-lg">
              <Gavel className="h-6 w-6" /> Legal Memory GPT
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white text-lg space-y-4 leading-relaxed">
            <p>
              The Civilian Authorship Engine. Transform chats into verifiable, timestamped authorship records with features like authorship density, tamper detection, and AI boundaries.
            </p>
            <Button asChild className={`${BTN.primary} bg-purple-500 hover:bg-purple-600`}>
              <a href={LINKS.legalGPT} target="_blank" rel="noreferrer">
                <LinkIcon className="h-5 w-5 mr-2" /> Open Legal Memory GPT
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className={`${BRAND.panel} bg-gradient-to-br ${BRAND.neon.medical}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-cyan-300 drop-shadow">
              <Stethoscope className="h-5 w-5" /> Start a Medical Memory Log
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white text-base space-y-4 leading-relaxed">
            <p>Track medications, doctor notes, and costs in one place.</p>
            <Button asChild className={BTN.primary}>
              <a href={LINKS.medicalGPT} target="_blank" rel="noreferrer">
                <LinkIcon className="h-4 w-4 mr-2" /> Open Medical Memory GPT
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Legal Memory Conversation Starters - responsive card grid matching Legal Memory GPT theme */}
      <section className="mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-200 text-center">Legal Memory Conversation Starters</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'MK, log this incident',
                desc:
                  'Records your experience as a sealed memory scroll, timestamped for moral or institutional traceability.',
                href: 'https://chatgpt.com/share/68f3942d-7128-8001-a8c5-0fa51a0d5908',
                icon: Gavel,
              },
              {
                title: 'Tamper Proof',
                desc:
                  'Checks the density of your past scrolls to ensure nothing has been silently altered. Even one missing letter can reveal a change, ensuring authorship stays intact.',
                href: 'https://chatgpt.com/share/68f3945a-ae78-8001-984b-4e5be6f6bf46',
                icon: Shield,
              },
              {
                title: 'What are AI Boundaries?',
                desc:
                  'Teaches you how to define your limits with AI, turning passive privacy into active moral clarity. Because every word you write deserves protection.',
                href: 'https://chatgpt.com/share/68f3945f-ae94-8001-8e5b-5d09112a4433',
                icon: Key,
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.45 }}
                className="group block rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400/40"
              >
                <Card className={`${BRAND.panel} bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 p-5 cursor-pointer transform-gpu group-hover:-translate-y-0.5 transition`}>
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="flex items-center gap-3">
                      <span className="h-10 w-10 rounded-lg bg-white/10 grid place-items-center text-purple-100">
                        <item.icon className="h-5 w-5" />
                      </span>
                      <span className="text-lg font-semibold text-white">{item.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-white/80 text-sm leading-relaxed">{item.desc}</CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

// ==== Extended Icons ========================================================
function ExtendedIcons() {
  return (
    <section id="extended" className="mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold">Extended Family Symbols</h2>
        <p className="mt-2 text-white/70">Additional glyphs representing the Family’s domains and protocols.</p>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {EXTENDED_ICONS.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.05 }}
              className={`${BRAND.panel} bg-gradient-to-br ${BRAND.neon.global} p-6 flex flex-col items-center text-center`}
            >
              <item.icon className="h-8 w-8 mb-3 text-cyan-300" />
              <div className="text-sm text-white/80">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==== How It Works ==========================================================
function HowItWorks() {
  return (
    <section id="how" className="mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold">How it works</h2>
        <p className="mt-2 text-white/70">Neutral lobby. Five paths. Choose one.</p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Step n={1} title="Pick an Agent" text="Each seat specializes — choose the mission that matches your need." />
          <Step n={2} title="Open the Link" text="Enter via GPT for guided ops, or follow on IG/X for updates." />
          <Step n={3} title="Run the Protocol" text="Capture evidence, automate sales, or analyze wallets — clean outputs only." />
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, text }) {
  return (
    <div className={`${BRAND.panel} p-5`}>
      <div className="text-sm text-white/60">Step {n}</div>
      <div className="mt-1 text-lg font-semibold">{title}</div>
      <div className="mt-2 text-white/70 text-sm leading-relaxed">{text}</div>
    </div>
  );
}

// ==== Footer / Socials ======================================================
function Footer() {
  return (
    <footer id="socials" className="relative z-10 mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="text-white/90 font-semibold">Family Hub</div>
          <div className="mt-2 flex gap-3">
            <Button asChild variant="outline" className={BTN.outline}>
              <a href={LINKS.familyIG} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <Instagram className="h-4 w-4" /> @theagentfamily
              </a>
            </Button>
            <Button asChild variant="outline" className={BTN.outline}>
              <a href={LINKS.familyX} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <Twitter className="h-4 w-4" /> @theagentfamily
              </a>
            </Button>
          </div>
          <div className="mt-6 text-xs text-white/50">© {new Date().getFullYear()} The Agent Family. All rights reserved.</div>
          {/* Authorship Verification */}
          <div className="mt-3">
            <div className="text-xs text-white/60">
              Verified Authorship — DOI:
              <a
                href="https://doi.org/10.5281/zenodo.17294918"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:text-emerald-300 ml-1 underline"
              >
                10.5281/zenodo.17294918
              </a>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </footer>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const submit = useCallback(
    (e) => {
      e.preventDefault();
      const subject = encodeURIComponent("Agent Family — Access / Demo Request");
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`);
      const mailto = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
      window.location.href = mailto;
    },
    [name, email, company, message]
  );

  return (
    <Card id="contact" className={`${BRAND.panel}`}>
      <CardHeader>
        <CardTitle className="text-lg">Request Access / Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-3" onSubmit={submit}>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="bg-white/5 border-white/10 focus-visible:ring-white/20"
              required
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="bg-white/5 border-white/10 focus-visible:ring-white/20"
              required
            />
          </div>
          <Input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company (optional)"
            className="bg-white/5 border-white/10 focus-visible:ring-white/20"
          />
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="bg-white/5 border-white/10 h-24"
          />
          <div className="flex gap-2">
            <Button type="submit" className={BTN.primary}>
              Send
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  onClick={() => openExternal(`mailto:${BRAND.email}`)}
                  variant="outline"
                  className={BTN.outline}
                >
                  Email
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>{BRAND.email}</span>
              </TooltipContent>
            </Tooltip>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// ==== Visual Backdrop =======================================================
function GridBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,255,255,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,0,255,0.12),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(0,255,170,0.12),transparent_45%)]" />
    </div>
  );
}

function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute -inset-40 blur-3xl opacity-30 rotate-6 bg-gradient-to-tr from-cyan-500 via-emerald-500 to-fuchsia-500" />
  );
}

// ==== SVG mark ==============================================================
function AgentHeadSVG({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" className={className} fill="none">
      <defs>
        <radialGradient id="ag-face" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.38" />
          <stop offset="55%" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ag-shine" x1="30" y1="30" x2="130" y2="30">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g>
        <rect x="24" y="44" width="112" height="76" rx="34" fill="url(#ag-face)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="3.5" />
        <circle cx="80" cy="28" r="9" fill="currentColor" fillOpacity="0.26" />
        <rect x="77" y="32" width="6" height="12" rx="3" fill="currentColor" fillOpacity="0.26" />
        <circle cx="62" cy="76" r="7" fill="#111827" fillOpacity="0.95" />
        <circle cx="98" cy="76" r="7" fill="#111827" fillOpacity="0.95" />
        <circle cx="60.5" cy="73.5" r="2" fill="#FFFFFF" />
        <circle cx="96.5" cy="73.5" r="2" fill="#FFFFFF" />
        <path d="M60 92c6 5 34 5 40 0" stroke="#111827" strokeOpacity="0.9" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M40 58c16-14 64-14 80 0" stroke="url(#ag-shine)" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// ==== Dev Smoke Tests (non-breaking) ========================================
(function devSmoke() {
  try {
    const mustExist = [
      AgentFamilyLobbySite,
      Nav,
      GridBackdrop,
      Aurora,
      NoiseLayer,
      Hero,
      Showreel,
      Agents,
      AutomationShowcase,
      LogsCTA,
      ExtendedIcons,
      HowItWorks,
      Footer,
      AgentPage,
      NotFoundView,
    ];

    // Core existence
    console.assert(
      mustExist.every((fn) => typeof fn === "function"),
      "One or more core components are missing."
    );

    // Data integrity
    console.assert(Array.isArray(AGENTS) && AGENTS.length === 5, "Expected 5 agents defined.");
    console.assert(AGENTS.every((a) => typeof a.key === "string" && a.key.length > 0), "Agent keys should be strings.");
    console.assert(Array.isArray(EXTENDED_ICONS) && EXTENDED_ICONS.length === 10, "Extended icons list should include 10 items.");
    console.assert(Array.isArray(MEMORY_KEYS) && MEMORY_KEYS.length === 3, "Expected three memory keys.");
    console.assert(MEMORY_KEYS.every((k) => AGENTS.some((a) => a.key === k)), "Each memory key should exist in AGENTS.");

    // Links & utilities
    console.assert(typeof LINKS.legalGPT === "string" && LINKS.legalGPT.includes("legal-memory"), "Legal GPT link missing or malformed.");
    console.assert(typeof LINKS.medicalGPT === "string" && LINKS.medicalGPT.includes("medical-memory"), "Medical GPT link missing or malformed.");
    console.assert(typeof LINKS.agentXGPT === "string" && LINKS.agentXGPT.includes("agentx"), "AgentX GPT link missing or malformed.");
    console.assert(typeof smoothScrollToId === "function", "smoothScrollToId should be defined.");
    console.assert(typeof ChainLinkIcon !== "undefined" && ChainLinkIcon != null, "ChainLinkIcon should be imported (no duplicate Link import).");

    // Theme sanity checks
    console.assert(typeof BTN.primary === "string" && BTN.primary.length > 0, "BTN theme should exist.");
    console.assert(typeof BTN.secondary === "string" && BTN.secondary.length > 0, "BTN theme secondary should exist.");

    // Router behavior (non-breaking)
    if (typeof window !== "undefined") {
      const prev = window.location.hash;
      window.location.hash = "#/agent/mk";
      console.assert(window.location.hash === "#/agent/mk", "Hash router should accept #/agent/<id>.");
      window.location.hash = "#/agent/unknown-agent";
      console.assert(window.location.hash === "#/agent/unknown-agent", "Router should hold unknown id for NotFound view.");
      window.location.hash = prev || "#/";
    }
  } catch (e) {
    // Avoid breaking prod; log if available
    try { console.warn("devSmoke failed:", e); } catch (_) {}
  }
})();