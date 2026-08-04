import React from 'react';
import BlazingFireAvatar3D from './BlazingFireAvatar3D';

export default function AvatarWithFrame({ 
  avatarUrl, 
  frameId = 'none', 
  size = 40, 
  roleColor = '#FFFFFF',
  onClick,
  style = {} 
}) {
  const isCustomFrame = frameId && frameId !== 'none';
  const isBlazingInferno = frameId === 'blazing_inferno';
  const frameClass = isCustomFrame ? `frame-${frameId.replace('_', '-')}` : '';

  if (isBlazingInferno) {
    return (
      <BlazingFireAvatar3D 
        avatarUrl={avatarUrl}
        size={size}
        onClick={onClick}
      />
    );
  }

  return (
    <div 
      className={`avatar-frame-wrapper ${frameClass}`}
      onClick={onClick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: onClick ? 'pointer' : 'default',
        padding: isCustomFrame ? '5px' : '0px',
        ...style
      }}
    >
      {/* Animated Outer Ring for other frames */}
      {isCustomFrame && <div className="avatar-frame-ring" />}

      {/* Avatar Image */}
      <img
        src={avatarUrl || '/logo.jpg'}
        alt="Avatar"
        className="avatar-frame-image"
        style={{
          border: !isCustomFrame ? `2px solid ${roleColor}` : '2px solid #070a10'
        }}
      />
    </div>
  );
}
