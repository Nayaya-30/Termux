// src/app/sections/Hero.tsx
'use client';
import { motion } from 'framer-motion';
import RevealText from '@/components/RevealText';

export default function Hero() {
  return (
    <section className="section min-h-screen flex flex-col items-center justify-center relative text-center" aria-label="Hero">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-6 reveal-item"
      >
        <RevealText text="Usouph." />
      </motion.div>

      <motion.h2
        className="text-4xl md:text-6xl font-bold gold-text reveal-item"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        From Mathematics to Web Development
      </motion.h2>

      <p className="max-w-xl text-gray-400 mt-4 reveal-item">
        Where logic met creativity — and I started writing proofs in JavaScript instead of symbols.
      </p>

      {/* Parallax math symbols — data-speed controls rate */}
      <div className="absolute top-16 left-12 text-6xl opacity-10 par-symbol" data-speed="0.12" aria-hidden>
        <div className="math-symbol" data-speed="0.18">∑</div>
      </div>

      <div className="absolute bottom-20 right-12 text-6xl opacity-10 par-symbol" data-speed="0.08" aria-hidden>
        <div className="math-symbol" data-speed="0.1">∫</div>
      </div>
    </section>
  );
}