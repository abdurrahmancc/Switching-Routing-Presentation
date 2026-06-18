import { useEffect, useRef, useState } from "react";

// ── Glow line ──────────────────────────────────────────────────────────────
function GlowLine({ x1, y1, x2, y2, color = "#00b4d8" }: {
  x1: number; y1: number; x2: number; y2: number; color?: string;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  // arrowhead
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const al = 9, aw = 5;
  const ax1 = x2 - al * Math.cos(angle - 0.4);
  const ay1 = y2 - al * Math.sin(angle - 0.4);
  const ax2 = x2 - al * Math.cos(angle + 0.4);
  const ay2 = y2 - al * Math.sin(angle + 0.4);
  void mx; void my;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" opacity="0.18" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.4" opacity="0.85" strokeDasharray="6 4" />
      <polygon points={`${x2},${y2} ${ax1},${ay1} ${ax2},${ay2}`} fill={color} opacity="0.9" />
    </g>
  );
}

// ── SVG Device Primitives ──────────────────────────────────────────────────
function PC({ x, y, s = 34 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x - s / 2},${y - s / 2})`}>
      <rect x="2" y="2" width={s - 4} height={s * 0.6} rx="3" fill="#0d2040" stroke="#00b4d8" strokeWidth="1.5" />
      <rect x="6" y="6" width={s - 16} height={s * 0.44} rx="1" fill="#0a2550" />
      <line x1="10" y1={s * 0.32} x2={s - 10} y2={s * 0.32} stroke="#00e5ff" strokeWidth="0.7" opacity="0.5" />
      <line x1="10" y1={s * 0.4} x2={s - 14} y2={s * 0.4} stroke="#00e5ff" strokeWidth="0.7" opacity="0.3" />
      <line x1={s / 2} y1={s * 0.62} x2={s / 2} y2={s * 0.76} stroke="#00b4d8" strokeWidth="1.5" />
      <rect x={s * 0.22} y={s * 0.76} width={s * 0.56} height={s * 0.08} rx="2" fill="#00b4d8" opacity="0.7" />
    </g>
  );
}

function Switch({ x, y, s = 52 }: { x: number; y: number; s?: number }) {
  const h = s * 0.42;
  return (
    <g transform={`translate(${x - s / 2},${y - h / 2})`}>
      <rect x="0" y="0" width={s} height={h} rx="5" fill="#062040" stroke="#00e5ff" strokeWidth="2"
        style={{ filter: "drop-shadow(0 0 7px #00e5ff88)" }} />
      {[0.18, 0.34, 0.5, 0.66, 0.82].map((p, i) => (
        <g key={i}>
          <rect x={s * p - 3} y={h * 0.22} width="6" height={h * 0.55} rx="2"
            fill={i % 2 === 0 ? "#00e5ff" : "#00b4d8"} opacity="0.9" />
          <circle cx={s * p} cy={h * 0.13} r="2" fill={i < 3 ? "#00ff88" : "#00e5ff"} opacity="0.9" />
        </g>
      ))}
    </g>
  );
}

function Router({ x, y, s = 42 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x - s / 2},${y - s / 2})`}>
      <circle cx={s / 2} cy={s / 2} r={s / 2 - 2} fill="#0a1a3a" stroke="#00b4d8" strokeWidth="2"
        style={{ filter: "drop-shadow(0 0 8px #00b4d888)" }} />
      <ellipse cx={s / 2} cy={s / 2} rx={s * 0.27} ry={s / 2 - 4} fill="none" stroke="#00b4d8" strokeWidth="1" opacity="0.45" />
      <line x1="4" y1={s / 2} x2={s - 4} y2={s / 2} stroke="#00b4d8" strokeWidth="1" opacity="0.45" />
      <line x1={s / 2} y1="4" x2={s / 2} y2={s - 4} stroke="#00b4d8" strokeWidth="1" opacity="0.3" />
      {[0.18, 0.5, 0.82].map((p, i) => (
        <circle key={i} cx={s * p} cy={s * 0.82} r="2.5" fill={i === 1 ? "#00ff88" : "#00b4d8"} opacity="0.9" />
      ))}
    </g>
  );
}

function Printer({ x, y, s = 34 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x - s / 2},${y - s / 2})`}>
      <rect x="3" y="10" width={s - 6} height={s * 0.5} rx="3" fill="#0d2040" stroke="#00b4d8" strokeWidth="1.5" />
      <rect x="7" y="2" width={s - 14} height="10" rx="2" fill="#0a2550" stroke="#00b4d8" strokeWidth="1" />
      <rect x="7" y={s * 0.58} width={s - 14} height={s * 0.32} rx="2" fill="#0a2550" stroke="#00b4d8" strokeWidth="1" />
      <line x1="11" y1={s * 0.66} x2={s - 11} y2={s * 0.66} stroke="#00e5ff" strokeWidth="0.9" opacity="0.6" />
      <line x1="11" y1={s * 0.74} x2={s - 14} y2={s * 0.74} stroke="#00e5ff" strokeWidth="0.7" opacity="0.4" />
      <circle cx={s - 10} cy={s * 0.37} r="3" fill="#00ff88" opacity="0.9" />
    </g>
  );
}

// ── Animated Packet ────────────────────────────────────────────────────────
function PacketDot({ progress, path }: { progress: number; path: [number, number][] }) {
  if (path.length < 2 || progress <= 0) return null;
  const total = path.length - 1;
  const seg = Math.min(Math.floor(progress * total), total - 1);
  const t = progress * total - seg;
  const [x1, y1] = path[seg];
  const [x2, y2] = path[seg + 1];
  const x = x1 + (x2 - x1) * t;
  const y = y1 + (y2 - y1) * t;
  return (
    <g>
      <circle cx={x} cy={y} r="9" fill="#00e5ff" opacity="0.15" />
      <circle cx={x} cy={y} r="5" fill="#00e5ff" opacity="0.9" style={{ filter: "drop-shadow(0 0 5px #00e5ff)" }} />
    </g>
  );
}

// ── Shared UI ──────────────────────────────────────────────────────────────
function SectionBadge({ num, title, color = "#00e5ff" }: { num: string; title: string; color?: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm"
        style={{ background: `${color}18`, border: `1.5px solid ${color}55`, color, fontFamily: "Poppins" }}>{num}</div>
      <h2 className="font-bold text-2xl" style={{ fontFamily: "Poppins", color }}>{title}</h2>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right,${color}44,transparent)` }} />
    </div>
  );
}

function ProConList({ items, positive }: { items: string[]; positive: boolean }) {
  const color = positive ? "#00ff88" : "#ff6b6b";
  const bg = positive ? "rgba(0,255,136,0.06)" : "rgba(255,107,107,0.06)";
  const border = positive ? "rgba(0,255,136,0.2)" : "rgba(255,107,107,0.2)";
  return (
    <div className="rounded-xl p-4 mt-3" style={{ background: bg, border: `1px solid ${border}` }}>
      <div className="text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color, fontFamily: "JetBrains Mono" }}>{positive ? "👍 Advantages" : "👎 Disadvantages"}</div>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#c8daea", fontFamily: "Inter" }}>
            <span style={{ color, marginTop: 1 }}>{positive ? "✓" : "✗"}</span>{it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 h-full" style={{
      background: "linear-gradient(135deg,#0a1628,#0d2040)",
      border: "1px solid rgba(0,180,216,0.18)",
      boxShadow: "0 4px 32px rgba(0,180,216,0.05)",
    }}>{children}</div>
  );
}

// ── SECTION 0: Title Slide ─────────────────────────────────────────────────
function TitleSlide() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 overflow-hidden"
      style={{ background: "linear-gradient(135deg,#050c1e 0%,#071830 45%,#05121f 100%)" }}>

      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.05 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="g" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M56 0L0 0 0 56" fill="none" stroke="#00b4d8" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      {/* Pulse nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {[{l:"7%",t:"10%",s:10,d:0},{l:"91%",t:"8%",s:7,d:0.6},{l:"4%",t:"80%",s:12,d:1.1},{l:"94%",t:"75%",s:8,d:1.7},
          {l:"20%",t:"50%",s:6,d:0.3},{l:"80%",t:"45%",s:9,d:0.9},{l:"50%",t:"4%",s:5,d:0.2},{l:"48%",t:"94%",s:6,d:1.4}]
          .map((n,i) => (
          <div key={i} className="absolute rounded-full"
            style={{left:n.l,top:n.t,width:n.s,height:n.s,background:"#00e5ff",
              boxShadow:`0 0 ${n.s*2}px #00e5ff`,
              animation:`nodepulse 3.2s ease-in-out ${n.d}s infinite`}} />
        ))}
      </div>

      {/* Top decorative bar */}
      <div className="mb-8 flex items-center gap-3">
        <div className="h-px w-20" style={{background:"linear-gradient(to right,transparent,#00b4d8)"}} />
        <div className="px-4 py-1 rounded-full text-xs font-mono tracking-widest uppercase"
          style={{border:"1px solid rgba(0,229,255,0.4)",color:"#00e5ff",background:"rgba(0,229,255,0.05)"}}>
          Computer Networks
        </div>
        <div className="h-px w-20" style={{background:"linear-gradient(to left,transparent,#00b4d8)"}} />
      </div>

      {/* Main Title */}
      <h1 className="font-black leading-tight mb-6"
        style={{
          fontFamily:"'Poppins',sans-serif",
          fontSize:"clamp(2rem,5.5vw,4.2rem)",
          background:"linear-gradient(135deg,#ffffff 0%,#b8d8f0 50%,#00e5ff 100%)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
          filter:"drop-shadow(0 0 40px rgba(0,229,255,0.25))",
          maxWidth:900,
        }}>
        Switching and Routing<br />in Computer Networks
      </h1>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-10">
        <div className="h-px w-32" style={{background:"linear-gradient(to right,transparent,#00b4d8)"}} />
        <div className="w-2 h-2 rounded-full" style={{background:"#00e5ff",boxShadow:"0 0 10px #00e5ff"}} />
        <div className="h-px w-32" style={{background:"linear-gradient(to left,transparent,#00b4d8)"}} />
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-4 gap-4 max-w-3xl w-full">
        {[
          {label:"Presented by",value:"Alex Johnson"},
          {label:"Student ID",value:"CS-2024-0042"},
          {label:"Course",value:"CNET 301 — Networks"},
          {label:"Section",value:"02"},
        ].map(item => (
          <div key={item.label} className="rounded-2xl px-4 py-4 flex flex-col items-center text-center"
            style={{background:"rgba(0,180,216,0.07)",border:"1px solid rgba(0,180,216,0.2)"}}>
            <div className="text-xs uppercase tracking-widest mb-1.5" style={{color:"#6b9bb8",fontFamily:"JetBrains Mono"}}>{item.label}</div>
            <div className="font-semibold text-sm" style={{color:"#e8f4ff",fontFamily:"Inter"}}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Network icons strip */}
      <div className="flex items-center gap-5 mt-10 opacity-40">
        {[
          <svg key="a" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
          <div key="d1" style={{width:28,height:1,background:"#00b4d8"}} />,
          <svg key="b" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5"><rect x="2" y="8" width="8" height="8" rx="1"/><rect x="14" y="3" width="8" height="5" rx="1"/><rect x="14" y="13" width="8" height="5" rx="1"/><line x1="10" y1="12" x2="14" y2="7"/><line x1="10" y1="12" x2="14" y2="16"/></svg>,
          <div key="d2" style={{width:28,height:1,background:"#00b4d8"}} />,
          <svg key="c" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
        ]}
      </div>

      <style>{`
        @keyframes nodepulse {
          0%,100%{transform:scale(1);opacity:0.4}
          50%{transform:scale(1.6);opacity:0.75}
        }
      `}</style>
    </section>
  );
}

// ── SECTION 1: Switching ───────────────────────────────────────────────────
function SwitchingSection() {
  const W = 520, H = 300;
  const sw = {x:260,y:150};
  const devs = [
    {x:80, y:70,  label:"PC-1", type:"pc"},
    {x:80, y:150, label:"PC-2", type:"pc"},
    {x:80, y:230, label:"PC-3", type:"pc"},
    {x:440,y:90,  label:"Laptop",type:"pc"},
    {x:440,y:210, label:"Printer",type:"printer"},
  ];

  return (
    <section className="py-16 px-10" style={{background:"#070e20"}}>
      <div className="max-w-6xl mx-auto">
        <SectionBadge num="01" title="Network Switching — নেটওয়ার্ক সুইচিং" color="#00e5ff" />
        <div className="grid grid-cols-2 gap-8">
          {/* Diagram */}
          <div className="rounded-2xl p-5" style={{
            background:"linear-gradient(135deg,#0a1628,#0d2040)",
            border:"1px solid rgba(0,229,255,0.2)",
            boxShadow:"0 0 40px rgba(0,229,255,0.04)",
          }}>
            <div className="text-center text-xs mb-3 font-mono uppercase tracking-widest" style={{color:"#6b9bb8"}}>LAN Network Diagram</div>
            <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
              {devs.map((d,i) => (
                <GlowLine key={i} x1={d.x+(d.x<260?16:-16)} y1={d.y}
                  x2={sw.x+(d.x<260?-26:26)} y2={sw.y}
                  color={i%2===0?"#00e5ff":"#00b4d8"} />
              ))}
              <Switch x={sw.x} y={sw.y} s={72} />
              <text x={sw.x} y={sw.y+38} textAnchor="middle" fill="#00e5ff"
                style={{fontFamily:"JetBrains Mono",fontSize:11,fontWeight:600}}>SWITCH</text>
              {devs.map((d,i) => (
                <g key={i}>
                  {d.type==="printer"
                    ? <Printer x={d.x} y={d.y} s={30}/>
                    : <PC x={d.x} y={d.y} s={30}/>}
                  <text x={d.x} y={d.y+24} textAnchor="middle" fill="#a8d8ea"
                    style={{fontFamily:"JetBrains Mono",fontSize:10}}>{d.label}</text>
                </g>
              ))}
            </svg>
          </div>

          {/* Explanation */}
          <InfoBox>
            <div className="space-y-3 text-sm" style={{fontFamily:"Inter",lineHeight:1.7}}>
              <div className="flex gap-2 items-start">
                <span style={{color:"#00e5ff",fontSize:16}}>👉</span>
                <p style={{color:"#c8daea"}}>Switching হলো একই network-এর ভিতরে ডেটা transfer করার process।</p>
              </div>
              <div className="flex gap-2 items-start">
                <span style={{color:"#00e5ff",fontSize:16}}>👉</span>
                <p style={{color:"#c8daea"}}>এটি OSI Model-এর <span style={{color:"#00e5ff",fontWeight:600}}>Layer 2 (Data Link Layer)</span>-এ কাজ করে।</p>
              </div>
              <div className="flex gap-2 items-start">
                <span style={{color:"#00e5ff",fontSize:16}}>👉</span>
                <p style={{color:"#c8daea"}}>Switch <span style={{color:"#00e5ff",fontWeight:600}}>MAC address</span> ব্যবহার করে data forward করে।</p>
              </div>
            </div>

            {/* Key facts */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                {k:"OSI Layer",v:"Layer 2"},
                {k:"Address",v:"MAC Address"},
                {k:"Scope",v:"Same LAN"},
                {k:"Device",v:"Switch"},
              ].map(kv=>(
                <div key={kv.k} className="rounded-lg px-3 py-2" style={{background:"rgba(0,229,255,0.06)",border:"1px solid rgba(0,229,255,0.15)"}}>
                  <div className="text-xs uppercase tracking-wider" style={{color:"#6b9bb8",fontFamily:"JetBrains Mono"}}>{kv.k}</div>
                  <div className="font-semibold text-sm" style={{color:"#00e5ff"}}>{kv.v}</div>
                </div>
              ))}
            </div>

            <ProConList positive items={["Fast communication","Low collision","Efficient LAN performance"]} />
            <ProConList positive={false} items={["শুধু same network-এ কাজ করে","Large network handle করতে পারে না"]} />
          </InfoBox>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 2: Routing ────────────────────────────────────────────────────
function RoutingSection() {
  const W = 520, H = 290;
  const rtr = {x:260,y:145};
  const swA = {x:160,y:145};
  const swB = {x:360,y:145};
  const lanA = [{x:55,y:90},{x:55,y:200}];
  const lanB = [{x:465,y:90},{x:465,y:200}];

  return (
    <section className="py-16 px-10" style={{background:"#060d1f"}}>
      <div className="max-w-6xl mx-auto">
        <SectionBadge num="02" title="Network Routing — নেটওয়ার্ক রাউটিং" color="#00b4d8" />
        <div className="grid grid-cols-2 gap-8">
          {/* Explanation */}
          <InfoBox>
            <div className="space-y-3 text-sm" style={{fontFamily:"Inter",lineHeight:1.7}}>
              <div className="flex gap-2 items-start">
                <span style={{color:"#00b4d8",fontSize:16}}>👉</span>
                <p style={{color:"#c8daea"}}>Routing হলো different network-এর মধ্যে data transfer করার process।</p>
              </div>
              <div className="flex gap-2 items-start">
                <span style={{color:"#00b4d8",fontSize:16}}>👉</span>
                <p style={{color:"#c8daea"}}>এটি OSI Model-এর <span style={{color:"#00b4d8",fontWeight:600}}>Layer 3 (Network Layer)</span>-এ কাজ করে।</p>
              </div>
              <div className="flex gap-2 items-start">
                <span style={{color:"#00b4d8",fontSize:16}}>👉</span>
                <p style={{color:"#c8daea"}}>Router <span style={{color:"#00b4d8",fontWeight:600}}>IP address</span> ব্যবহার করে best path নির্বাচন করে।</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                {k:"OSI Layer",v:"Layer 3"},
                {k:"Address",v:"IP Address"},
                {k:"Scope",v:"Different Network"},
                {k:"Device",v:"Router"},
              ].map(kv=>(
                <div key={kv.k} className="rounded-lg px-3 py-2" style={{background:"rgba(0,180,216,0.06)",border:"1px solid rgba(0,180,216,0.15)"}}>
                  <div className="text-xs uppercase tracking-wider" style={{color:"#6b9bb8",fontFamily:"JetBrains Mono"}}>{kv.k}</div>
                  <div className="font-semibold text-sm" style={{color:"#00b4d8"}}>{kv.v}</div>
                </div>
              ))}
            </div>
            <ProConList positive items={["Different networks connect করতে পারে","Internet communication possible","Best path selection করে"]} />
            <ProConList positive={false} items={["Switch-এর চেয়ে slow","Complex configuration","Costly device"]} />
          </InfoBox>

          {/* Diagram */}
          <div className="rounded-2xl p-5" style={{
            background:"linear-gradient(135deg,#0a1628,#0d2040)",
            border:"1px solid rgba(0,180,216,0.2)",
            boxShadow:"0 0 40px rgba(0,180,216,0.04)",
          }}>
            <div className="text-center text-xs mb-3 font-mono uppercase tracking-widest" style={{color:"#6b9bb8"}}>Inter-network Routing Diagram</div>
            <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
              {/* LAN boxes */}
              <rect x="18" y="14" width="118" height="262" rx="10" fill="none" stroke="rgba(0,180,216,0.2)" strokeDasharray="5 4"/>
              <rect x="384" y="14" width="118" height="262" rx="10" fill="none" stroke="rgba(0,180,216,0.2)" strokeDasharray="5 4"/>
              <text x="77" y="29" textAnchor="middle" fill="#6b9bb8" style={{fontFamily:"JetBrains Mono",fontSize:9}}>LAN A</text>
              <text x="77" y="40" textAnchor="middle" fill="#00b4d8" style={{fontFamily:"JetBrains Mono",fontSize:8}}>192.168.1.0/24</text>
              <text x="443" y="29" textAnchor="middle" fill="#6b9bb8" style={{fontFamily:"JetBrains Mono",fontSize:9}}>LAN B</text>
              <text x="443" y="40" textAnchor="middle" fill="#00b4d8" style={{fontFamily:"JetBrains Mono",fontSize:8}}>192.168.2.0/24</text>

              {lanA.map((d,i)=><GlowLine key={i} x1={d.x+15} y1={d.y} x2={swA.x-22} y2={swA.y} color="#00b4d8"/>)}
              <GlowLine x1={swA.x+22} y1={swA.y} x2={rtr.x-22} y2={rtr.y} color="#00e5ff"/>
              <GlowLine x1={rtr.x+22} y1={rtr.y} x2={swB.x-22} y2={swB.y} color="#00e5ff"/>
              {lanB.map((d,i)=><GlowLine key={i} x1={swB.x+22} y1={swB.y} x2={d.x-15} y2={d.y} color="#00b4d8"/>)}

              {lanA.map((d,i)=>(
                <g key={i}><PC x={d.x} y={d.y} s={28}/>
                  <text x={d.x} y={d.y+22} textAnchor="middle" fill="#a8d8ea" style={{fontFamily:"JetBrains Mono",fontSize:9}}>{`PC-${i+1}`}</text>
                </g>
              ))}
              <Switch x={swA.x} y={swA.y} s={40}/>
              <text x={swA.x} y={swA.y+26} textAnchor="middle" fill="#00e5ff" style={{fontFamily:"JetBrains Mono",fontSize:9}}>SW-A</text>
              <Router x={rtr.x} y={rtr.y} s={40}/>
              <text x={rtr.x} y={rtr.y+28} textAnchor="middle" fill="#00b4d8" style={{fontFamily:"JetBrains Mono",fontSize:10,fontWeight:600}}>ROUTER</text>
              <Switch x={swB.x} y={swB.y} s={40}/>
              <text x={swB.x} y={swB.y+26} textAnchor="middle" fill="#00e5ff" style={{fontFamily:"JetBrains Mono",fontSize:9}}>SW-B</text>
              {lanB.map((d,i)=>(
                <g key={i}><PC x={d.x} y={d.y} s={28}/>
                  <text x={d.x} y={d.y+22} textAnchor="middle" fill="#a8d8ea" style={{fontFamily:"JetBrains Mono",fontSize:9}}>{`PC-${i+3}`}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 3: Comparison Table ───────────────────────────────────────────
function ComparisonSection() {
  const rows = [
    {icon:"📡",feat:"OSI Layer",sw:"Layer 2 — Data Link",rt:"Layer 3 — Network"},
    {icon:"🏷️",feat:"Address Type",sw:"MAC Address (48-bit)",rt:"IP Address (32/128-bit)"},
    {icon:"🌐",feat:"Network Scope",sw:"Same LAN segment",rt:"Between different networks"},
    {icon:"🖥️",feat:"Primary Device",sw:"Network Switch",rt:"Router"},
    {icon:"🗺️",feat:"Forwarding Logic",sw:"MAC Address Table",rt:"Routing Table / Protocol"},
    {icon:"⚡",feat:"Speed",sw:"Very Fast (hardware)",rt:"Slower (software/ASIC)"},
    {icon:"📢",feat:"Broadcast Domain",sw:"Single domain",rt:"Separate per interface"},
    {icon:"💰",feat:"Cost",sw:"Less expensive",rt:"More expensive"},
  ];

  return (
    <section className="py-16 px-10" style={{background:"#070e20"}}>
      <div className="max-w-5xl mx-auto">
        <SectionBadge num="03" title="Switching vs Routing — তুলনামূলক বিশ্লেষণ" color="#00e5ff" />
        <div className="rounded-2xl overflow-hidden"
          style={{border:"1px solid rgba(0,229,255,0.2)",boxShadow:"0 0 60px rgba(0,229,255,0.04)"}}>
          {/* Header */}
          <div className="grid grid-cols-[2fr_3fr_3fr]"
            style={{background:"linear-gradient(90deg,#0a1e3d,#062440)"}}>
            <div className="px-6 py-4 text-xs uppercase tracking-widest" style={{color:"#6b9bb8",fontFamily:"JetBrains Mono"}}>
              Feature
            </div>
            <div className="px-6 py-4 flex items-center gap-2 border-l" style={{borderColor:"rgba(0,229,255,0.1)"}}>
              <div className="w-2 h-2 rounded-full" style={{background:"#00e5ff",boxShadow:"0 0 6px #00e5ff"}}/>
              <span className="font-bold text-base" style={{color:"#00e5ff",fontFamily:"Poppins"}}>🔀 Switching</span>
            </div>
            <div className="px-6 py-4 flex items-center gap-2 border-l" style={{borderColor:"rgba(0,180,216,0.1)"}}>
              <div className="w-2 h-2 rounded-full" style={{background:"#22c55e",boxShadow:"0 0 6px #22c55e"}}/>
              <span className="font-bold text-base" style={{color:"#22c55e",fontFamily:"Poppins"}}>🌐 Routing</span>
            </div>
          </div>
          {/* Rows */}
          {rows.map((row,i)=>(
            <div key={i} className="grid grid-cols-[2fr_3fr_3fr] group transition-colors duration-150"
              style={{
                background:i%2===0?"rgba(0,180,216,0.03)":"rgba(0,180,216,0.055)",
                borderTop:"1px solid rgba(0,180,216,0.09)",
              }}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(0,229,255,0.07)")}
              onMouseLeave={e=>(e.currentTarget.style.background=i%2===0?"rgba(0,180,216,0.03)":"rgba(0,180,216,0.055)")}>
              <div className="px-6 py-3.5 flex items-center gap-2.5">
                <span className="text-base">{row.icon}</span>
                <span className="text-sm font-medium" style={{color:"#a8d8ea",fontFamily:"Inter"}}>{row.feat}</span>
              </div>
              <div className="px-6 py-3.5 text-sm border-l flex items-center" style={{color:"#e8f4ff",fontFamily:"Inter",borderColor:"rgba(0,229,255,0.08)"}}>
                <span className="px-2 py-0.5 rounded-md text-xs" style={{background:"rgba(0,229,255,0.1)",color:"#00e5ff"}}>{row.sw}</span>
              </div>
              <div className="px-6 py-3.5 text-sm border-l flex items-center" style={{color:"#e8f4ff",fontFamily:"Inter",borderColor:"rgba(34,197,94,0.08)"}}>
                <span className="px-2 py-0.5 rounded-md text-xs" style={{background:"rgba(34,197,94,0.1)",color:"#22c55e"}}>{row.rt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 4: Packet Flow ────────────────────────────────────────────────
function PacketFlowSection() {
  const [progress,setProgress] = useState(0);
  const [running,setRunning] = useState(false);
  const [step,setStep] = useState(-1);
  const rafRef = useRef<number>(null);
  const startRef = useRef<number | null>(null);

  const W = 820, H = 190;
  const nodes = [
    {x:80,  y:95, label:"Sender",   sub:"192.168.1.10", type:"pc"},
    {x:240, y:95, label:"Switch",   sub:"MAC Forward",   type:"sw"},
    {x:410, y:95, label:"Router",   sub:"IP Forward",    type:"rt"},
    {x:580, y:95, label:"Switch",   sub:"MAC Forward",   type:"sw"},
    {x:740, y:95, label:"Receiver", sub:"192.168.2.20",  type:"pc"},
  ];
  const path: [number,number][] = nodes.map(n=>[n.x,n.y]);

  const steps = [
    "Data প্রথমে LAN A-এর ভিতরে Switch দ্বারা MAC address দিয়ে forward হয়।",
    "Switch packet-টি Router-এর কাছে পাঠায়।",
    "Router IP address দেখে best path নির্বাচন করে LAN B-তে পাঠায়।",
    "LAN B-এর Switch destination MAC address দিয়ে deliver করে।",
    "Receiver সফলভাবে packet পেয়ে গেছে! ✓",
  ];

  useEffect(()=>{
    if(running){
      const animate=(ts:number)=>{
        if(startRef.current===null) startRef.current=ts;
        const elapsed=ts-startRef.current;
        const dur=5000;
        const p=Math.min(elapsed/dur,1);
        setProgress(p);
        setStep(Math.min(Math.floor(p*5),4));
        if(p<1){ rafRef.current=requestAnimationFrame(animate); }
        else { setRunning(false); startRef.current=null; }
      };
      rafRef.current=requestAnimationFrame(animate);
      return ()=>{ if(rafRef.current) cancelAnimationFrame(rafRef.current); };
    }
  },[running]);

  const handlePlay=()=>{
    setProgress(0); setStep(-1); startRef.current=null; setRunning(true);
  };

  return (
    <section className="py-16 px-10" style={{background:"#060d1f"}}>
      <div className="max-w-6xl mx-auto">
        <SectionBadge num="04" title="Packet Flow Visualization — প্যাকেট প্রবাহ" color="#00e5ff" />
        <div className="grid grid-cols-5 gap-2 mb-6">
          {steps.map((s,i)=>(
            <div key={i} className="rounded-xl px-3 py-2.5 text-xs text-center transition-all duration-300"
              style={{
                fontFamily:"Inter",lineHeight:1.6,
                background:step>=i?"rgba(0,229,255,0.12)":"rgba(0,180,216,0.04)",
                border:step>=i?"1px solid rgba(0,229,255,0.35)":"1px solid rgba(0,180,216,0.12)",
                color:step>=i?"#e8f4ff":"#6b9bb8",
                transform:step===i?"scale(1.02)":"scale(1)",
                boxShadow:step===i?"0 0 16px rgba(0,229,255,0.12)":"none",
              }}>
              <div className="font-bold mb-1" style={{color:step>=i?"#00e5ff":"#6b9bb8"}}>Step {i+1}</div>
              {s}
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6" style={{
          background:"linear-gradient(135deg,#0a1628,#0d2040)",
          border:"1px solid rgba(0,229,255,0.2)",
          boxShadow:"0 0 40px rgba(0,229,255,0.04)",
        }}>
          <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
            {nodes.slice(0,-1).map((n,i)=>(
              <GlowLine key={i} x1={n.x+22} y1={n.y} x2={nodes[i+1].x-22} y2={nodes[i+1].y}
                color={i===1||i===2?"#00e5ff":"#00b4d8"} />
            ))}
            {nodes.map((n,i)=>(
              <g key={i}>
                {n.type==="pc" && <PC x={n.x} y={n.y} s={38}/>}
                {n.type==="sw" && <Switch x={n.x} y={n.y} s={44}/>}
                {n.type==="rt" && <Router x={n.x} y={n.y} s={44}/>}
                <text x={n.x} y={n.y+34} textAnchor="middle" fill="#a8d8ea"
                  style={{fontFamily:"Inter",fontSize:11,fontWeight:600}}>{n.label}</text>
                <text x={n.x} y={n.y+46} textAnchor="middle" fill="#6b9bb8"
                  style={{fontFamily:"JetBrains Mono",fontSize:9}}>{n.sub}</text>
              </g>
            ))}
            {(running||progress>0) && <PacketDot progress={progress} path={path}/>}
          </svg>
          <div className="flex items-center justify-center gap-4 mt-2">
            <button onClick={handlePlay} disabled={running}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200"
              style={{
                background:running?"rgba(0,229,255,0.1)":"linear-gradient(135deg,#00b4d8,#00e5ff)",
                color:running?"#6b9bb8":"#060d1f",
                cursor:running?"not-allowed":"pointer",
                fontFamily:"Inter",
                boxShadow:running?"none":"0 0 22px rgba(0,229,255,0.3)",
              }}>
              {running?"▶ Sending...":"▶ Send Packet"}
            </button>
            <div className="text-xs" style={{color:"#6b9bb8",fontFamily:"Inter"}}>
              {progress===0?"Click to animate packet flow":progress>=1?"✓ Packet delivered!":
                `In transit — ${Math.round(progress*100)}%`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 5: Conclusion ─────────────────────────────────────────────────
function ConclusionSection() {
  const points = [
    {icon:"🔀",title:"Switching — Local Communication",text:"Switching ব্যবহার করা হয় local communication-এর জন্য (LAN)। MAC address দিয়ে একই network-এর devices-এর মধ্যে দ্রুত data transfer করে।",color:"#00e5ff"},
    {icon:"🌐",title:"Routing — Global Communication",text:"Routing ব্যবহার করা হয় global communication-এর জন্য (WAN / Internet)। IP address দিয়ে different network-এর মধ্যে data পাঠায়।",color:"#22c55e"},
    {icon:"🤝",title:"Both Are Essential",text:"Modern networking system-এ Switching এবং Routing উভয়ই অপরিহার্য। এই দুটি একসাথে কাজ করে আমাদের internet এবং LAN সংযোগ সম্ভব করে।",color:"#f59e0b"},
  ];

  return (
    <section className="py-16 px-10" style={{background:"#070e20"}}>
      <div className="max-w-5xl mx-auto">
        <SectionBadge num="05" title="Conclusion — উপসংহার" color="#00e5ff" />
        <div className="grid grid-cols-3 gap-6 mb-8">
          {points.map((p,i)=>(
            <div key={i} className="rounded-2xl p-6 flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.02]"
              style={{
                background:"linear-gradient(135deg,#0a1628,#0d2040)",
                border:`1px solid ${p.color}33`,
                boxShadow:`0 0 30px ${p.color}08`,
              }}>
              <div className="text-3xl">{p.icon}</div>
              <h3 className="font-bold text-sm" style={{color:p.color,fontFamily:"Poppins"}}>{p.title}</h3>
              <p className="text-xs leading-relaxed" style={{color:"#a8d8ea",fontFamily:"Inter"}}>{p.text}</p>
            </div>
          ))}
        </div>

        {/* Summary box */}
        <div className="rounded-2xl p-6 text-center"
          style={{background:"linear-gradient(135deg,#062040,#0a1e3a)",border:"1px solid rgba(0,229,255,0.2)"}}>
          <div className="text-xs uppercase tracking-widest mb-3" style={{color:"#6b9bb8",fontFamily:"JetBrains Mono"}}>Key Takeaways</div>
          <div className="flex justify-center flex-wrap gap-4">
            {[
              {label:"Switching",detail:"Layer 2 · MAC · LAN",color:"#00e5ff"},
              {label:"+",detail:"",color:"#6b9bb8"},
              {label:"Routing",detail:"Layer 3 · IP · WAN",color:"#22c55e"},
              {label:"=",detail:"",color:"#6b9bb8"},
              {label:"Modern Network",detail:"Fast · Scalable · Global",color:"#f59e0b"},
            ].map((item,i)=>(
              item.detail
                ? <div key={i} className="rounded-xl px-5 py-3 text-center"
                    style={{background:`${item.color}10`,border:`1px solid ${item.color}33`}}>
                    <div className="font-bold text-sm" style={{color:item.color,fontFamily:"Poppins"}}>{item.label}</div>
                    <div className="text-xs mt-0.5" style={{color:"#6b9bb8",fontFamily:"JetBrains Mono"}}>{item.detail}</div>
                  </div>
                : <div key={i} className="flex items-center text-xl font-bold" style={{color:item.color}}>{item.label}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 6: Thanks ─────────────────────────────────────────────────────
function ThanksSection() {
  return (
    <section className="relative py-20 px-8 flex flex-col items-center justify-center text-center overflow-hidden"
      style={{background:"linear-gradient(135deg,#050c1e 0%,#071830 50%,#05121f 100%)"}}>

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{width:500,height:500,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(0,229,255,0.06) 0%,transparent 70%)"}} />
      </div>

      {/* Decorative rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {[300,420,540].map((r,i)=>(
          <div key={i} className="absolute rounded-full" style={{
            width:r,height:r,border:"1px solid rgba(0,180,216,0.08)",
            animation:`ringpulse 4s ease-in-out ${i*0.6}s infinite`,
          }} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Thank you */}
        <div className="mb-4 text-6xl">🙏</div>
        <h2 className="font-black mb-3"
          style={{
            fontFamily:"Poppins",fontSize:"clamp(2.5rem,7vw,5rem)",
            background:"linear-gradient(135deg,#ffffff,#a8d8ea,#00e5ff)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            filter:"drop-shadow(0 0 30px rgba(0,229,255,0.2))",
          }}>
          Thank You!
        </h2>
        <p className="text-lg mb-8" style={{color:"#6b9bb8",fontFamily:"Inter"}}>
          ধন্যবাদ মনোযোগ দিয়ে শোনার জন্য 🎓
        </p>

        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-20" style={{background:"linear-gradient(to right,transparent,#00b4d8)"}}/>
          <div className="w-2 h-2 rounded-full" style={{background:"#00e5ff",boxShadow:"0 0 10px #00e5ff"}}/>
          <div className="h-px w-20" style={{background:"linear-gradient(to left,transparent,#00b4d8)"}}/>
        </div>

        {/* Presenter card */}
        <div className="rounded-2xl px-10 py-6 mb-8"
          style={{background:"rgba(0,180,216,0.07)",border:"1px solid rgba(0,180,216,0.2)"}}>
          <div className="grid grid-cols-2 gap-8">
            {[
              {label:"Presented by",value:"Alex Johnson"},
              {label:"Student ID",value:"CS-2024-0042"},
              {label:"Course",value:"CNET 301 — Networks"},
              {label:"Section",value:"02"},
            ].map(item=>(
              <div key={item.label} className="text-left">
                <div className="text-xs uppercase tracking-widest mb-1" style={{color:"#6b9bb8",fontFamily:"JetBrains Mono"}}>{item.label}</div>
                <div className="font-semibold" style={{color:"#e8f4ff",fontFamily:"Inter"}}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Topic pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {["Switching","Routing","MAC Address","IP Address","OSI Layer 2","OSI Layer 3","LAN","WAN","Packet Flow"].map(tag=>(
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono"
              style={{background:"rgba(0,229,255,0.07)",border:"1px solid rgba(0,229,255,0.2)",color:"#00e5ff"}}>
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 text-xs" style={{color:"#6b9bb8",fontFamily:"JetBrains Mono"}}>
          CNET 301 — Computer Networks · University Project · 2024
        </div>
      </div>

      <style>{`
        @keyframes ringpulse {
          0%,100%{opacity:0.5;transform:scale(1)}
          50%{opacity:1;transform:scale(1.04)}
        }
      `}</style>
    </section>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen" style={{fontFamily:"Inter,sans-serif",background:"#060d1f"}}>
      <TitleSlide />
      <SwitchingSection />
      <RoutingSection />
      <ComparisonSection />
      <PacketFlowSection />
      <ConclusionSection />
      <ThanksSection />
    </div>
  );
}
