// src/components/ui/Wallpaper.tsx
'use client';
import React from 'react';

export default function Wallpaper() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="w-full h-full" style={{
        background: 'linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(6,6,8,1) 100%)'
      }}>
        <svg className="absolute top-10 left-10 opacity-5" width="600" height="200">
          <text x="0" y="40" fontSize="34" fill="white">∑ ∫ √ π λ θ</text>
        </svg>
      </div>
    </div>
  );
}