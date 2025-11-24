// AppShowcase.jsx
import React from 'react';

export default function AppShowcase() {
  return (
    <div className="app-showcase">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#a52eff" />
            <stop offset="0.498" stopColor="#6747f8" />
            <stop offset="0.647" stopColor="#6049f7" />
            <stop offset="0.863" stopColor="#4c51f4" />
            <stop offset="1" stopColor="#3d58f3" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#grad)" />
      </svg>
    </div>
  );
}
