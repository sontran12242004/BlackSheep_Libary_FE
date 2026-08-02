import React, { useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Download, Video, FastForward, Clock } from 'lucide-react';

export default function VideoCourseModal({ item, onClose }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '960px', 
          display: 'flex', 
          flexDirection: 'column',
          background: '#0B0E14',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          overflow: 'hidden'
        }}
      >
        
        {/* Video Header */}
        <div style={{ padding: '14px 24px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Video size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {item.author || 'Master Trader'} • {item.market || 'CRYPTO'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {item.fileUrl && (
              <a href={item.fileUrl} download={item.title} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
                <Download size={15} /> Tải Video
              </a>
            )}
            <button onClick={onClose} className="btn btn-ghost" style={{ padding: '8px' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div style={{ position: 'relative', width: '100%', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <video
            ref={videoRef}
            src={item.fileUrl}
            poster={item.thumbnail}
            controls
            style={{ width: '100%', maxHeight: '520px', outline: 'none' }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>

        {/* Video Controls Bar & Description */}
        <div style={{ padding: '20px 24px', background: 'var(--bg-surface)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
            
            {/* Speed Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FastForward size={14} /> Tốc độ phát:
              </span>
              {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => handleSpeedChange(spd)}
                  style={{
                    background: playbackSpeed === spd ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)',
                    color: playbackSpeed === spd ? '#FBBF24' : 'var(--text-secondary)',
                    border: playbackSpeed === spd ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-color)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Tags */}
            {item.tags && (
              <div style={{ display: 'flex', gap: '6px' }}>
                {item.tags.map((t, idx) => (
                  <span key={idx} className="badge badge-video" style={{ fontSize: '0.7rem' }}>
                    #{t}
                  </span>
                ))}
              </div>
            )}

          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {item.description}
          </p>

        </div>

      </div>
    </div>
  );
}
