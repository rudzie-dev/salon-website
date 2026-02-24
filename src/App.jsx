import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Phone, Star, Menu, X, ArrowRight, MapPin, Clock, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

const useIsMobile = () => {
  const [mob, setMob] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMob(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mob;
};

// ─── GOOGLE REVIEWS — paste your real reviews here ───────────────────────────
// To update: go to Google Maps → find your business → click a review → copy the
// reviewer's name and text and paste below. Stars are always 5.
const REVIEWS = [
  {
    name: "Thabo M.",
    date: "2 weeks ago",
    text: "Excellent service from start to finish. Same-day install, professional and clean. My DSTV hasn't missed a beat since. Highly recommend.",
  },
  {
    name: "Priya N.",
    date: "1 month ago",
    text: "Had my CCTV cameras installed the same day I called. Very knowledgeable and gave great advice on placement. Will definitely use again.",
  },
  {
    name: "David K.",
    date: "3 months ago",
    text: "Fixed my gate motor when two other guys couldn't. Honest about what was needed, fair price. This is now my go-to for everything installation.",
  },
];

// ─── INJECT STYLES ────────────────────────────────────────────────────────────
const _css = document.createElement("style");
_css.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Barlow:ital,wght@0,400;0,600;0,700;0,800;0,900;1,600;1,800&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }
  body {
    background: #111009;
    color: #E8E2D9;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .f-bar  { font-family: 'Barlow', sans-serif; }
  .f-int  { font-family: 'Inter', sans-serif; }
  .f-mono { font-family: 'DM Mono', monospace; }

  /* ── Colour tokens ── */
  :root {
    --bg:       #111009;
    --bg2:      #181510;
    --bg3:      #1E1A13;
    --border:   rgba(232,226,217,0.08);
    --muted:    rgba(232,226,217,0.38);
    --faint:    rgba(232,226,217,0.05);
    --ink:      #E8E2D9;
    --green:    #25d366;
    --green-lo: rgba(37,211,102,0.08);
  }

  /* ── Paper grain overlay ── */
  body::after {
    content: '';
    position: fixed; inset: 0; pointer-events: none; z-index: 9998;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.032'/%3E%3C/svg%3E");
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--bg3); }

  a { color: inherit; text-decoration: none; }

  /* ── Glint button — periodic auto-glint + hover ── */
  @keyframes glintAuto {
    0%,100% { --glint-pos: -100%; }
    0%      { --glint-pos: -100%; }
    8%      { --glint-pos: 200%; }
    100%    { --glint-pos: 200%; }
  }

  .btn-glint {
    position: relative; overflow: hidden;
    display: inline-flex; align-items: center; gap: 9px;
    font-family: 'DM Mono', monospace; font-size: 12px;
    font-weight: 500; letter-spacing: 0.09em; text-transform: uppercase;
    color: var(--ink); background: transparent;
    border: 1px solid rgba(232,226,217,0.2);
    padding: 13px 22px; cursor: pointer; text-decoration: none;
    transition: border-color 0.35s ease, box-shadow 0.35s ease, color 0.35s ease;
    animation: glintAuto 5s ease-in-out infinite;
  }
  .btn-glint::before {
    content: '';
    position: absolute; top: 0; left: var(--glint-pos, -100%);
    width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(37,211,102,0.18), transparent);
    transition: none;
    animation: inherit;
  }
  .btn-glint:hover {
    border-color: rgba(37,211,102,0.55);
    box-shadow: 0 0 0 3px rgba(37,211,102,0.06), inset 0 0 20px rgba(37,211,102,0.04);
    color: #fff;
  }
  .btn-glint:hover::before {
    animation: none;
    left: 200%;
    transition: left 0.5s ease;
  }
  .btn-glint:active { transform: scale(0.97); }

  /* dark-bg variant (light border) */
  .btn-glint-dk {
    position: relative; overflow: hidden;
    display: inline-flex; align-items: center; gap: 9px;
    font-family: 'DM Mono', monospace; font-size: 13px;
    font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(232,226,217,0.6); background: transparent;
    border: 1px solid rgba(232,226,217,0.15);
    padding: 15px 30px; cursor: pointer; text-decoration: none;
    transition: border-color 0.35s ease, box-shadow 0.35s ease, color 0.35s ease;
    animation: glintAuto 6s 1s ease-in-out infinite;
  }
  .btn-glint-dk::before {
    content: '';
    position: absolute; top: 0; left: var(--glint-pos, -100%);
    width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(37,211,102,0.15), transparent);
    animation: inherit;
  }
  .btn-glint-dk:hover {
    border-color: rgba(37,211,102,0.5);
    color: #fff;
    box-shadow: 0 0 0 3px rgba(37,211,102,0.05), inset 0 0 24px rgba(37,211,102,0.05);
  }
  .btn-glint-dk:hover::before { animation: none; left: 200%; transition: left 0.5s ease; }
  .btn-glint-dk:active { transform: scale(0.97); }

  /* ── Float WA ── */
  @keyframes waFloat {
    0%,100% { box-shadow: 0 4px 24px rgba(37,211,102,0.28), 0 0 0 0 rgba(37,211,102,0); }
    50%      { box-shadow: 0 8px 36px rgba(37,211,102,0.4), 0 0 0 6px rgba(37,211,102,0.06); }
  }
  .wa-float { animation: waFloat 3s ease-in-out infinite; }

  /* ── Brand ticker ── */
  @keyframes roll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .roll { animation: roll 32s linear infinite; display: flex; width: max-content; }
  .roll:hover { animation-play-state: paused; }

  /* ── Bento grid ── */
  .bento {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 220px 220px;
    gap: 3px;
  }
  .bento-a { grid-column: span 2; grid-row: span 1; }
  .bento-b { grid-column: span 2; grid-row: span 2; }
  .bento-c { grid-column: span 1; }
  .bento-d { grid-column: span 1; }
  .bento-e { grid-column: span 1; }
  .bento-f { grid-column: span 1; }

  @media (max-width: 768px) {
    .bento {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
    }
    .bento-a, .bento-b { grid-column: span 2; aspect-ratio: 16/8; }
    .bento-c, .bento-d, .bento-e, .bento-f { grid-column: span 1; aspect-ratio: 4/3; }
  }

  /* ── Service cards ── */
  .svc-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    padding: 36px 32px;
    position: relative; overflow: hidden;
    transition: border-color 0.3s ease, background 0.3s ease;
    cursor: default;
  }
  .svc-card:hover {
    border-color: rgba(37,211,102,0.18);
    background: var(--bg3);
  }
  .svc-card::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 0% 0%, rgba(37,211,102,0.04) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.4s ease;
    pointer-events: none;
  }
  .svc-card:hover::after { opacity: 1; }

  /* ── Review card ── */
  .rev-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    padding: 32px;
    transition: border-color 0.3s ease;
  }
  .rev-card:hover { border-color: rgba(232,226,217,0.16); }

  /* ── Pill tag ── */
  .tag {
    display: inline-block;
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--muted);
    border: 1px solid var(--border);
    padding: 4px 11px;
  }

  /* ── Live dot ── */
  @keyframes liveDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
  .live-dot { animation: liveDot 2s ease-in-out infinite; }

  /* ── Mobile carousel ── */
  .carousel-wrap {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    display: flex;
    gap: 12px;
    padding-bottom: 4px;
  }
  .carousel-wrap::-webkit-scrollbar { display: none; }
  .carousel-item {
    scroll-snap-align: start;
    flex-shrink: 0;
  }

  /* ── Contact grid responsive ── */
  @media (max-width: 768px) {
    .contact-grid { grid-template-columns: 1fr !important; }
  }

  /* ── Nav responsive ── */
  .nav-links { display: flex; gap: 28px; align-items: center; }
  .nav-menu-btn { display: flex; }
  @media (max-width: 768px) {
    .nav-links { display: none !important; }
  }
  @media (min-width: 769px) {
    .nav-menu-btn { display: none !important; }
  }

  /* ── Hero stats ── */
  .hero-stats { display: flex; flex-wrap: wrap; gap: 0; margin-top: 80px; padding-top: 40px; border-top: 1px solid rgba(232,226,217,0.07); }
  .hero-stat { flex: 1 1 130px; padding-right: 40px; padding-bottom: 16px; }
  @media (max-width: 640px) {
    .hero-stats { margin-top: 56px; }
    .hero-stat { flex: 1 1 calc(50% - 20px); padding-right: 20px; padding-bottom: 20px; }
    .hero-stat:nth-child(2n) { padding-right: 0; }
  }

  /* ── Section spacing ── */
  .section { padding: 96px 0; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
  .hero-container { max-width: 1200px; margin: 0; padding: 0 32px; }

  @media (max-width: 640px) {
    .container { padding: 0 20px; }
    .hero-container { padding: 0 20px; }
    .section { padding: 64px 0; }
  }

  /* ── Hero grid lines ── */
  .hero-grid {
    background-image:
      linear-gradient(rgba(232,226,217,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(232,226,217,0.03) 1px, transparent 1px);
    background-size: 72px 72px;
  }
`;
document.head.appendChild(_css);

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const PHONE     = "060 603 8238";
const PHONE_RAW = "0606038238";
const WA        = "https://wa.me/27606038238?text=Hi%20MG%20Installation%2C%20I%27d%20like%20a%20quote%20please";
const EMAIL     = "matchlessgifts888@gmail.com";

const BRANDS = ["DSTV","OpenView HD","Hikvision","Dahua","HiLook","Centurion","CAME","FAAC","Samsung","LG","Sony","DSC"];

const SERVICES = [
  { n:"01", title:"DSTV & OpenView HD",
    body:"Fast, clean installs for homes and businesses. Signal problems, Xtraview setup, new decoders — we handle it all.",
    tags:["New Installs","Signal Fixes","Xtraview","4K"] },
  { n:"02", title:"CCTV & Security Cameras",
    body:"Hikvision, Dahua and HiLook systems installed and configured. See your property live from your phone, anywhere.",
    tags:["Hikvision","Dahua","Remote View","Maintenance"] },
  { n:"03", title:"Gate Motors & Intercoms",
    body:"Centurion sliding and swing gate motors, intercoms and access control for homes, complexes and businesses.",
    tags:["Centurion","Sliding","Swing","Access Control"] },
  { n:"04", title:"TV Wall Mounts",
    body:"Fixed, tilt and full-motion mounts with clean cable management. Looks factory-fitted, every time.",
    tags:["All Sizes","Full-Motion","Cable Neat"] },
  { n:"05", title:"Callouts & Repairs",
    body:"Something's not working? We come to you, diagnose the problem and fix it — same day where possible.",
    tags:["Same Day","All Brands","Fair Pricing"] },
  { n:"06", title:"Web Development",
    body:"Professional websites built for local businesses. Fast, mobile-first and designed to bring in customers.",
    tags:["Design","Build","SEO","Mobile"] },
];

const BENTO_SLOTS = [
  { cls:"bento-a", label:"Full Camera Overview",   sub:"Hikvision · Home Install",    img:"/1.webp" },
  { cls:"bento-b", label:"DVR & Cable Routing",    sub:"Clean Install · Ladysmith",   img:"/2.webp" },
  { cls:"bento-c", label:"Camera Placement",       sub:"Corner Mount · High Angle",   img:"/3.webp" },
  { cls:"bento-d", label:"Exterior Coverage",      sub:"Driveway & Entry Points",     img:"/4.webp" },
  { cls:"bento-e", label:"Night Vision Test",      sub:"IR · Full Colour Mode",       img:"/5.webp" },
  { cls:"bento-f", label:"System Live View",       sub:"Remote View · iOS & Android", img:"/5.webp" },
];

// ─── WA SVG ───────────────────────────────────────────────────────────────────
const WASvg = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ─── FLOATING WA ──────────────────────────────────────────────────────────────
const FloatWA = () => {
  const [open, setOpen] = useState(false);
  return (
    <motion.a
      href={WA} target="_blank"
      className="wa-float f-mono"
      style={{
        position:"fixed", bottom:24, right:24, zIndex:50,
        display:"flex", alignItems:"center", gap:10,
        background:"#25d366", color:"#fff",
        borderRadius:999,
        padding: open ? "13px 22px" : "13px",
        fontSize:12, fontWeight:500, letterSpacing:"0.07em",
        cursor:"pointer", whiteSpace:"nowrap",
      }}
      initial={{ scale:0, opacity:0 }}
      animate={{ scale:1, opacity:1 }}
      transition={{ delay:1.8, type:"spring", stiffness:260, damping:20 }}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      whileTap={{ scale:0.93 }}
    >
      <WASvg size={20}/>
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ width:0, opacity:0 }}
            animate={{ width:"auto", opacity:1 }}
            exit={{ width:0, opacity:0 }}
            transition={{ duration:0.22 }}
            style={{ overflow:"hidden" }}
          >
            WhatsApp a Quote
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

// ─── NAV ──────────────────────────────────────────────────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        style={{
          position:"fixed", top:0, left:0, right:0, zIndex:40,
          borderBottom: scrolled ? "1px solid rgba(232,226,217,0.07)" : "1px solid transparent",
          background: scrolled ? "rgba(17,16,9,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          transition:"all 0.4s ease",
        }}
        initial={{ y:-64, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
      >
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          {/* Logo */}
          <span className="f-bar" style={{ fontSize:18, fontWeight:800, letterSpacing:"0.04em", color:"#E8E2D9" }}>
            MG<span style={{ fontWeight:400, opacity:0.3, marginLeft:6 }}>INSTALLATION</span>
          </span>

          {/* Centre links — hidden on mobile via CSS */}
          <div className="nav-links">
            {["Services","Work","Reviews","Contact"].map(l => (
              <motion.a key={l} href={`#${l.toLowerCase()}`}
                className="f-mono"
                style={{ fontSize:11, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(232,226,217,0.38)" }}
                whileHover={{ color:"rgba(232,226,217,0.9)" }}
              >{l}</motion.a>
            ))}
          </div>

          {/* Right — WA + hamburger */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <motion.a
              href={WA} target="_blank"
              className="btn-glint"
              style={{ borderRadius:999, padding:"9px 18px", fontSize:11 }}
              whileTap={{ scale:0.95 }}
            >
              <WASvg size={13}/> WhatsApp
            </motion.a>
            {/* Hamburger — shown only on mobile via CSS */}
            <motion.button
              onClick={() => setMob(true)}
              className="nav-menu-btn"
              style={{ background:"none", border:"none", color:"rgba(232,226,217,0.4)", cursor:"pointer", padding:6 }}
              whileTap={{ scale:0.9 }}
            ><Menu size={20}/></motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mob && (
          <motion.div
            style={{ position:"fixed", inset:0, zIndex:50, background:"#111009", display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"center", padding:"0 40px" }}
            initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:40 }}
            transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
          >
            <button onClick={() => setMob(false)}
              style={{ position:"absolute", top:20, right:24, background:"none", border:"none", color:"rgba(232,226,217,0.35)", cursor:"pointer" }}>
              <X size={22}/>
            </button>

            <div className="f-mono" style={{ fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(232,226,217,0.25)", marginBottom:32 }}>
              Navigation
            </div>

            {["Services","Work","Reviews","Contact"].map((l,i) => (
              <motion.a key={l} href={`#${l.toLowerCase()}`}
                onClick={() => setMob(false)}
                className="f-bar"
                style={{ fontSize:48, fontWeight:800, color:"rgba(232,226,217,0.08)", letterSpacing:"-0.01em", lineHeight:1.15 }}
                initial={{ opacity:0, x:-24 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay:i*0.07 }}
                whileHover={{ color:"#E8E2D9" }}
              >{l}</motion.a>
            ))}

            <motion.a href={WA} target="_blank"
              className="btn-glint"
              style={{ marginTop:48, borderRadius:999, padding:"14px 28px", fontSize:13 }}
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.32 }}
            >
              <WASvg size={16}/> WhatsApp a Quote
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null);

  return (
    <section ref={ref} className="hero-grid" style={{ minHeight:"100vh", background:"#111009", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", overflow:"hidden", paddingTop:64 }}>

      {/* Warm amber radial — top left */}
      <div style={{ position:"absolute", top:"-20%", left:"-10%", width:700, height:700, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(180,130,60,0.06) 0%, transparent 65%)", pointerEvents:"none" }}/>

      {/* Green radial — bottom right */}
      <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:600, height:600, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(37,211,102,0.05) 0%, transparent 65%)", pointerEvents:"none" }}/>

      <div className="hero-container">
        <motion.div
          style={{ display:"inline-flex", alignItems:"center", gap:10, border:"1px solid rgba(232,226,217,0.1)", padding:"8px 16px", marginBottom:52 }}
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.2 }}
        >
          <span className="live-dot" style={{ width:7, height:7, borderRadius:"50%", background:"#25d366", boxShadow:"0 0 8px #25d366", flexShrink:0 }}/>
          <span className="f-mono" style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(232,226,217,0.4)" }}>
            Available Now · Ladysmith & Surrounding Areas
          </span>
        </motion.div>

        {/* Headline — direct, no fluff */}
        <div style={{ overflow:"hidden", marginBottom:8 }}>
          <motion.h1 className="f-bar"
            style={{ fontSize:"clamp(52px,8vw,112px)", fontWeight:900, lineHeight:0.92, letterSpacing:"-0.02em", color:"#E8E2D9" }}
            initial={{ y:110, opacity:0 }} animate={{ y:0, opacity:1 }}
            transition={{ duration:0.9, ease:[0.22,1,0.36,1], delay:0.28 }}
          >
            Installed Right.
          </motion.h1>
        </div>
        <div style={{ overflow:"hidden", marginBottom:40 }}>
          <motion.h1 className="f-bar"
            style={{ fontSize:"clamp(52px,8vw,112px)", fontWeight:900, fontStyle:"italic", lineHeight:0.92, letterSpacing:"-0.02em",
              color:"transparent", WebkitTextStroke:"1px rgba(232,226,217,0.2)" }}
            initial={{ y:110, opacity:0 }} animate={{ y:0, opacity:1 }}
            transition={{ duration:0.9, ease:[0.22,1,0.36,1], delay:0.4 }}
          >
            First Time.
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p className="f-int"
          style={{ fontSize:17, fontWeight:300, color:"rgba(232,226,217,0.45)", maxWidth:520, lineHeight:1.75, marginBottom:44 }}
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.55 }}
        >
          Whether you're a homeowner wanting reliable TV and security, or a business needing gates,
          intercoms and cameras — we get it done cleanly, on time, every time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          style={{ display:"flex", flexWrap:"wrap", gap:12 }}
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.7 }}
        >
          <a href={WA} target="_blank" className="btn-glint" style={{ fontSize:13, padding:"15px 28px" }}>
            <WASvg size={16}/> WhatsApp a Quote
          </a>
          <a href="#services" className="btn-glint" style={{ fontSize:13, padding:"15px 28px" }}>
            View Services <ArrowRight size={14}/>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.9, delay:1.0 }}
        >
          {[["11+","Years Active"],["5.0 ★","Google Rating"],["7","Days / Week"],["100%","First-Time Fix Rate"]].map(([n,l],i) => (
            <motion.div key={i} className="hero-stat"
              initial={{ opacity:0, y:12 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.55, delay:1.05 + i*0.1, ease:[0.22,1,0.36,1] }}
            >
              <div className="f-bar" style={{ fontSize:38, fontWeight:900, color:"#E8E2D9", lineHeight:1, letterSpacing:"-0.01em" }}>{n}</div>
              <div className="f-mono" style={{ fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(232,226,217,0.28)", marginTop:7 }}>{l}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── BRAND TICKER ─────────────────────────────────────────────────────────────
const BrandBar = () => {
  const doubled = [...BRANDS,...BRANDS];
  return (
    <div style={{ background:"#0D0C07", borderTop:"1px solid rgba(232,226,217,0.06)", borderBottom:"1px solid rgba(232,226,217,0.06)", padding:"28px 0", overflow:"hidden", position:"relative" }}>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:80, background:"linear-gradient(90deg,#0D0C07,transparent)", zIndex:2, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:80, background:"linear-gradient(-90deg,#0D0C07,transparent)", zIndex:2, pointerEvents:"none" }}/>
      <div className="roll" style={{ gap:56, alignItems:"center" }}>
        {doubled.map((b,i) => (
          <span key={i} className="f-mono" style={{ fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(232,226,217,0.2)", whiteSpace:"nowrap" }}>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const isMobile = useIsMobile();
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.clientWidth + 12;
    el.scrollBy({ left: dir * w, behavior:"smooth" });
  };

  // Track which card is centred
  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / (el.clientWidth + 12));
    setActive(idx);
  };

  return (
    <section id="services" className="section" style={{ background:"#111009" }}>
      <div className="container">
        <motion.div ref={ref}
          style={{ marginBottom:48, paddingBottom:32, borderBottom:"1px solid rgba(232,226,217,0.07)" }}
          initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }}
        >
          <div className="f-mono" style={{ fontSize:10, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(232,226,217,0.25)", marginBottom:16 }}>— What We Do</div>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:20 }}>
            <h2 className="f-bar" style={{ fontSize:"clamp(36px,5vw,64px)", fontWeight:900, letterSpacing:"-0.02em", lineHeight:1, color:"#E8E2D9" }}>Our Services</h2>
            <a href={WA} target="_blank" className="btn-glint">
              <WASvg size={13}/> Get a Free Quote
            </a>
          </div>
        </motion.div>

        {isMobile ? (
          /* ── Mobile carousel ── */
          <div style={{ position:"relative" }}>
            <div
              ref={scrollRef}
              className="carousel-wrap"
              onScroll={onScroll}
            >
              {SERVICES.map((s, i) => (
                <div key={s.n} className="carousel-item svc-card" style={{ width:"82vw", maxWidth:340 }}>
                  <div className="f-bar" style={{ position:"absolute", top:-10, right:20, fontSize:100, fontWeight:900,
                    color:"rgba(232,226,217,0.03)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>{s.n}</div>
                  <div className="f-mono" style={{ fontSize:11, letterSpacing:"0.16em", color:"rgba(232,226,217,0.22)", marginBottom:18 }}>{s.n}</div>
                  <h3 className="f-bar" style={{ fontSize:20, fontWeight:700, color:"#E8E2D9", lineHeight:1.2, marginBottom:12 }}>{s.title}</h3>
                  <p className="f-int" style={{ fontSize:14, fontWeight:300, color:"rgba(232,226,217,0.45)", lineHeight:1.75, marginBottom:22 }}>{s.body}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                    {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <a href={WA} target="_blank" className="btn-glint" style={{ marginTop:20, padding:"10px 18px", fontSize:11, width:"100%", justifyContent:"center" }}>
                    <WASvg size={11}/> Get a Quote
                  </a>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:20 }}>
              {SERVICES.map((_,i) => (
                <div key={i} style={{ width:6, height:6, borderRadius:"50%", transition:"background 0.3s",
                  background: i===active ? "#E8E2D9" : "rgba(232,226,217,0.2)" }}/>
              ))}
            </div>
          </div>
        ) : (
          /* ── Desktop grid — each card flows up from bottom in numbered order ── */
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:3 }}>
            {SERVICES.map((s,i) => (
              <motion.div key={s.n} className="svc-card"
                initial={{ opacity:0, y:56, scale:0.98 }}
                whileInView={{ opacity:1, y:0, scale:1 }}
                viewport={{ once:true, margin:"-40px" }}
                transition={{ duration:0.65, delay:i*0.1, ease:[0.22,1,0.36,1] }}
              >
                <motion.div className="f-bar"
                  style={{ position:"absolute", top:-10, right:20, fontSize:110, fontWeight:900,
                    lineHeight:1, userSelect:"none", pointerEvents:"none" }}
                  initial={{ opacity:0, y:20 }}
                  whileInView={{ opacity:0.035, y:0 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.8, delay:0.1 + i*0.1 }}
                >{s.n}</motion.div>
                <motion.div className="f-mono"
                  style={{ fontSize:11, letterSpacing:"0.16em", color:"rgba(232,226,217,0.22)", marginBottom:18 }}
                  initial={{ opacity:0, x:-8 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.4, delay:0.15 + i*0.1 }}
                >{s.n}</motion.div>
                <h3 className="f-bar" style={{ fontSize:22, fontWeight:700, letterSpacing:"-0.01em", color:"#E8E2D9", lineHeight:1.2, marginBottom:14 }}>{s.title}</h3>
                <p className="f-int" style={{ fontSize:14, fontWeight:300, color:"rgba(232,226,217,0.45)", lineHeight:1.75, marginBottom:24 }}>{s.body}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7, alignItems:"center" }}>
                  {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  <motion.a href={WA} target="_blank" className="btn-glint"
                    style={{ padding:"4px 11px", fontSize:10, letterSpacing:"0.1em", borderRadius:2, marginLeft:4 }}>
                    <WASvg size={10}/> Quote
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ─── BENTO IMAGE — real photo with gradient fallback ─────────────────────────
const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #1a1a0f 0%, #0f1a0a 50%, #0a0f1a 100%)",
  "linear-gradient(160deg, #111009 0%, #0d1a10 60%, #111009 100%)",
  "linear-gradient(120deg, #0f0f0a 0%, #141a0d 55%, #0a0d14 100%)",
  "linear-gradient(150deg, #111009 0%, #0a1410 50%, #111009 100%)",
  "linear-gradient(140deg, #0d0c07 0%, #0f1a0c 60%, #0d0c07 100%)",
  "linear-gradient(130deg, #111009 0%, #0c1a0e 55%, #111009 100%)",
];

const BentoImage = ({ src, alt, index = 0 }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const showFallback = errored || !src;

  return (
    <div style={{ position:"absolute", inset:0 }}>
      {/* Fallback gradient — always rendered behind */}
      <div style={{
        position:"absolute", inset:0,
        background: FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length],
      }}>
        {showFallback && (
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:1, height:"60%", background:"rgba(232,226,217,0.04)" }}/>
          </div>
        )}
      </div>
      {/* Real image */}
      {!errored && src && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{
            position:"absolute", inset:0,
            width:"100%", height:"100%",
            objectFit:"cover",
            opacity: loaded ? 1 : 0,
            transition:"opacity 0.5s ease",
          }}
        />
      )}
    </div>
  );
};

// ─── RECENT WORK (BENTO) ──────────────────────────────────────────────────────
const Work = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="work" className="section" style={{ background:"#0D0C07", borderTop:"1px solid rgba(232,226,217,0.05)" }}>
      <div className="container">
        <motion.div ref={ref}
          style={{ marginBottom:48, paddingBottom:32, borderBottom:"1px solid rgba(232,226,217,0.07)" }}
          initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }}
        >
          <div className="f-mono" style={{ fontSize:10, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(232,226,217,0.25)", marginBottom:16 }}>— Portfolio</div>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:20 }}>
            <h2 className="f-bar" style={{ fontSize:"clamp(36px,5vw,64px)", fontWeight:900, letterSpacing:"-0.02em", lineHeight:1, color:"#E8E2D9" }}>Recent Work</h2>
            <div style={{ textAlign:"right" }}>
              <div className="f-mono" style={{ fontSize:11, color:"rgba(232,226,217,0.35)", letterSpacing:"0.1em" }}>Hikvision CCTV · Residential</div>
              <div className="f-mono" style={{ fontSize:10, color:"rgba(232,226,217,0.18)", letterSpacing:"0.06em", marginTop:4 }}>5-Camera System · Ladysmith</div>
            </div>
          </div>
        </motion.div>

        <div className="bento">
          {BENTO_SLOTS.map((s,i) => (
            <motion.div key={i}
              className={s.cls}
              style={{ background:"#181510", border:"1px solid rgba(232,226,217,0.06)", overflow:"hidden", position:"relative", cursor:"pointer" }}
              initial={{ opacity:0, scale:0.97 }}
              animate={inView?{opacity:1,scale:1}:{}}
              transition={{ duration:0.55, delay:i*0.08 }}
            >
              {/* Image with gradient fallback */}
              <BentoImage src={s.img} alt={s.label} index={i} />

              {/* Hover overlay */}
              <motion.div
                style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end",
                  padding:20, background:"linear-gradient(to top,rgba(17,16,9,0.9) 0%,transparent 55%)", opacity:0 }}
                whileHover={{ opacity:1 }} transition={{ duration:0.2 }}
              >
                <div className="f-bar" style={{ fontSize:16, fontWeight:700, color:"#E8E2D9", letterSpacing:"-0.01em" }}>{s.label}</div>
                <div className="f-mono" style={{ fontSize:10, letterSpacing:"0.12em", color:"rgba(232,226,217,0.45)", marginTop:3 }}>{s.sub}</div>
              </motion.div>

              {/* Corner index */}
              <div className="f-mono" style={{ position:"absolute", top:14, left:14, fontSize:10, letterSpacing:"0.1em", color:"rgba(232,226,217,0.12)" }}>
                {String(i+1).padStart(2,"0")}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
const Reviews = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const isMobile = useIsMobile();
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / (el.clientWidth + 12)));
  };

  const ReviewCard = ({ r }) => (
    <div className="rev-card" style={{ height:"100%" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div style={{ display:"flex", gap:3 }}>
          {[...Array(5)].map((_,j) => <Star key={j} size={13} fill="#f59e0b" style={{ color:"#f59e0b" }}/>)}
        </div>
        <span className="f-mono" style={{ fontSize:10, color:"rgba(232,226,217,0.2)" }}>{r.date}</span>
      </div>
      <p className="f-int" style={{ fontSize:15, fontWeight:300, color:"rgba(232,226,217,0.58)", lineHeight:1.8, fontStyle:"italic", marginBottom:28 }}>
        "{r.text}"
      </p>
      <div style={{ display:"flex", alignItems:"center", gap:12, borderTop:"1px solid rgba(232,226,217,0.06)", paddingTop:20 }}>
        <div style={{ width:36, height:36, background:"#1E1A13", border:"1px solid rgba(232,226,217,0.08)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <span className="f-bar" style={{ fontSize:15, fontWeight:800, color:"rgba(232,226,217,0.4)" }}>{r.name[0]}</span>
        </div>
        <div>
          <div className="f-mono" style={{ fontSize:11, letterSpacing:"0.1em", color:"rgba(232,226,217,0.5)" }}>{r.name}</div>
          <div className="f-mono" style={{ fontSize:10, color:"rgba(232,226,217,0.2)", marginTop:2 }}>Verified · Google</div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="reviews" className="section" style={{ background:"#111009", borderTop:"1px solid rgba(232,226,217,0.05)" }}>
      <div className="container">
        <motion.div ref={ref}
          style={{ marginBottom:56, paddingBottom:32, borderBottom:"1px solid rgba(232,226,217,0.07)" }}
          initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }}
        >
          <div className="f-mono" style={{ fontSize:10, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(232,226,217,0.25)", marginBottom:16 }}>— Client Feedback</div>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
            <h2 className="f-bar" style={{ fontSize:"clamp(36px,5vw,64px)", fontWeight:900, letterSpacing:"-0.02em", lineHeight:1, color:"#E8E2D9" }}>
              What People Say
            </h2>
            <div style={{ border:"1px solid rgba(232,226,217,0.08)", padding:"20px 28px", textAlign:"center", background:"#181510" }}>
              <div className="f-bar" style={{ fontSize:44, fontWeight:900, color:"#E8E2D9", lineHeight:1, letterSpacing:"-0.02em" }}>5.0</div>
              <div style={{ display:"flex", gap:3, justifyContent:"center", margin:"8px 0 6px" }}>
                {[...Array(5)].map((_,i) => <Star key={i} size={12} fill="#f59e0b" style={{ color:"#f59e0b" }}/>)}
              </div>
              <div className="f-mono" style={{ fontSize:10, letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(232,226,217,0.25)" }}>Google · 3 Reviews</div>
            </div>
          </div>
        </motion.div>

        {isMobile ? (
          <div>
            <div ref={scrollRef} className="carousel-wrap" onScroll={onScroll}>
              {REVIEWS.map((r,i) => (
                <div key={i} className="carousel-item" style={{ width:"85vw", maxWidth:340 }}>
                  <ReviewCard r={r}/>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:20 }}>
              {REVIEWS.map((_,i) => (
                <div key={i} style={{ width:6, height:6, borderRadius:"50%", transition:"background 0.3s",
                  background: i===active ? "#E8E2D9" : "rgba(232,226,217,0.2)" }}/>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:3 }}>
            {REVIEWS.map((r,i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:28 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6, delay:i*0.12 }}
              >
                <ReviewCard r={r}/>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};


// ─── CONTACT ──────────────────────────────────────────────────────────────────
const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true });

  const details = [
    { icon:<MapPin size={16}/>, label:"Location", val:"19 Game Centre, Ladysmith" },
    { icon:<Phone size={16}/>,  label:"Phone", val:PHONE, href:`tel:${PHONE_RAW}` },
    { icon:<Clock size={16}/>,  label:"Hours", val:"Mon – Sun · 7 days a week" },
  ];

  return (
    <section id="contact" className="section" style={{ background:"#0D0C07", borderTop:"1px solid rgba(232,226,217,0.05)" }}>
      <div className="container">
        <motion.div ref={ref}
          style={{ marginBottom:64, paddingBottom:32, borderBottom:"1px solid rgba(232,226,217,0.07)" }}
          initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }}
        >
          <div className="f-mono" style={{ fontSize:10, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(232,226,217,0.25)", marginBottom:16 }}>— Get in Touch</div>
          <h2 className="f-bar" style={{ fontSize:"clamp(36px,5vw,64px)", fontWeight:900, letterSpacing:"-0.02em", lineHeight:1, color:"#E8E2D9" }}>
            Ready to Get<br/>
            <span className="f-bar" style={{ fontStyle:"italic", fontWeight:900, color:"rgba(232,226,217,0.25)" }}>It Done?</span>
          </h2>
        </motion.div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:3 }}>

          {/* Left — contact details */}
          <motion.div
            style={{ background:"#181510", border:"1px solid rgba(232,226,217,0.07)", padding:"48px 40px", display:"flex", flexDirection:"column", gap:32 }}
            initial={{ opacity:0, x:-24 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7, delay:0.1 }}
          >
            <p className="f-int" style={{ fontSize:16, fontWeight:300, color:"rgba(232,226,217,0.45)", lineHeight:1.8 }}>
              Message us on WhatsApp for a fast, no-obligation quote. We respond quickly — usually within the hour.
            </p>

            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              {details.map((d,i) => (
                <div key={i} style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                  <div style={{ marginTop:1, color:"rgba(232,226,217,0.3)", flexShrink:0 }}>{d.icon}</div>
                  <div>
                    <div className="f-mono" style={{ fontSize:10, letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(232,226,217,0.25)", marginBottom:4 }}>{d.label}</div>
                    {d.href
                      ? <a href={d.href} className="f-int" style={{ fontSize:16, color:"rgba(232,226,217,0.75)", fontWeight:400 }}>{d.val}</a>
                      : <span className="f-int" style={{ fontSize:16, color:"rgba(232,226,217,0.75)", fontWeight:400 }}>{d.val}</span>
                    }
                  </div>
                </div>
              ))}
              <div style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                <div style={{ marginTop:1, color:"rgba(232,226,217,0.3)", flexShrink:0 }}><CheckCircle size={16}/></div>
                <div>
                  <div className="f-mono" style={{ fontSize:10, letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(232,226,217,0.25)", marginBottom:4 }}>Email</div>
                  <a href={`mailto:${EMAIL}`} className="f-int" style={{ fontSize:15, color:"rgba(232,226,217,0.75)", fontWeight:400 }}>{EMAIL}</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — CTA block */}
          <motion.div
            style={{ background:"#181510", border:"1px solid rgba(232,226,217,0.07)", padding:"48px 40px", display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", overflow:"hidden" }}
            initial={{ opacity:0, x:24 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7, delay:0.2 }}
          >
            {/* Subtle green bloom */}
            <div style={{ position:"absolute", bottom:"-30%", right:"-20%", width:400, height:400, borderRadius:"50%",
              background:"radial-gradient(circle, rgba(37,211,102,0.06) 0%, transparent 65%)", pointerEvents:"none" }}/>

            <div>
              <div className="f-bar" style={{ fontSize:32, fontWeight:900, color:"#E8E2D9", letterSpacing:"-0.02em", lineHeight:1.2, marginBottom:16 }}>
                Fastest way to reach us
              </div>
              <p className="f-int" style={{ fontSize:14, fontWeight:300, color:"rgba(232,226,217,0.4)", lineHeight:1.8 }}>
                Tap below to open WhatsApp. Your message goes straight to us — no voicemail, no hold music.
              </p>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:12, marginTop:40, position:"relative" }}>
              <a href={WA} target="_blank" className="btn-glint-dk" style={{ justifyContent:"center" }}>
                <WASvg size={17}/> WhatsApp a Quote Now
              </a>
              <a href={`tel:${PHONE_RAW}`} className="btn-glint-dk" style={{ justifyContent:"center", fontSize:13 }}>
                <Phone size={15}/> Call {PHONE}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background:"#111009", borderTop:"1px solid rgba(232,226,217,0.06)", padding:"28px 32px" }}>
    <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
      <span className="f-bar" style={{ fontSize:16, fontWeight:800, letterSpacing:"0.04em", color:"rgba(232,226,217,0.3)" }}>
        MG<span style={{ fontWeight:400, marginLeft:6 }}>INSTALLATION</span>
      </span>
      <div className="f-mono" style={{ fontSize:11, letterSpacing:"0.08em", color:"rgba(232,226,217,0.18)", textAlign:"center", lineHeight:2 }}>
        19 Game Centre · mginstallation.com · Available 7 Days
      </div>
      <span className="f-mono" style={{ fontSize:11, letterSpacing:"0.08em", color:"rgba(232,226,217,0.2)" }}>
        © {new Date().getFullYear()} MG Installation
      </span>
    </div>
  </footer>
);

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div>
      <Nav/>
      <Hero/>
      <BrandBar/>
      <Services/>
      <Work/>
      <Reviews/>
      <Contact/>
      <Footer/>
      <FloatWA/>
    </div>
  );
}
