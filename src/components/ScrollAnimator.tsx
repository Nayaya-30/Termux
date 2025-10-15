// src/components/ScrollAnimator.tsx
'use client';
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function viewportFactor() {
  const w = Math.max(window.innerWidth || 1024, 320);
  // scale factor: wider screens move faster; small screens reduce movement
  if (w > 1600) return 1.3;
  if (w > 1200) return 1.1;
  if (w > 900) return 0.9;
  return 0.6;
}

export default function ScrollAnimator() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // parallax with viewport tuning
    gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
      const base = parseFloat(el.dataset.speed || '0.25');
      const factor = viewportFactor();
      const speed = base * factor;
      gsap.to(el, {
        yPercent: -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6
        }
      });
    });

    // section reveal
    gsap.utils.toArray<HTMLElement>('.section').forEach((section) => {
      const items = section.querySelectorAll<HTMLElement>('.reveal-item');
      gsap.fromTo(items, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' }
      });

      gsap.fromTo(section, { opacity: 0.95, scale: 0.997 }, {
        opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 90%', end: 'top 50%', scrub: true }
      });
    });

    // Math->Code crossfade
    const storyTrigger = document.querySelector('.story');
    if (storyTrigger) {
      const mathEls = storyTrigger.querySelectorAll<HTMLElement>('.math');
      const codeEls = storyTrigger.querySelectorAll<HTMLElement>('.code');

      gsap.fromTo(mathEls, { opacity: 1, y: 0 }, {
        opacity: 0, y: -30, ease: 'none', scrollTrigger: { trigger: storyTrigger, start: 'top center', end: 'bottom top', scrub: 0.8 }
      });

      gsap.fromTo(codeEls, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, ease: 'none', scrollTrigger: { trigger: storyTrigger, start: 'top center', end: 'bottom top', scrub: 0.8 }
      });
    }

    // Smooth anchor navigation helper (for internal links)
    function smoothTo(selectorOrY: string | number) {
      if (typeof selectorOrY === 'string') {
        const el = document.querySelector(selectorOrY);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
      }
      if (typeof selectorOrY === 'number') {
        window.scrollTo({ top: selectorOrY, behavior: 'smooth' });
      }
    }

    // intercept internal anchor clicks that target hashes
    function onClick(e: Event) {
      const t = e.target as HTMLElement;
      const a = t.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (a && a.hash) {
        e.preventDefault();
        const target = document.querySelector(a.hash);
        if (target) smoothTo(a.hash);
      }
    }
    document.addEventListener('click', onClick);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf('*');
      document.removeEventListener('click', onClick);
    };
  }, []);

  return null;
}