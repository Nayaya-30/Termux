// src/app/sections/Story.tsx
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Story() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// existing per-element animation if any (kept for compatibility)
			// You may keep additional timelines here — ScrollAnimator also handles the main morph
		}, ref);
		return () => ctx.revert();
	}, []);

	return (
		<section ref={ref} className="section story min-h-screen flex flex-col items-center justify-center text-center gap-8">
			<div className="math text-3xl text-gray-300">∫ f(x) dx = Proof of Concept</div>
			<div className="code text-xl font-mono bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
				console.log("Proof of Concept → Product");
			</div>

			<p className="max-w-lg text-gray-400 mt-4 reveal-item">
				Math taught me how to think; code taught me how to create.
				Now, I blend both worlds — precision and imagination — to build elegant web experiences.
			</p>
		</section>
	);
}