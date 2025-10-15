'use client';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold gold-text mb-4"
      >
        Let’s Build Something Beautiful
      </motion.h2>
      <p className="text-gray-400 mb-6 max-w-lg">
        I’m open to collaborations, freelance projects, and opportunities abroad.  
        Let’s discuss how logic, art, and code can align.
      </p>
      <motion.a
        href="mailto:youremail@example.com"
        whileHover={{ scale: 1.05 }}
        className="bg-gold text-black px-6 py-2 rounded-lg font-semibold"
      >
        Get In Touch
      </motion.a>
    </section>
  );
}