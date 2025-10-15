'use client';
import { motion } from 'framer-motion';

export default function RevealText({ text }: { text: string }) {
  const letters = text.split('');
  return (
    <div className="inline-block overflow-hidden">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}