'use client';
import React, { useEffect, useRef } from 'react';
import * as flubber from 'flubber';
import gsap from 'gsap';

const mathShape =
  'M50 0 L100 50 L50 100 L0 50 Z'; // diamond shape placeholder (math symbol)
const codeShape =
  'M20 20 L80 50 L20 80 Z'; // triangle shape placeholder (code symbol)

export default function MorphingSymbolSet() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const morph = flubber.interpolate(mathShape, codeShape, { maxSegmentLength: 2 });

    gsap.fromTo(
      { t: 0 },
      { t: 1, duration: 3, repeat: -1, yoyo: true, ease: 'power2.inOut',
        onUpdate() {
          if (path) path.setAttribute('d', morph(this.targets()[0].t));
        },
      }
    );
  }, []);

  return (
    <svg width="120" height="120" viewBox="0 0 100 100" className="mx-auto">
      <path ref={pathRef} fill="gold" opacity={0.8} />
    </svg>
  );
}