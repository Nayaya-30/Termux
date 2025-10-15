// src/components/Interactive/Timer.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function Timer() {
  const [inputMin, setInputMin] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (running && remaining > 0) {
      ref.current = window.setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000);
    } else if (ref.current) {
      clearInterval(ref.current);
      ref.current = null;
    }
    if (remaining === 0) setRunning(false);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running, remaining]);

  function startTimer() {
    if (inputMin > 0) {
      setRemaining(inputMin * 60);
      setRunning(true);
    }
  }

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <div className="glass p-4 rounded flex flex-col items-center">
      <div className="text-center">
        <div className="font-semibold">Timer</div>
        <div className="font-mono text-2xl">{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}</div>
      </div>
      <div className="mt-3 flex gap-2">
        <input type="number" min={0} value={inputMin} onChange={e => setInputMin(Number(e.target.value))}
               className="w-20 p-1 rounded glass text-black" />
        <button className="px-3 py-1 glass rounded" onClick={startTimer}>Start</button>
        <button className="px-3 py-1 glass rounded" onClick={() => { setRunning(false); setRemaining(0); }}>Reset</button>
      </div>
    </div>
  );
}