import { useEffect, useRef } from "react";

// ──────────────────────────────────────────────
// SVG Icon helpers
// ──────────────────────────────────────────────
function NetworkGridBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2979ff" strokeWidth="0.5" />
        </pattern>
        <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="#00c8ff" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

function RouterIcon({ size = 48, color = "#2979ff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="16" width="40" height="16" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
      <circle cx="38" cy="24" r="3" fill={color} />
      <circle cx="30" cy="24" r="3" fill={color} fillOpacity="0.6" />
      <line x1="24" y1="16" x2="24" y2="8" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="18" y1="16" x2="12" y2="8" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="30" y1="16" x2="36" y2="8" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="16" y1="32" x2="16" y2="40" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="24" y1="32" x2="24" y2="40" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="32" y1="32" x2="32" y2="40" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <rect x="8" y="21" width="10" height="6" rx="1" fill={color} fillOpacity="0.3" />
    </svg>
  );
}

function SwitchIcon({ size = 48, color = "#00c8ff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="18" width="40" height="12" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
      {[10, 16, 22, 28, 34, 40].map((x, i) => (
        <line key={i} x1={x} y1="18" x2={x} y2="10" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      ))}
      {[10, 16, 22, 28, 34, 40].map((x, i) => (
        <line key={i} x1={x} y1="30" x2={x} y2="38" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      ))}
      {[10, 16, 22, 28].map((x, i) => (
        <rect key={i} x={x - 3} y="21" width="6" height="6" rx="1" fill={color} fillOpacity={i % 2 === 0 ? "0.8" : "0.3"} />
      ))}
      <circle cx="38" cy="24" r="3" fill={color} />
    </svg>
  );
}

function ComputerIcon({ size = 36, color = "#2979ff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="3" y="4" width="24" height="18" rx="2" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
      <rect x="6" y="7" width="18" height="12" rx="1" fill={color} fillOpacity="0.3" />
      <rect x="10" y="22" width="10" height="3" fill={color} fillOpacity="0.5" />
      <rect x="7" y="25" width="16" height="2" rx="1" fill={color} fillOpacity="0.4" />
    </svg>
  );
}

function ServerIcon({ size = 36, color = "#2979ff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="4" y="5" width="28" height="7" rx="2" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
      <rect x="4" y="15" width="28" height="7" rx="2" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
      <rect x="4" y="25" width="28" height="7" rx="2" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
      <circle cx="27" cy="8.5" r="2" fill={color} />
      <circle cx="27" cy="18.5" r="2" fill="#22c55e" />
      <circle cx="27" cy="28.5" r="2" fill={color} fillOpacity="0.4" />
    </svg>
  );
}

function WifiIcon({ size = 36, color = "#2979ff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path d="M18 28 L18 28" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M13 23 Q18 18 23 23" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M9 19 Q18 10 27 19" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M5 15 Q18 2 31 15" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="18" cy="28" r="2" fill={color} />
    </svg>
  );
}

function BookIcon({ size = 36, color = "#2979ff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="5" y="4" width="26" height="28" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
      <line x1="12" y1="11" x2="24" y2="11" stroke={color} strokeWidth="1.5" />
      <line x1="12" y1="16" x2="24" y2="16" stroke={color} strokeWidth="1.5" />
      <line x1="12" y1="21" x2="20" y2="21" stroke={color} strokeWidth="1.5" />
      <rect x="5" y="4" width="4" height="28" rx="1" fill={color} fillOpacity="0.4" />
    </svg>
  );
}

function BuildingIcon({ size = 36, color = "#2979ff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="5" y="8" width="26" height="24" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
      <rect x="9" y="14" width="5" height="5" rx="1" fill={color} fillOpacity="0.5" />
      <rect x="16" y="14" width="5" height="5" rx="1" fill={color} fillOpacity="0.5" />
      <rect x="23" y="14" width="5" height="5" rx="1" fill={color} fillOpacity="0.5" />
      <rect x="9" y="22" width="5" height="5" rx="1" fill={color} fillOpacity="0.5" />
      <rect x="16" y="22" width="5" height="5" rx="1" fill={color} fillOpacity="0.5" />
      <rect x="23" y="22" width="5" height="5" rx="1" fill={color} fillOpacity="0.5" />
      <line x1="5" y1="8" x2="18" y2="3" stroke={color} strokeWidth="1.5" />
      <line x1="31" y1="8" x2="18" y2="3" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function CloudIcon({ size = 36, color = "#00c8ff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path d="M28 22 C32 22 32 16 28 16 C28 10 20 8 16 13 C14 10 8 11 8 16 C5 16 5 22 8 22 Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
      <circle cx="28" cy="18" r="1.5" fill={color} />
      <circle cx="8" cy="18" r="1.5" fill={color} />
    </svg>
  );
}

function TeacherIcon({ size = 36, color = "#2979ff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="10" r="6" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.5" />
      <path d="M6 32 C6 24 12 20 18 20 C24 20 30 24 30 32" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
      <line x1="4" y1="18" x2="10" y2="18" stroke={color} strokeWidth="1.5" />
      <rect x="2" y="16" width="10" height="10" rx="1" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1" />
      <line x1="5" y1="20" x2="9" y2="20" stroke={color} strokeWidth="1" />
      <line x1="5" y1="22" x2="9" y2="22" stroke={color} strokeWidth="1" />
    </svg>
  );
}

// ──────────────────────────────────────────────
// Section 1: Title
// ──────────────────────────────────────────────
function TitleSection() {
  const teamMembers = [
    { name: "Md Abdur Rahman", id: "2233091141", role: "Team Leader" },
    { name: "Md. Nayem Uddin", id: "2233091004", role: "" },
    { name: "Md Anwar Hossain", id: "2233091123", role: "" },
    { name: "Md Habibur Rahman", id: "2233091142", role: "" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20">
      <NetworkGridBg />

      {/* Animated circuit lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#2979ff" strokeWidth="0.5" strokeDasharray="8 12" />
        <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#00c8ff" strokeWidth="0.5" strokeDasharray="8 12" />
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#2979ff" strokeWidth="0.5" strokeDasharray="8 12" />
        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#00c8ff" strokeWidth="0.5" strokeDasharray="8 12" />
        <circle cx="20%" cy="30%" r="4" fill="#2979ff" fillOpacity="0.6" />
        <circle cx="80%" cy="30%" r="4" fill="#00c8ff" fillOpacity="0.6" />
        <circle cx="20%" cy="70%" r="4" fill="#00c8ff" fillOpacity="0.6" />
        <circle cx="80%" cy="70%" r="4" fill="#2979ff" fillOpacity="0.6" />
        <circle cx="50%" cy="30%" r="6" fill="#2979ff" fillOpacity="0.4" />
        <circle cx="50%" cy="70%" r="6" fill="#00c8ff" fillOpacity="0.4" />
        <path d="M 20% 30% L 50% 30% L 80% 70% L 50% 70% L 20% 30%"
          fill="none" stroke="#2979ff" strokeWidth="0.5" strokeOpacity="0.4" />
      </svg>

      {/* Section number badge */}
      <div className="relative z-10 mb-6 flex items-center gap-3">
        <span className="text-xs font-mono tracking-[0.3em] text-accent uppercase px-3 py-1 border border-accent/30 rounded-sm">
          Section 01
        </span>
      </div>

      {/* Main title */}
      <div className="relative z-10 text-center max-w-4xl mb-10">
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
          style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "-0.01em" }}>
          <span className="text-foreground">Switching</span>
          <span className="text-muted-foreground"> &amp; </span>
          <span className="text-foreground">Routing</span>
        </h1>
        <p className="text-accent text-xl md:text-2xl font-medium mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          in Computer Networks
        </p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-4" />
      </div>

      {/* Presented by label */}
      <p className="relative z-10 text-muted-foreground text-lg tracking-[0.25em] uppercase font-mono mb-6">
        Presented by
      </p>

      {/* Team members card */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-card/60 backdrop-blur border border-primary/20 rounded-xl overflow-hidden">
          <div className="h-0.5 w-full bg-gradient-to-r from-primary via-accent to-primary" />
          <div className="divide-y divide-border/50">
            {teamMembers.map((m, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-3.5 hover:bg-primary/5 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-mono text-accent">
                    {i + 1}
                  </span>
                  <span className="text-foreground font-medium" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.5rem" }}>
                    {m.name}
                  </span>
                  {m.role && (
                    <span className="text-sm px-2 py-0.5 bg-accent/15 text-accent rounded-sm border border-accent/20 font-mono">
                      {m.role}
                    </span>
                  )}
                </div>
                <span className="font-mono text-lg text-muted-foreground">{m.id}</span>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-secondary/50 flex items-center gap-3">
            <BuildingIcon size={24} color="#2979ff" />
            <div>
              <p className="text-foreground font-semibold text-lg" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Department of CSE
              </p>
              <p className="text-muted-foreground text-sm">Uttara University</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="relative z-10 mt-12 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-muted-foreground text-xs tracking-widest uppercase font-mono">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="#2979ff" strokeWidth="1.5" />
          <circle cx="8" cy="6" r="2" fill="#2979ff" />
        </svg>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Section 2: Problem
// ──────────────────────────────────────────────
function ProblemSection() {
  const departments = [
    { label: "Computer Lab", icon: <ComputerIcon size={28} color="#ff4444" />, x: 50, y: 20 },
    { label: "Library", icon: <BookIcon size={28} color="#ff6600" />, x: 15, y: 45 },
    { label: "Admin Office", icon: <BuildingIcon size={28} color="#ff4444" />, x: 85, y: 45 },
    { label: "Teachers Room", icon: <TeacherIcon size={28} color="#ff6600" />, x: 25, y: 78 },
    { label: "Student Wi-Fi", icon: <WifiIcon size={28} color="#ff4444" />, x: 75, y: 78 },
  ];

  const problems = [
    { icon: "❌", text: "Network Slow", desc: "Bandwidth saturated" },
    { icon: "❌", text: "High Traffic", desc: "Congestion at peak hours" },
    { icon: "❌", text: "Security Risk", desc: "No traffic isolation" },
    { icon: "❌", text: "Communication Delay", desc: "Packet loss & latency" },
  ];

  const lineColor = "#ff440055";

  // Tangled connections between nodes
  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 2], [1, 3], [1, 4],
    [2, 3], [2, 4],
    [3, 4],
  ];

  return (
    <section className="relative overflow-hidden px-6 py-20">
      <NetworkGridBg />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-[0.3em] text-orange-400 uppercase px-3 py-1 border border-orange-400/30 rounded-sm">
            Section 02
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            The Network Problem
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Unmanaged university campus connectivity
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4" />
        </div>

        {/* Topology diagram */}
        <div className="relative bg-card/40 border border-red-500/20 rounded-2xl overflow-hidden mb-10">
          <div className="h-0.5 w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500 opacity-60" />
          <div className="p-4">
            <p className="text-center text-lg font-mono text-white tracking-widest uppercase mb-4">
              ⚠ Chaotic Mesh Topology — No Structure
            </p>
            <div className="relative w-full" style={{ paddingBottom: "70%" }}>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {connections.map(([a, b], i) => {
                  const ax = departments[a].x;
                  const ay = departments[a].y;
                  const bx = departments[b].x;
                  const by = departments[b].y;
                  const mx = (ax + bx) / 2 + (Math.random() * 20 - 10);
                  const my = (ay + by) / 2 + (Math.random() * 20 - 10);
                  return (
                    <path
                      key={i}
                      d={`M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}`}
                      stroke={i % 3 === 0 ? "#ff4444" : i % 3 === 1 ? "#ff6600" : "#ffaa00"}
                      strokeWidth="0.4"
                      fill="none"
                      opacity="0.7"
                    />
                  );
                })}
              </svg>
              {departments.map((dept, i) => (
                <div
                  key={i}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${dept.x}%`, top: `${dept.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <div className="bg-card border-2 border-red-500/50 rounded-xl p-2 shadow-lg shadow-red-900/30">
                    {dept.icon}
                  </div>
                  <span className="mt-1 text-center text-lg text-white font-mono leading-tight"
                    >
                    {dept.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Problems grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {problems.map((p, i) => (
            <div key={i}
              className="bg-card/60 border border-red-500/30 rounded-xl p-4 text-center hover:border-red-500/60 transition-colors">
              <div className="text-2xl mb-2">{p.icon}</div>
              <p className="text-red-300 font-bold text-sm mb-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                {p.text}
              </p>
              <p className="text-muted-foreground text-xs">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Section 3: Solution
// ──────────────────────────────────────────────
function SolutionSection() {
  const switchFeatures = [
    { label: "Layer 2 – Data Link Layer", mono: "OSI Layer 2" },
    { label: "Uses MAC Address", mono: "48-bit HW addr" },
    { label: "Fast Local Communication", mono: "< 1ms latency" },
    { label: "Efficient LAN Performance", mono: "Wire-speed fwd" },
  ];
  const routerFeatures = [
    { label: "Layer 3 – Network Layer", mono: "OSI Layer 3" },
    { label: "Uses IP Address", mono: "IPv4 / IPv6" },
    { label: "Connects Different Networks", mono: "Inter-network" },
    { label: "Internet Communication", mono: "WAN / BGP" },
  ];

  return (
    <section className="relative overflow-hidden px-6 py-20">
      <NetworkGridBg />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono tracking-[0.3em] text-accent uppercase px-3 py-1 border border-accent/30 rounded-sm">
            Section 03
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            The Solution
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Switching &amp; Routing — two pillars of modern networking
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Switch Card */}
          <div className="relative bg-card border border-accent/30 rounded-2xl overflow-hidden group hover:border-accent/60 transition-all">
            <div className="h-1 w-full bg-gradient-to-r from-accent to-primary" />
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                  <SwitchIcon size={48} color="#00c8ff" />
                </div>
                <div>
                  <p className="text-xs font-mono text-accent tracking-widest uppercase mb-0.5">Layer 2 Device</p>
                  <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    🔀 Switching
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {switchFeatures.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-accent/10">
                    <span className="text-foreground text-sm font-medium">{f.label}</span>
                    <span className="font-mono text-xs text-accent/70 hidden sm:block">{f.mono}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                <p className="text-xs text-muted-foreground font-mono">
                  Switches forward frames based on MAC address tables (CAM tables), enabling full-duplex communication within a LAN segment.
                </p>
              </div>
            </div>
          </div>

          {/* Router Card */}
          <div className="relative bg-card border border-primary/30 rounded-2xl overflow-hidden group hover:border-primary/60 transition-all">
            <div className="h-1 w-full bg-gradient-to-r from-primary to-accent" />
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                  <RouterIcon size={48} color="#2979ff" />
                </div>
                <div>
                  <p className="text-xs font-mono text-primary tracking-widest uppercase mb-0.5">Layer 3 Device</p>
                  <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    🌐 Routing
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {routerFeatures.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-primary/10">
                    <span className="text-foreground text-sm font-medium">{f.label}</span>
                    <span className="font-mono text-xs text-primary/70 hidden sm:block">{f.mono}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-xs text-muted-foreground font-mono">
                  Routers determine the best path for packets across networks using routing tables and protocols like OSPF, RIP, and BGP.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* OSI Layer comparison strip */}
        <div className="mt-10 bg-card/40 border border-border rounded-xl p-6 overflow-x-auto">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4 text-center">
            OSI Model — Device Placement
          </p>
          <div className="flex gap-2 min-w-max mx-auto justify-center">
            {["7 Application", "6 Presentation", "5 Session", "4 Transport", "3 Network", "2 Data Link", "1 Physical"].map((layer, i) => {
              const isRouter = layer.startsWith("3");
              const isSwitch = layer.startsWith("2");
              return (
                <div
                  key={i}
                  className={`px-3 py-2 rounded text-xs font-mono text-center min-w-[90px] border transition-all
                    ${isRouter ? "bg-primary/20 border-primary/60 text-primary" :
                      isSwitch ? "bg-accent/20 border-accent/60 text-accent" :
                        "bg-secondary/30 border-border text-muted-foreground"}`}
                >
                  <p className="font-bold">{layer.split(" ")[0]}</p>
                  <p className="mt-0.5 leading-tight">{layer.split(" ").slice(1).join(" ")}</p>
                  {isRouter && <p className="mt-1 text-primary font-bold">Router</p>}
                  {isSwitch && <p className="mt-1 text-accent font-bold">Switch</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Section 4: Improved Network Design
// ──────────────────────────────────────────────
function NetworkDesignSection() {
  const benefits = [
    { icon: "✓", text: "Fast Communication", color: "text-green-400" },
    { icon: "✓", text: "Secure Network", color: "text-green-400" },
    { icon: "✓", text: "Better Performance", color: "text-green-400" },
    { icon: "✓", text: "Reliable Connectivity", color: "text-green-400" },
    { icon: "✓", text: "Internet Access", color: "text-green-400" },
  ];

  const endpoints = [
    { label: "Computer Lab", icon: <ComputerIcon size={26} color="#2979ff" /> },
    { label: "Library", icon: <BookIcon size={26} color="#2979ff" /> },
    { label: "Admin Office", icon: <BuildingIcon size={26} color="#2979ff" /> },
    { label: "Teachers Room", icon: <TeacherIcon size={26} color="#2979ff" /> },
    { label: "Student Wi-Fi", icon: <WifiIcon size={26} color="#2979ff" /> },
  ];

  return (
    <section className="relative overflow-hidden px-6 py-20">
      <NetworkGridBg />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono tracking-[0.3em] text-green-400 uppercase px-3 py-1 border border-green-400/30 rounded-sm">
            Section 04
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Improved Network Design
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Hierarchical topology for Uttara University
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-accent mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* Network Diagram */}
          <div className="lg:col-span-3 bg-card/40 border border-primary/20 rounded-2xl overflow-hidden">
            <div className="h-0.5 w-full bg-gradient-to-r from-green-500 via-primary to-accent" />
            <div className="p-6">
              <p className="text-center text-xs font-mono text-green-400 tracking-widest uppercase mb-6">
                ✓ Hierarchical Star Topology
              </p>

              {/* Endpoints row */}
              <div className="flex justify-around mb-2">
                {endpoints.map((ep, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="bg-card border border-primary/40 rounded-xl p-2 shadow-lg shadow-primary/10">
                      {ep.icon}
                    </div>
                    <span className="text-center text-muted-foreground font-mono leading-tight text-center"
                      style={{ fontSize: "0.5rem", maxWidth: "52px" }}>
                      {ep.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Lines to switch */}
              <div className="flex justify-center mb-1">
                <svg width="90%" height="32" viewBox="0 0 500 32" preserveAspectRatio="none">
                  {[50, 150, 250, 350, 450].map((x, i) => (
                    <g key={i}>
                      <line x1={x} y1="0" x2="250" y2="32" stroke="#2979ff" strokeWidth="1.5" strokeDasharray={i === 2 ? "none" : "none"} />
                      <circle cx={x} cy="0" r="3" fill="#2979ff" fillOpacity="0.8" />
                    </g>
                  ))}
                  <circle cx="250" cy="32" r="5" fill="#00c8ff" />
                </svg>
              </div>

              {/* Switch */}
              <div className="flex justify-center mb-1">
                <div className="bg-secondary border border-accent/50 rounded-xl px-6 py-3 flex items-center gap-3 shadow-lg shadow-accent/10">
                  <SwitchIcon size={32} color="#00c8ff" />
                  <div>
                    <p className="text-accent font-bold text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>SWITCH</p>
                    <p className="text-muted-foreground font-mono" style={{ fontSize: "0.6rem" }}>Layer 2 — MAC Forwarding</p>
                  </div>
                </div>
              </div>

              {/* Line to router */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-0">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-accent to-primary" />
                  <svg width="12" height="8"><polygon points="6,8 0,0 12,0" fill="#2979ff" /></svg>
                </div>
              </div>

              {/* Router */}
              <div className="flex justify-center mb-1">
                <div className="bg-secondary border border-primary/50 rounded-xl px-6 py-3 flex items-center gap-3 shadow-lg shadow-primary/10">
                  <RouterIcon size={32} color="#2979ff" />
                  <div>
                    <p className="text-primary font-bold text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>ROUTER</p>
                    <p className="text-muted-foreground font-mono" style={{ fontSize: "0.6rem" }}>Layer 3 — IP Routing</p>
                  </div>
                </div>
              </div>

              {/* Line to internet */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-0">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-primary to-accent" />
                  <svg width="12" height="8"><polygon points="6,8 0,0 12,0" fill="#00c8ff" /></svg>
                </div>
              </div>

              {/* Internet */}
              <div className="flex justify-center">
                <div className="bg-secondary border border-accent/40 rounded-xl px-8 py-3 flex items-center gap-3">
                  <CloudIcon size={32} color="#00c8ff" />
                  <div>
                    <p className="text-accent font-bold text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>INTERNET</p>
                    <p className="text-muted-foreground font-mono" style={{ fontSize: "0.6rem" }}>WAN / ISP Gateway</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits panel */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-card/40 border border-green-500/20 rounded-2xl overflow-hidden">
              <div className="h-0.5 w-full bg-gradient-to-r from-green-500 to-primary" />
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  <span className="text-green-400">◆</span> Benefits
                </h3>
                <div className="space-y-3">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg border border-green-500/10 hover:border-green-500/30 transition-colors">
                      <span className="text-green-400 font-bold text-lg w-5 flex-shrink-0">{b.icon}</span>
                      <span className="text-foreground text-sm font-medium">{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-card/40 border border-primary/20 rounded-2xl p-5">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Network Metrics</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Latency", val: "< 2ms", color: "text-green-400" },
                  { label: "Uptime", val: "99.9%", color: "text-accent" },
                  { label: "Security", val: "VLAN", color: "text-primary" },
                  { label: "Bandwidth", val: "1 Gbps", color: "text-green-400" },
                ].map((stat, i) => (
                  <div key={i} className="bg-secondary/50 rounded-lg p-3 text-center border border-border">
                    <p className={`text-lg font-bold ${stat.color}`} style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      {stat.val}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Section 5: Conclusion
// ──────────────────────────────────────────────
function ConclusionSection() {
  const points = [
    { icon: "⚡", label: "Fast", desc: "Sub-millisecond switching" },
    { icon: "🔒", label: "Secure", desc: "VLAN-based isolation" },
    { icon: "📈", label: "Scalable", desc: "Hierarchical expansion" },
    { icon: "🛡", label: "Reliable", desc: "99.9% uptime SLA" },
  ];

  return (
    <section className="relative overflow-hidden px-6 py-20">
      <NetworkGridBg />

      {/* Large decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <p className="text-[12rem] font-black text-primary/5 select-none whitespace-nowrap"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          NETWORK
        </p>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="text-xs font-mono tracking-[0.3em] text-accent uppercase px-3 py-1 border border-accent/30 rounded-sm">
            Section 05
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Conclusion
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-4" />
        </div>

        {/* Formula */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-14">
          <div className="bg-card border border-accent/40 rounded-2xl px-8 py-5 text-center">
            <SwitchIcon size={40} color="#00c8ff" />
            <p className="mt-2 text-lg font-bold text-accent" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Switching</p>
          </div>
          <div className="text-4xl text-muted-foreground font-light">+</div>
          <div className="bg-card border border-primary/40 rounded-2xl px-8 py-5 text-center">
            <RouterIcon size={40} color="#2979ff" />
            <p className="mt-2 text-lg font-bold text-primary" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Routing</p>
          </div>
          <div className="text-4xl text-muted-foreground font-light">=</div>
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/40 rounded-2xl px-8 py-5 text-center">
            <div className="flex gap-2 justify-center mb-2">
              <SwitchIcon size={24} color="#00c8ff" />
              <RouterIcon size={24} color="#2979ff" />
            </div>
            <p className="text-lg font-bold text-foreground" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Modern Network
            </p>
          </div>
        </div>

        {/* Four pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {points.map((p, i) => (
            <div key={i}
              className="bg-card/60 border border-primary/20 rounded-2xl p-5 text-center hover:border-primary/50 transition-all hover:bg-card/80 group">
              <div className="text-3xl mb-3">{p.icon}</div>
              <p className="text-xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                ✔ {p.label}
              </p>
              <p className="text-xs text-muted-foreground font-mono">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Summary banner */}
        <div className="bg-card/60 border border-primary/20 rounded-2xl p-6 text-center">
          <p className="text-muted-foreground text-sm font-mono leading-relaxed max-w-3xl mx-auto">
            By implementing a hierarchical switching and routing architecture, Uttara University
            can achieve enterprise-grade network performance, security through VLAN segmentation,
            and seamless internet connectivity — transforming chaotic mesh connectivity into a
            structured, manageable, and scalable infrastructure.
          </p>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Section 6: Thank You
// ──────────────────────────────────────────────
function ThankYouSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20">
      <NetworkGridBg />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        <span className="text-xs font-mono tracking-[0.3em] text-accent uppercase px-3 py-1 border border-accent/30 rounded-sm">
          Section 06
        </span>

        <div className="mt-10 mb-6">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-4">
              <SwitchIcon size={40} color="#00c8ff" />
              <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-primary" />
              <RouterIcon size={40} color="#2979ff" />
            </div>
          </div>

          <h2 className="text-7xl md:text-8xl font-black text-foreground mb-2"
            style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "-0.02em" }}>
            Thank You
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full mb-8" />
          <p className="text-2xl text-accent font-medium" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Any Questions?
          </p>
        </div>

        {/* Decorative network nodes */}
        <div className="flex justify-center gap-3 mt-10 mb-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`w-3 h-3 rounded-full border ${i === 2 ? "bg-primary border-primary" : "bg-primary/20 border-primary/40"}`} />
              {i < 4 && <div className="w-8 h-0.5 bg-primary/30 mt-[-6px] ml-3 -rotate-0 translate-y-0 absolute" style={{ width: "2rem" }} />}
            </div>
          ))}
        </div>

        {/* Team & university footer */}
        <div className="mt-10 bg-card/40 border border-primary/20 rounded-2xl p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <BuildingIcon size={24} color="#2979ff" />
            <div className="text-left">
              <p className="text-foreground text-lg font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Department of CSE — Uttara University
              </p>
              <p className="text-muted-foreground text-sm font-mono">Computer Networks | Switching &amp; Routing</p>
            </div>
          </div>
          <div className="h-px bg-border my-3" />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {["Md Abdur Rahman", "Md. Nayem Uddin", "Md Anwar Hossain", "Md Habibur Rahman"].map((name, i) => (
              <span key={i} className="text-muted-foreground text-lg font-mono">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Section separator
// ──────────────────────────────────────────────
function SectionDivider({ num }: { num: number }) {
  return (
    <div className="flex items-center gap-4 px-6 py-2 max-w-5xl mx-auto">
      <div className="flex-1 h-px bg-primary/15" />
      <span className="font-mono text-xs text-muted-foreground/50">◆</span>
      <div className="flex-1 h-px bg-primary/15" />
    </div>
  );
}

// ──────────────────────────────────────────────
// App
// ──────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <TitleSection />
      <SectionDivider num={1} />
      <ProblemSection />
      <SectionDivider num={2} />
      <SolutionSection />
      <SectionDivider num={3} />
      <NetworkDesignSection />
      <SectionDivider num={4} />
      <ConclusionSection />
      <SectionDivider num={5} />
      <ThankYouSection />
    </div>
  );
}
