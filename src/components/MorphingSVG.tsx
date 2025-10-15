// src/components/MorphingSVG.tsx
'use client';
import React, { useEffect, useRef } from 'react';
import * as flubber from 'flubber';
import { gsap } from 'gsap';

const PATH_A = "M50,10 C35,10 25,25 25,40 C25,55 35,70 50,70 C65,70 75,55 75,40 C75,25 65,10 50,10 Z"; // rounded blob (math)
const PATH_B = "M30,20 L30,80 L40,80 L40,60 L60,60 L60,40 L40,40 L40,20 Z"; // bracket-ish (code)

export default function MorphingSVG({ progress = 0 }: { progress?: number }) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const interpRef = useRef<any>(null);

  useEffect(() => {
    // create interpolator
    interpRef.current = flubber.interpolate(PATH_A, PATH_B, { maxSegmentLength: 0.5 });

    // animate loop: morph back and forth
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 2, ease: 'power2.inOut' } });
    tl.to({}, {
      duration: 0.0001,
      onUpdate: function() {
        // no-op so timeline exists
      }
    });

    // animate by gsap.ticker
    let t = 0;
    const id = gsap.ticker.add(() => {
      t += 0.005;
      if (t > 1) t = 0;
      const d = interpRef.current(t);
      if (pathRef.current) pathRef.current.setAttribute('d', d);
    });

    return () => {
      gsap.ticker.remove(id);
    };
  }, []);

  return (
    <svg viewBox="0 0 100 100" width="120" height="120" aria-hidden>
      <path ref={pathRef} d={PATH_A} fill="url(#g)" stroke="rgba(255,255,255,0.12)" />
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffd477" stopOpacity="0.06" />
        </linearGradient>
      </defs>
    </svg>
  );
}