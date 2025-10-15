// src/components/Interactive/AnalogClock.tsx
'use client';
import React, { useEffect, useState } from 'react';

export default function AnalogClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDeg = (hours + minutes / 60) * 30;
  const minDeg = (minutes + seconds / 60) * 6;
  const secDeg = seconds * 6;

  return (
    <div className="glass p-4 rounded flex flex-col items-center">
      <div className="w-36 h-36 rounded-full relative flex items-center justify-center">
        <div style={{ transform: `rotate(${hourDeg}deg)` }} className="absolute w-1.5 h-10 bg-white origin-bottom rounded"></div>
        <div style={{ transform: `rotate(${minDeg}deg)` }} className="absolute w-1 h-14 bg-white origin-bottom rounded"></div>
        <div style={{ transform: `rotate(${secDeg}deg)` }} className="absolute w-0.5 h-16 bg-red-400 origin-bottom rounded"></div>
        <div className="w-2 h-2 bg-white rounded-full z-10"></div>
      </div>
      <div className="mt-3 text-center">
        <div className="font-mono text-sm">{time.toLocaleTimeString()}</div>
        <div className="text-xs opacity-80">{time.toLocaleDateString()}</div>
      </div>
    </div>
  );
}