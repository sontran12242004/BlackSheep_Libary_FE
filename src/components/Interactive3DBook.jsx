import React, { useEffect, useRef } from 'react';

/**
 * XAUUSDChart — Real-time XAUUSD 1-minute full-screen chart
 * Powered by TradingView Advanced Chart Widget
 */
export default function XAUUSDChart() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = '100%';
    widgetDiv.style.width  = '100%';
    container.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize:            true,
      symbol:              'OANDA:XAUUSD',
      interval:            '1',
      timezone:            'Asia/Ho_Chi_Minh',
      theme:               'dark',
      style:               '1',
      locale:              'vi_VN',
      backgroundColor:     'rgba(5, 5, 20, 0)',
      gridColor:           'rgba(99, 102, 241, 0.06)',
      allow_symbol_change: false,
      hide_side_toolbar:   false,
      hide_legend:         false,
      save_image:          false,
      calendar:            false,
      hide_volume:         false,
      withdateranges:      true,
      support_host:        'https://www.tradingview.com',
      studies: [
        'MASimple@tv-basicstudies',
      ],
      overrides: {
        'mainSeriesProperties.candleStyle.upColor':         '#22c55e',
        'mainSeriesProperties.candleStyle.downColor':       '#ef4444',
        'mainSeriesProperties.candleStyle.borderUpColor':   '#22c55e',
        'mainSeriesProperties.candleStyle.borderDownColor': '#ef4444',
        'mainSeriesProperties.candleStyle.wickUpColor':     '#22c55e',
        'mainSeriesProperties.candleStyle.wickDownColor':   '#ef4444',
        'paneProperties.background':                        '#05050f',
        'paneProperties.backgroundGradientStartColor':      '#05050f',
        'paneProperties.backgroundGradientEndColor':        '#08081a',
        'paneProperties.vertGridProperties.color':          'rgba(99,102,241,0.07)',
        'paneProperties.horzGridProperties.color':          'rgba(99,102,241,0.07)',
        'scalesProperties.textColor':                       '#64748b',
        'scalesProperties.fontSize':                        13,
      },
    });
    container.appendChild(script);

    return () => { container.innerHTML = ''; };
  }, []);

  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      position: 'relative',
      boxSizing: 'border-box',
    }}>

      {/* ── Top glow line ────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px', zIndex: 2,
        background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.6) 30%, rgba(139,92,246,0.6) 50%, rgba(99,102,241,0.6) 70%, transparent 100%)',
      }} />

      {/* ── Header bar ───────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 28px',
        background: 'rgba(5, 5, 18, 0.96)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99,102,241,0.15)',
        position: 'relative', zIndex: 2,
      }}>
        {/* Left: symbol info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '9px', height: '9px', borderRadius: '50%',
            background: '#22c55e', boxShadow: '0 0 10px #22c55e',
            animation: 'pulseDot 1.5s ease-in-out infinite', flexShrink: 0,
          }} />
          <span style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 800,
            fontSize: '1.15rem', color: '#f8fafc', letterSpacing: '0.06em',
          }}>XAU / USD</span>
          <span style={{
            padding: '3px 9px',
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '6px', fontSize: '0.72rem', color: '#818cf8',
            fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '0.08em',
          }}>M1</span>
          <span style={{
            padding: '3px 9px',
            background: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: '6px', fontSize: '0.72rem', color: '#4ade80',
            fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '0.08em',
          }}>● LIVE</span>
          <span style={{
            padding: '3px 9px',
            background: 'rgba(234,179,8,0.08)',
            border: '1px solid rgba(234,179,8,0.3)',
            borderRadius: '6px', fontSize: '0.72rem', color: '#fbbf24',
            fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '0.06em',
          }}>GOLD</span>
        </div>

        {/* Right: meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#818cf8' }} />
            <span style={{ fontSize: '0.72rem', color: '#475569', fontFamily: 'Inter, sans-serif' }}>
              MA · RSI · MACD
            </span>
          </div>
          <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontSize: '0.72rem', color: '#334155', fontFamily: 'Inter, sans-serif' }}>
            Powered by TradingView
          </span>
        </div>
      </div>

      {/* ── Chart ────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="tradingview-widget-container"
        style={{
          aspectRatio: '16 / 9',
          width: '100%',
          background: '#05050f',
          position: 'relative',
        }}
      />

      {/* ── Bottom glow ──────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', zIndex: 2,
        background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.5) 30%, rgba(139,92,246,0.5) 50%, rgba(99,102,241,0.5) 70%, transparent 100%)',
      }} />

      {/* ── Side glows ───────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, width: '3px', zIndex: 2,
        background: 'linear-gradient(180deg, rgba(99,102,241,0.5), rgba(139,92,246,0.3), transparent)',
      }} />
      <div style={{
        position: 'absolute', top: 0, bottom: 0, right: 0, width: '3px', zIndex: 2,
        background: 'linear-gradient(180deg, rgba(99,102,241,0.5), rgba(139,92,246,0.3), transparent)',
      }} />

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.6); }
        }
      `}</style>
    </div>
  );
}
