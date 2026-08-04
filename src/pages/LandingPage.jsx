import React, { useEffect, useRef, useState, useCallback } from 'react';
import Interactive3DBook from '../components/Interactive3DBook';
import PdfReaderModal from '../components/PdfReaderModal';
import VideoCourseModal from '../components/VideoCourseModal';
import ChartLightboxModal from '../components/ChartLightboxModal';
import { INITIAL_SAMPLE_MEDIA, SAMPLE_VIP_MEDIA } from '../data/sampleFinanceData';

/* =========================================================
   BLACK SHEEP LIBRARY — PREMIUM LANDING PAGE
   Cinematic Dark Luxury · No external 3D deps needed
   Canvas-based particles + CSS 3D transforms + Framer-style animations
   ========================================================= */

// ─── CANVAS PARTICLE UNIVERSE ──────────────────────────────────────────────
function ParticleUniverse() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const linesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate particles
    const N = 120;
    particlesRef.current = Array.from({ length: N }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      hue: Math.random() > 0.7 ? 45 : Math.random() > 0.4 ? 220 : 170,
      phase: Math.random() * Math.PI * 2,
    }));

    // Candlestick data points for waveform
    const candlePoints = Array.from({ length: 40 }, (_, i) => ({
      x: (i / 39) * canvas.width,
      y: canvas.height * 0.5 + (Math.sin(i * 0.4) * 80 + Math.sin(i * 1.1) * 40),
      vy: (Math.random() - 0.5) * 0.3,
    }));

    let t = 0;

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Background gradient mesh ──
      const grd = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.3, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.8
      );
      grd.addColorStop(0, 'rgba(14,20,40,0)');
      grd.addColorStop(1, 'rgba(5,5,10,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ── Animated financial waveform ──
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1.5;
      candlePoints.forEach((pt, i) => {
        pt.y += pt.vy;
        if (pt.y < canvas.height * 0.2 || pt.y > canvas.height * 0.8) pt.vy *= -1;
        const y = pt.y + Math.sin(t + i * 0.3) * 20;
        i === 0 ? ctx.moveTo(pt.x, y) : ctx.lineTo(pt.x, y);
      });
      ctx.stroke();

      // Second wave — golden
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.08)';
      ctx.lineWidth = 1;
      candlePoints.forEach((pt, i) => {
        const y = pt.y + Math.sin(t * 1.3 + i * 0.5 + 1.5) * 35;
        i === 0 ? ctx.moveTo(pt.x, y) : ctx.lineTo(pt.x, y);
      });
      ctx.stroke();

      // ── Orbiting glow orb (core energy) ──
      const cx = canvas.width * 0.5 + Math.sin(t * 0.3) * 40;
      const cy = canvas.height * 0.42 + Math.cos(t * 0.2) * 25;
      const orb = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180);
      orb.addColorStop(0, 'rgba(56,189,248,0.06)');
      orb.addColorStop(0.5, 'rgba(14,165,233,0.03)');
      orb.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = orb;
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.fill();

      // Golden orb top-right
      const ox2 = canvas.width * 0.75 + Math.cos(t * 0.25) * 30;
      const oy2 = canvas.height * 0.25 + Math.sin(t * 0.35) * 20;
      const orb2 = ctx.createRadialGradient(ox2, oy2, 0, ox2, oy2, 140);
      orb2.addColorStop(0, 'rgba(245,158,11,0.07)');
      orb2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = orb2;
      ctx.beginPath();
      ctx.arc(ox2, oy2, 140, 0, Math.PI * 2);
      ctx.fill();

      // ── Particles ──
      const mouse = mouseRef.current;
      particlesRef.current.forEach(p => {
        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p.vx += (dx / dist) * 0.008;
          p.vy += (dy / dist) * 0.008;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulse = (Math.sin(t * 2 + p.phase) + 1) * 0.3 + 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${p.opacity * pulse})`;
        ctx.fill();
      });

      // ── Connection lines between close particles ──
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            const alpha = (1 - d / 110) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // ── Financial grid ──
      ctx.strokeStyle = 'rgba(255,255,255,0.025)';
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      const offX = (t * 15) % gridSize;
      const offY = (t * 8) % gridSize;
      for (let x = -offX; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = -offY; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.95
      }}
    />
  );
}

// ─── FLOATING 3D GEOMETRIC SHAPES (CSS 3D) ─────────────────────────────────
function FloatingShape({ style, children }) {
  return (
    <div style={{
      position: 'absolute',
      animation: 'floatSpin 12s ease-in-out infinite',
      ...style
    }}>
      {children}
    </div>
  );
}

// ─── MAGNETIC BUTTON ───────────────────────────────────────────────────────
function MagneticButton({ children, primary, onClick, href }) {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.25, y: (e.clientY - cy) * 0.25 });
  };

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPos({ x: 0, y: 0 }); }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        padding: '16px 36px', borderRadius: '100px',
        fontFamily: 'Inter, sans-serif', fontWeight: '700', fontSize: '0.95rem',
        cursor: 'pointer', textDecoration: 'none', position: 'relative', overflow: 'hidden',
        transform: `translate(${pos.x}px, ${pos.y}px) scale(${hovered ? 1.05 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease',
        ...(primary ? {
          background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%)',
          color: '#fff',
          border: 'none',
          boxShadow: hovered
            ? '0 0 60px rgba(99,102,241,0.6), 0 0 30px rgba(14,165,233,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
            : '0 0 30px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
        } : {
          background: 'rgba(255,255,255,0.06)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: hovered ? '0 0 30px rgba(255,255,255,0.08)' : 'none',
          backdropFilter: 'blur(12px)',
        })
      }}
    >
      {/* Ripple shimmer */}
      {primary && (
        <span style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
          transform: hovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 0.6s ease',
        }} />
      )}
      {children}
    </Tag>
  );
}

// ─── INTERSECTION OBSERVER HOOK ────────────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ─── ANIMATED SECTION WRAPPER ──────────────────────────────────────────────
function AnimSection({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0px)' : 'translateY(50px)',
      transition: `opacity 0.9s ease ${delay}s, transform 0.9s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

// ─── GRADIENT TEXT ─────────────────────────────────────────────────────────
function GradientText({ children, gradient = 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)', style = {} }) {
  return (
    <span style={{
      background: gradient,
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      backgroundClip: 'text', ...style
    }}>
      {children}
    </span>
  );
}

// ─── GLASS CARD ────────────────────────────────────────────────────────────
function GlassCard({ children, style = {}, glowColor = 'rgba(99,102,241,0.3)' }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '24px', backdropFilter: 'blur(24px)',
        transform: hovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 30px 80px rgba(0,0,0,0.4), 0 0 40px ${glowColor}` : '0 8px 32px rgba(0,0,0,0.2)',
        transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
        position: 'relative', overflow: 'hidden',
        ...style
      }}
    >
      {/* Glass shine */}
      <div style={{
        position: 'absolute', top: 0, left: '-100%', width: '60%', height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
        transform: hovered ? 'translateX(300%)' : 'translateX(0)',
        transition: 'transform 0.8s ease', pointerEvents: 'none'
      }} />
      {children}
    </div>
  );
}

// ─── STAT COUNTER ──────────────────────────────────────────────────────────
function StatCounter({ value, suffix, label, color = '#0ea5e9' }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  const numVal = parseInt(value.replace(/\D/g, '')) || 0;

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(numVal / 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= numVal) { setCount(numVal); clearInterval(timer); }
      else setCount(start);
    }, 25);
    return () => clearInterval(timer);
  }, [inView, numVal]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900',
        fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em',
        background: `linear-gradient(135deg, ${color}, #fff)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '6px', fontWeight: '500' }}>
        {label}
      </div>
    </div>
  );
}

// ─── NAV BAR ───────────────────────────────────────────────────────────────
function NavBar({ onEnterApp, onOpenAuth }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', s);
    return () => window.removeEventListener('scroll', s);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 5%',
      background: scrolled ? 'rgba(5,5,10,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '72px',
      }}>
        {/* Logo */}
        <div 
          onClick={onEnterApp}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99,102,241,0.4)',
          }}>
            <span style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem' }}>B</span>
          </div>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontWeight: '800', fontSize: '1.05rem',
            color: '#fff', letterSpacing: '-0.02em'
          }}>
            Black Sheep Library
          </span>
        </div>

        {/* Navigation Links */}
        <div className="desktop-nav-links" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {[
            { label: 'Trang Chủ', target: 'hero' },
            { label: 'Biểu Đồ XAUUSD', target: '3d-book' },
            { label: 'Danh Mục', target: 'categories' },
            { label: 'Cấu Trúc', target: 'roadmap' },
            { label: 'Nổi Bật', target: 'featured' },
          ].map(link => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              style={{
                background: 'none', border: 'none', color: '#94a3b8',
                fontSize: '0.88rem', fontWeight: '500', fontFamily: 'Inter, sans-serif',
                cursor: 'pointer', transition: 'color 0.2s ease', padding: 0
              }}
              onMouseOver={e => e.target.style.color = '#38bdf8'}
              onMouseOut={e => e.target.style.color = '#94a3b8'}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA Buttons: Đăng nhập & Đăng ký */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => onOpenAuth ? onOpenAuth('login') : onEnterApp()}
            style={{
              padding: '9px 22px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#f8fafc',
              fontSize: '0.88rem',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = '#38bdf8';
              e.currentTarget.style.background = 'rgba(56, 189, 248, 0.12)';
              e.currentTarget.style.color = '#38bdf8';
              e.currentTarget.style.boxShadow = '0 0 16px rgba(56, 189, 248, 0.25)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = '#f8fafc';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Đăng nhập
          </button>

          <MagneticButton primary onClick={() => onOpenAuth ? onOpenAuth('register') : onEnterApp()}>
            <span>Đăng ký</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO SECTION ──────────────────────────────────────────────────────────
function HeroSection({ onEnterApp }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typed, setTyped] = useState('');
  const fullText = 'Kho Tư Liệu Tài Chính Chuyên Sâu';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTyped(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 45);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const h = (e) => setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', zIndex: 1,
      padding: '120px 0 80px',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Floating geometric decorations */}
      <div style={{
        position: 'absolute', top: '15%', left: '8%',
        width: '160px', height: '160px',
        borderRadius: '30px',
        background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(99,102,241,0.04))',
        border: '1px solid rgba(14,165,233,0.15)',
        transform: `rotate(${15 + mousePos.x * 0.2}deg) translateY(${mousePos.y * 0.3}px)`,
        transition: 'transform 0.8s cubic-bezier(0.23,1,0.32,1)',
        animation: 'floatY 8s ease-in-out infinite',
        backdropFilter: 'blur(8px)',
      }} />
      <div style={{
        position: 'absolute', top: '20%', right: '7%',
        width: '100px', height: '100px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(239,68,68,0.05))',
        border: '1px solid rgba(245,158,11,0.2)',
        transform: `rotate(${-20 + mousePos.x * 0.15}deg) translateY(${-mousePos.y * 0.2}px)`,
        transition: 'transform 0.8s cubic-bezier(0.23,1,0.32,1)',
        animation: 'floatY 6s ease-in-out infinite 1s',
        backdropFilter: 'blur(8px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '25%', left: '12%',
        width: '60px', height: '60px',
        border: '1px solid rgba(16,185,129,0.25)',
        transform: `rotate(${45 + mousePos.x * 0.3}deg)`,
        transition: 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
        animation: 'floatY 10s ease-in-out infinite 2s',
      }} />
      <div style={{
        position: 'absolute', bottom: '30%', right: '10%',
        width: '80px', height: '80px',
        borderRadius: '50%',
        border: '1px solid rgba(139,92,246,0.2)',
        transform: `translateY(${mousePos.y * 0.4}px)`,
        transition: 'transform 0.7s cubic-bezier(0.23,1,0.32,1)',
        animation: 'floatY 7s ease-in-out infinite 0.5s',
      }} />

      {/* Content — centered text zone */}
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)',
          borderRadius: '100px', padding: '6px 18px', marginBottom: '40px',
          animation: 'fadeSlideUp 0.8s ease forwards', opacity: 0,
          animationDelay: '0.3s',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0ea5e9', boxShadow: '0 0 8px #0ea5e9' }} />
          <span style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>
            Thư viện tài liệu tài chính — Dành cho Trader chuyên nghiệp
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: '900', lineHeight: 1.08, letterSpacing: '-0.04em',
          fontFamily: 'Inter, sans-serif', color: '#fff',
          marginBottom: '28px',
          animation: 'fadeSlideUp 1s ease forwards', opacity: 0, animationDelay: '0.5s',
        }}>
          <GradientText gradient="linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #94a3b8 100%)">
            {typed}
          </GradientText>
          <span style={{ borderRight: '3px solid #0ea5e9', marginLeft: '2px', animation: 'blink 1s step-end infinite' }} />
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: '#64748b', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 52px',
          fontFamily: 'Inter, sans-serif', fontWeight: '400',
          animation: 'fadeSlideUp 1s ease forwards', opacity: 0, animationDelay: '0.8s',
        }}>
          Tập hợp hàng nghìn tài liệu phân tích thị trường, báo cáo kỹ thuật & ebook chuyên sâu — duyệt tự do, không giới hạn.
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fadeSlideUp 1s ease forwards', opacity: 0, animationDelay: '1.1s',
        }}>
          <MagneticButton primary onClick={onEnterApp}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Khám Phá Thư Viện
          </MagneticButton>
        </div>
      </div>

      {/* XAUUSD Chart — full-bleed, outside 900px container */}
      <div id="3d-book" style={{
        width: '100%',
        marginTop: '48px',
        animation: 'fadeSlideUp 1s ease forwards', opacity: 0, animationDelay: '1.2s',
        position: 'relative', zIndex: 2,
      }}>
        <Interactive3DBook onEnterApp={onEnterApp} />
      </div>



      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        animation: 'fadeSlideUp 1s ease forwards 1.8s, scrollBounce 2s ease-in-out infinite 2s',
        opacity: 0,
      }}>
        <span style={{ color: '#475569', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}>
          SCROLL
        </span>
        <div style={{
          width: '20px', height: '32px', borderRadius: '10px',
          border: '1.5px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '4px',
        }}>
          <div style={{
            width: '3px', height: '8px', borderRadius: '2px',
            background: '#0ea5e9', animation: 'scrollDot 1.5s ease-in-out infinite'
          }} />
        </div>
      </div>
    </section>
  );
}

// ─── STATS SECTION ─────────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section style={{ padding: '100px 5%', position: 'relative', zIndex: 1 }}>
      <div style={{
        maxWidth: '1000px', margin: '0 auto',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '32px', padding: '60px 5%',
        backdropFilter: 'blur(24px)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '40px',
      }}>
        <StatCounter value="2400" suffix="+" label="Độc Giả & Trader" color="#0ea5e9" />
        <StatCounter value="180" suffix="+" label="Tài Liệu Chuyên Sâu" color="#6366f1" />
        <StatCounter value="50" suffix="+" label="Báo Cáo & Recap" color="#f59e0b" />
        <StatCounter value="98" suffix="%" label="Đánh Giá Tích Cực" color="#10b981" />
      </div>
    </section>
  );
}

// ─── CATEGORIES SECTION ────────────────────────────────────────────────────
const CATEGORIES = [
  { icon: '📈', title: 'Price Action & SMC', desc: 'Order Block, Liquidity Sweep, Wyckoff Structure & tài liệu phân tích cấu trúc thị trường', color: '#0ea5e9', glow: 'rgba(14,165,233,0.3)' },
  { icon: '📊', title: 'Phân Tích Vĩ Mô', desc: 'Dòng tiền Fed, lãi suất, chu kỳ vàng và báo cáo tác động đến thị trường crypto & forex', color: '#6366f1', glow: 'rgba(99,102,241,0.3)' },
  { icon: '📚', title: 'Ebook & Sách Chuyên Ngành', desc: 'Bộ Ebook chuyên sâu về quản lý lệnh, tâm lý giao dịch và hệ thống phân tích kỹ thuật', color: '#f59e0b', glow: 'rgba(245,158,11,0.3)' },
  { icon: '📸', title: 'Trading Recap', desc: 'Phân tích biểu đồ chi tiết, soi dòng tiền BTC/XAUUSD và tài liệu tổng hợp recap thị trường', color: '#10b981', glow: 'rgba(16,185,129,0.3)' },
  { icon: '📑', title: 'Tài Liệu Chuyên Đề', desc: 'Bộ tài liệu tham khảo hệ thống giao dịch, quản lý rủi ro bài bản cho trader chuyên nghiệp', color: '#8b5cf6', glow: 'rgba(139,92,246,0.3)' },
  { icon: '📊', title: 'Case Study Biểu Đồ', desc: '50+ hồ sơ phân tích tình huống thực tế giúp nghiên cứu cấu trúc xu hướng và vị trí cắt lỗ', color: '#ef4444', glow: 'rgba(239,68,68,0.3)' },
];

function CategoriesSection() {
  return (
    <section id="categories" style={{ padding: '100px 5%', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <AnimSection style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: '16px' }}>
            DANH MỤC KIẾN THỨC
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '900', color: '#fff', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif', lineHeight: 1.1 }}>
            Toàn Bộ Kiến Thức Bạn Cần<br />
            <GradientText gradient="linear-gradient(135deg, #6366f1, #0ea5e9, #10b981)">
              Để Làm Chủ Thị Trường
            </GradientText>
          </h2>
        </AnimSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
          {CATEGORIES.map((cat, i) => (
            <AnimSection key={cat.title} delay={i * 0.08}>
              <GlassCard glowColor={cat.glow} style={{ padding: '32px', height: '100%' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '16px',
                  background: `${cat.color}18`, border: `1px solid ${cat.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', marginBottom: '20px',
                }}>
                  {cat.icon}
                </div>
                <h3 style={{ color: '#fff', fontWeight: '700', fontSize: '1.05rem', fontFamily: 'Inter, sans-serif', marginBottom: '10px' }}>
                  {cat.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
                  {cat.desc}
                </p>
                <div 
                  style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: cat.color, fontSize: '0.82rem', fontWeight: '600', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}
                >
                  Khám phá
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </GlassCard>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ROADMAP SECTION ───────────────────────────────────────────────────────
const ROADMAP = [
  { step: '01', title: 'Nền Tảng', desc: 'Tài liệu Price Action cơ bản, cấu trúc thị trường & nguyên lý quản lý vốn', color: '#0ea5e9' },
  { step: '02', title: 'Phân Tích', desc: 'Tài liệu SMC, Order Block, Liquidity & các mô hình kỹ thuật nâng cao', color: '#6366f1' },
  { step: '03', title: 'Chiến Lược', desc: 'Báo cáo tổng hợp hệ thống giao dịch & phương pháp quản trị danh mục', color: '#8b5cf6' },
  { step: '04', title: 'Chuyên Sâu', desc: 'Tài liệu phân tích chuyên sâu về quản lý rủi ro và tâm lý giao dịch thực tế', color: '#10b981' },
];

function RoadmapSection() {
  return (
    <section id="roadmap" style={{ padding: '100px 5%', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <AnimSection style={{ textAlign: 'center', marginBottom: '72px' }}>
          <p style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: '16px' }}>
            CẤU TRÚC THƯ VIỆN
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', color: '#fff', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif' }}>
            Phân Loại Tài Liệu <GradientText gradient="linear-gradient(135deg, #10b981, #0ea5e9)">Theo Cấp Độ & Chuyên Đề</GradientText>
          </h2>
        </AnimSection>

        <div style={{ position: 'relative' }}>
          {/* Connection line */}
          <div style={{
            position: 'absolute', top: '40px', left: '10%', right: '10%', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {ROADMAP.map((step, i) => (
              <AnimSection key={step.step} delay={i * 0.12}>
                <div style={{ textAlign: 'center', padding: '40px 24px' }}>
                  {/* Step circle */}
                  <div style={{
                    width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto 24px',
                    background: `linear-gradient(135deg, ${step.color}22, ${step.color}08)`,
                    border: `1.5px solid ${step.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 30px ${step.color}22`,
                  }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '900', fontSize: '1.1rem', color: step.color }}>
                      {step.step}
                    </span>
                  </div>
                  <h3 style={{ color: '#fff', fontWeight: '700', fontSize: '1.05rem', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.87rem', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                    {step.desc}
                  </p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURED ARTICLES ─────────────────────────────────────────────────────
const ARTICLES = [
  { title: 'Hướng Dẫn Tra Cứu Price Action & Cấu Trúc Thị Trường', type: 'PDF', market: 'CRYPTO', reads: '1,240', color: '#0ea5e9' },
  { title: 'Báo Cáo Phân Tích Vĩ Mô & Chu Kỳ Kinh Tế Q3/2026', type: 'PDF', market: 'MACRO', reads: '890', color: '#6366f1' },
  { title: 'Tài Liệu Thực Chiến Quản Lý Lệnh HFT & Order Block', type: 'PDF', market: 'CRYPTO', reads: '1,890', color: '#f59e0b' },
];

function FeaturedSection({ onEnterApp }) {
  return (
    <section id="featured" style={{ padding: '100px 5%', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <AnimSection style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ color: '#f59e0b', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: '10px' }}>
              TÀI LIỆU NỔI BẬT
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '900', color: '#fff', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif' }}>
              Được Đọc Nhiều Nhất
            </h2>
          </div>
          <MagneticButton onClick={onEnterApp}>Xem Tất Cả</MagneticButton>
        </AnimSection>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {ARTICLES.map((art, i) => (
            <AnimSection key={art.title} delay={i * 0.1}>
              <GlassCard glowColor={`${art.color}25`} style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                    background: `${art.color}18`, border: `1px solid ${art.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {art.type === 'VIDEO'
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill={art.color}><polygon points="5,3 19,12 5,21" /></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={art.color} strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    }
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: '#e2e8f0', fontWeight: '600', fontSize: '0.97rem', fontFamily: 'Inter, sans-serif', marginBottom: '6px', lineHeight: 1.4 }}>
                      {art.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ background: `${art.color}18`, color: art.color, borderRadius: '6px', padding: '2px 10px', fontSize: '0.72rem', fontWeight: '700', fontFamily: 'Inter, sans-serif' }}>
                        {art.type}
                      </span>
                      <span style={{ color: '#475569', fontSize: '0.78rem', fontFamily: 'Inter, sans-serif' }}>{art.market}</span>
                      <span style={{ color: '#475569', fontSize: '0.78rem', fontFamily: 'Inter, sans-serif' }}>👁 {art.reads} lượt đọc</span>
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </GlassCard>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION WITH DEMO SHOWCASE GRID OF UPLOADED DOCUMENTS ──────────────
function CTASection({ onEnterApp, onOpenAuth }) {
  const demoItems = [...INITIAL_SAMPLE_MEDIA, ...SAMPLE_VIP_MEDIA].slice(0, 6);

  const handleCardClick = () => {
    if (onOpenAuth) {
      onOpenAuth('login');
    } else {
      onEnterApp();
    }
  };

  return (
    <section style={{ padding: '100px 5%', position: 'relative', zIndex: 1 }}>
      <AnimSection>
        <div style={{
          maxWidth: '1150px', margin: '0 auto', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(14,165,233,0.06) 0%, rgba(99,102,241,0.08) 50%, rgba(139,92,246,0.06) 100%)',
          border: '1px solid rgba(99,102,241,0.25)', borderRadius: '40px',
          padding: '60px 4%', backdropFilter: 'blur(24px)',
          boxShadow: '0 0 80px rgba(99,102,241,0.1)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Glow orbs inside CTA */}
          <div style={{ position: 'absolute', top: '-80px', left: '20%', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.15), transparent)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-80px', right: '15%', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative' }}>
            <p style={{ color: '#6366f1', fontSize: '0.82rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: '14px' }}>
              DEMO KHO TÀI LIỆU ĐÃ ĐĂNG TẢI
            </p>
            
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '900', color: '#fff', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif', lineHeight: 1.15, marginBottom: '16px' }}>
              Sẵn Sàng Làm Chủ<br />
              <GradientText gradient="linear-gradient(135deg, #0ea5e9, #6366f1, #8b5cf6)">
                Thị Trường Tài Chính?
              </GradientText>
            </h2>

            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6, fontFamily: 'Inter, sans-serif', marginBottom: '36px', maxWidth: '620px', margin: '0 auto 36px' }}>
              Dưới đây là danh sách các tài liệu PDF, bài giảng video và recap phân tích thị trường thực tế đã đăng tải. Đăng nhập hoặc tham gia hệ thống để xem nội dung đầy đủ!
            </p>

            {/* DEMO SHOWCASE CARDS GRID */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '20px', 
              marginBottom: '44px',
              textAlign: 'left'
            }}>
              {demoItems.map((item) => {
                const isPdf = item.type === 'pdf';
                const isVid = item.type === 'video';

                return (
                  <div
                    key={item.id}
                    onClick={handleCardClick}
                    style={{
                      background: 'rgba(11, 14, 23, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.borderColor = item.isVip ? '#f59e0b' : '#38bdf8';
                      e.currentTarget.style.boxShadow = item.isVip ? '0 12px 35px rgba(245, 158, 11, 0.25)' : '0 12px 35px rgba(56, 189, 248, 0.25)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.4)';
                    }}
                  >
                    {/* Thumbnail Container */}
                    <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11, 14, 23, 0.95) 0%, transparent 60%)' }} />

                      {/* Top Badges */}
                      <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          background: isPdf ? 'rgba(56, 189, 248, 0.25)' : isVid ? 'rgba(168, 85, 247, 0.25)' : 'rgba(16, 185, 129, 0.25)',
                          color: isPdf ? '#38bdf8' : isVid ? '#a855f7' : '#10b981',
                          border: `1px solid ${isPdf ? 'rgba(56, 189, 248, 0.4)' : isVid ? 'rgba(168, 85, 247, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
                          fontWeight: '800',
                          fontSize: '0.7rem',
                          padding: '2px 8px',
                          borderRadius: '6px'
                        }}>
                          {isPdf ? 'PDF EBOOK' : isVid ? 'VIDEO LESSON' : 'RECAP BIỂU ĐỒ'}
                        </span>

                        {item.isVip && (
                          <span style={{ background: '#f59e0b', color: '#000000', fontWeight: '900', fontSize: '0.68rem', padding: '2px 8px', borderRadius: '12px' }}>
                            VIP ONLY
                          </span>
                        )}
                      </div>

                      {/* Upload Date & Pages */}
                      <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '0.73rem', color: '#CBD5E1', fontFamily: 'Inter, sans-serif' }}>
                        <span>📅 {item.uploadDate || '2026-08-02'}</span>
                        <span>{isPdf ? `${item.pageCount || 42} Trang` : isVid ? `${item.fileSize}` : item.market}</span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#F8FAFC', marginBottom: '6px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.title}
                        </h4>
                        <p style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.4, marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.description}
                        </p>
                      </div>

                      {/* Require Login Button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
                        style={{
                          width: '100%',
                          padding: '9px',
                          borderRadius: '100px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
                          color: '#FFFFFF',
                          fontWeight: '800',
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        <span>🔒 Đăng Nhập / Vào Thư Viện Để Đọc</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* MAIN CTA CALLOUT BUTTON */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagneticButton primary onClick={handleCardClick}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                Vào Thư Viện Đầy Đủ Ngay
              </MagneticButton>
            </div>
          </div>
        </div>
      </AnimSection>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: '60px 5% 40px', position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: '900', fontSize: '1rem' }}>B</span>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: '700', fontSize: '0.92rem', fontFamily: 'Inter, sans-serif' }}>Black Sheep Library</div>
            <div style={{ color: '#475569', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>Nền tảng kiến thức tài chính • Không kêu gọi đầu tư</div>
          </div>
        </div>
        <div style={{ color: '#334155', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
          © 2026 Black Sheep Library. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── GLOBAL CSS KEYFRAMES ──────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body { 
    background: #050510; 
    color: #fff; 
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #050510; }
  ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.5); border-radius: 2px; }

  @media (max-width: 768px) {
    .desktop-nav-links {
      display: none !important;
    }
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes floatY {
    0%, 100% { transform: translateY(0px) rotate(var(--r, 15deg)); }
    50% { transform: translateY(-20px) rotate(var(--r, 15deg)); }
  }

  @keyframes floatSpin {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes scrollDot {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(14px); opacity: 0; }
  }

  @keyframes scrollBounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
`;

// ─── AUTH MODAL ─────────────────────────────────────────────────────────────
function AuthModal({ isOpen, onClose, initialMode = 'login', onEnterApp }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnterApp();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(5, 5, 12, 0.85)',
      backdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      <div style={{
        width: '100%', maxWidth: '440px',
        background: 'linear-gradient(145deg, rgba(20, 20, 35, 0.95), rgba(10, 10, 25, 0.98))',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(99, 102, 241, 0.25)',
        position: 'relative',
      }} onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '20px', right: '20px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: 'none', color: '#94a3b8', borderRadius: '50%',
          width: '32px', height: '32px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', transition: 'all 0.2s'
        }}
          onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
          onMouseOut={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}>
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '12px', boxShadow: '0 0 20px rgba(99,102,241,0.4)'
          }}>
            <span style={{ color: '#fff', fontWeight: '900', fontSize: '1.4rem' }}>B</span>
          </div>
          <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: '800', margin: '0 0 6px 0', fontFamily: 'Inter, sans-serif' }}>
            {mode === 'login' ? 'Chào Mừng Trở Lại' : 'Tạo Tài Khoản Mới'}
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, fontFamily: 'Inter, sans-serif' }}>
            {mode === 'login' ? 'Đăng nhập để tiếp tục truy cập thư viện kiến thức' : 'Trở thành thành viên Black Sheep Library ngay hôm nay'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div style={{
          display: 'flex', background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '12px', padding: '4px', marginBottom: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <button onClick={() => setMode('login')} style={{
            flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
            background: mode === 'login' ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' : 'transparent',
            color: mode === 'login' ? '#fff' : '#94a3b8', fontWeight: '600',
            fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.2s ease',
            fontFamily: 'Inter, sans-serif'
          }}>
            Đăng nhập
          </button>
          <button onClick={() => setMode('register')} style={{
            flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
            background: mode === 'register' ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' : 'transparent',
            color: mode === 'register' ? '#fff' : '#94a3b8', fontWeight: '600',
            fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.2s ease',
            fontFamily: 'Inter, sans-serif'
          }}>
            Đăng ký
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mode === 'register' && (
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.82rem', marginBottom: '6px', fontWeight: '500', fontFamily: 'Inter, sans-serif' }}>Họ và tên</label>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.82rem', marginBottom: '6px', fontWeight: '500', fontFamily: 'Inter, sans-serif' }}>Email / Tên đăng nhập</label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.82rem', marginBottom: '6px', fontWeight: '500', fontFamily: 'Inter, sans-serif' }}>Mật khẩu</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button type="submit" style={{
            width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
            color: '#fff', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
            boxShadow: '0 0 20px rgba(99,102,241,0.4)', marginTop: '8px',
            fontFamily: 'Inter, sans-serif', transition: 'all 0.2s'
          }}>
            {mode === 'login' ? 'Đăng Nhập Ngay' : 'Tạo Tài Khoản Ngay'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button onClick={onEnterApp} style={{
            background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.82rem',
            cursor: 'pointer', fontFamily: 'Inter, sans-serif', textDecoration: 'underline'
          }}>
            Hoặc truy cập trực tiếp vào Thư Viện (Bỏ qua đăng nhập) →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN LANDING PAGE ─────────────────────────────────────────────────────
export default function LandingPage({ onEnterApp }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      <style>{globalStyles}</style>

      <div style={{ position: 'relative', minHeight: '100vh', background: '#050510' }}>
        {/* Canvas Particle Universe */}
        <ParticleUniverse />

        {/* Background gradient overlays */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 100%)',
        }} />
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 40% 40% at 80% 80%, rgba(14,165,233,0.05) 0%, transparent 100%)',
        }} />

        {/* Nav */}
        <NavBar onEnterApp={onEnterApp} onOpenAuth={handleOpenAuth} />

        {/* Page Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <HeroSection onEnterApp={onEnterApp} />
          <StatsSection />
          <CategoriesSection />
          <RoadmapSection />
          <FeaturedSection onEnterApp={onEnterApp} />
          <CTASection onEnterApp={onEnterApp} />
          <Footer />
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authMode}
          onEnterApp={onEnterApp}
        />
      </div>
    </>
  );
}
