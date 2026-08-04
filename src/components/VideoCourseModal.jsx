import React, { useRef, useState } from 'react';
import { X, Volume2, Volume1, VolumeX, Maximize, Video } from 'lucide-react';

export default function VideoCourseModal({ item, onClose }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  if (!item) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (nextMuted) {
        setVolume(0);
      } else {
        setVolume(videoRef.current.volume || 0.8);
      }
    }
  };

  const toggleFullscreen = () => {
    const elem = containerRef.current || videoRef.current;
    if (!elem) return;

    const isFull = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
    if (!isFull) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (videoRef.current && videoRef.current.webkitEnterFullscreen) {
        videoRef.current.webkitEnterFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (timeInSec) => {
    if (!timeInSec || isNaN(timeInSec)) return '00:00';
    const mins = Math.floor(timeInSec / 60);
    const secs = Math.floor(timeInSec % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '980px', 
          display: 'flex', 
          flexDirection: 'column',
          background: '#0B0E14',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}
      >
        
        {/* Video Header */}
        <div style={{ padding: '14px 24px', background: '#0D111A', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(245,158,11,0.3)' }}>
              <Video size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#F8FAFC' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B' }}>
                {item.author || 'Master Trader'} • {item.market || 'CRYPTO'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={onClose} className="btn btn-ghost" style={{ padding: '8px', color: '#94A3B8' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Video Container */}
        <div ref={containerRef} style={{ position: 'relative', width: '100%', background: '#000000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <video
            ref={videoRef}
            src={item.fileUrl}
            poster={item.thumbnail}
            controlsList="nodownload"
            style={{ width: '100%', maxHeight: '540px', outline: 'none', objectFit: 'contain' }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            onClick={togglePlay}
          />
        </div>

        {/* Custom Video Controls Toolbar */}
        <div style={{ padding: '14px 24px', background: '#0D111A', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Progress Seek Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'var(--font-mono)', minWidth: '42px' }}>
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              style={{
                flex: 1,
                accentColor: '#f59e0b',
                height: '5px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            />
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: 'var(--font-mono)', minWidth: '42px' }}>
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls Bar: Volume & Fullscreen */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            
            {/* Left: Volume Slider Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={toggleMute} style={{ background: 'none', border: 'none', color: isMuted ? '#ef4444' : '#F8FAFC', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {isMuted || volume === 0 ? <VolumeX size={18} /> : volume < 0.5 ? <Volume1 size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                style={{
                  width: '90px',
                  accentColor: '#f59e0b',
                  height: '4px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                }}
                title={`Âm lượng: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
              />
              <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontFamily: 'var(--font-mono)', minWidth: '32px' }}>
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>

            {/* Right: Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="btn btn-secondary"
              style={{
                padding: '8px 14px',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#F8FAFC',
                cursor: 'pointer',
              }}
              title="Toàn màn hình"
            >
              <Maximize size={16} /> Toàn Màn Hình
            </button>

          </div>

        </div>

        {/* Video Description Section */}
        <div style={{ padding: '20px 24px 24px', background: '#0D111A', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1rem' }}>📌</span>
            <h4 style={{ fontSize: '0.86rem', fontWeight: '800', color: '#F8FAFC', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Mô Tả & Ghi Chú Phân Tích
            </h4>
          </div>
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#CBD5E1', 
            lineHeight: 1.7, 
            background: 'rgba(255,255,255,0.03)', 
            padding: '16px 20px', 
            borderRadius: '10px', 
            border: '1px solid rgba(255,255,255,0.07)',
            margin: 0,
            whiteSpace: 'pre-wrap'
          }}>
            {item.description || item.desc || 'Tài liệu video phân tích thị trường chuyên sâu.'}
          </p>
        </div>

      </div>
    </div>
  );
}

