// src/components/Story/StoryTimeline.tsx
'use client';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const items = [
  { year: '2018', title: 'The Language of Numbers', text: 'Studied mathematics — learned abstraction and pattern recognition.' },
  { year: '2020', title: 'Discovery of Code', text: 'Fell in love with HTML & JS — patterns became interfaces.' },
  { year: '2022', title: 'Crafting Experiences', text: 'Built projects blending logic and design.' }
];

export default function StoryTimeline() {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".story-item", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: false
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="space-y-6 mt-2">
      {items.map((it, i) => (
        <div key={i} className="story-item glass p-4 rounded">
          <div className="text-xs opacity-70">{it.year}</div>
          <div className="font-semibold text-lg">{it.title}</div>
          <div className="text-sm mt-2">{it.text}</div>
        </div>
      ))}
    </div>
  );
}