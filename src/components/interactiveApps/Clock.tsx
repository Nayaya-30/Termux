'use client';
import { useEffect, useState } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <div className="flex items-center justify-center h-full text-3xl">{time.toLocaleTimeString()}</div>;
}