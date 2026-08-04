import React from 'react';

/**
 * SheepHeadIcon - Stylized Sheep Head SVG Component
 * Matches lucide-react Icon props interface (size, color, className, style)
 */
export default function SheepHeadIcon({ 
  size = 24, 
  color = 'currentColor', 
  className = '', 
  style = {},
  strokeWidth = 2,
  ...props 
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
      {...props}
    >
      {/* Wool Fleece Crown (Fluffy Top) */}
      <path d="M 7.5 10 C 6 10 4.8 8.8 5.2 7.2 C 5.6 5.6 7.2 4.8 8.8 5.2 C 9.7 3.8 11.8 3.5 13.2 4.4 C 14.2 3.8 15.8 4 16.6 5.1 C 18 5 19.2 6 19.3 7.4 C 19.5 8.9 18.5 10.2 17 10.3 Z" />
      
      {/* Downward Floppy Ears */}
      <path d="M 6.5 9 C 4 9.5 2.5 11 3 12.5 C 3.5 14 5.5 14 7 12.5" />
      <path d="M 17.5 9 C 20 9.5 21.5 11 21 12.5 C 20.5 14 18.5 14 17 12.5" />
      
      {/* Sheep Face Contour / Snout */}
      <path d="M 8.5 10.5 V 14.5 C 8.5 17 10 19 12 19 C 14 19 15.5 17 15.5 14.5 V 10.5" />
      
      {/* Eyes */}
      <circle cx="10.2" cy="14" r="0.8" fill={color} stroke="none" />
      <circle cx="13.8" cy="14" r="0.8" fill={color} stroke="none" />
      
      {/* Nose Line */}
      <path d="M 11.2 16.8 H 12.8" strokeWidth="1.5" />
    </svg>
  );
}
