// src/components/Windows/StoryWindow.tsx
'use client';
import React, { useLayoutEffect, useRef } from 'react';
import Window from '@/Window';
import { gsap } from 'gsap';
import StoryTimeline from '@/components/Story/StoryTimeline';

export default function StoryWindow({ windowState }: any) {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(titleRef.current, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
      tl.fromTo(textRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
    });
    return () => ctx.revert();
  }, []);

  return (
    <Window id="story" title="My Story" windowState={windowState}>
      <div>
        <div ref={titleRef} className="text-lg font-serif mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          &gt; Initializing system...
        </div>
        <div ref={textRef} className="text-sm leading-relaxed mb-4">
          <p className="mb-2">Meet <strong>Usouph</strong> — a mathematician turned web developer.</p>
          <p className="mb-2">Mathematics taught me to see patterns where others see chaos. Code taught me to turn those patterns into interfaces.</p>
        </div>
        <StoryTimeline />
      </div>
    </Window>
  );
}