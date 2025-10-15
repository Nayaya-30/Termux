'use client';
import { motion } from 'framer-motion';

const projects = [
  { name: 'Real Estate Platform', desc: 'Full-featured property web app with AI valuation.' },
  { name: 'Smart Budgeting App', desc: 'Tracks expenses intelligently with data viz.' },
  { name: 'Skill-Sharing Platform', desc: 'Connects learners with micro-tutors globally.' },
];

export default function Projects() {
  return (
    <section className="min-h-screen py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-10 gold-text">Major Projects</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="glass p-6 rounded-2xl"
          >
            <h3 className="text-2xl font-semibold mb-2">{p.name}</h3>
            <p className="text-gray-400">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}