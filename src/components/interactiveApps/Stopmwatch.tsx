// src/components/Interactive/Stopwatch.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [ms, setMs] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = window.setInterval(() => setMs(m => m + 100), 100);
    } else if (ref.current) {
      clearInterval(ref.current);
      ref.current = null;
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);

  function reset() {
    setRunning(false);
    setMs(0);
  }

  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centis = Math.floor((ms % 1000) / 10);

  return (
    <div className="glass p-4 rounded flex flex-col items-center">
      <div className="font-mono text-2xl">{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}.{String(centis).padStart(2,'0')}</div>
      <div className="mt-3 flex gap-2">
        <button className="px-3 py-1 glass rounded" onClick={() => setRunning(r => !r)}>{running ? 'Pause' : 'Start'}</button>
        <button className="px-3 py-1 glass rounded" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}