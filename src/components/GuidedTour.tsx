// src/components/GuidedTour.tsx
'use client'
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import MorphingSymbolSet from './MorphingSymbolSet.tsx';

const STORAGE_KEY = 'usouph_guided_tour_v1';

export default function GuidedTour() {
	const [seen, setSeen] = useState<boolean>(() => {
		if (typeof window === 'undefined') return true;
		return !!localStorage.getItem(STORAGE_KEY);
	});
	const overlayRef = useRef<HTMLDivElement | null>(null);
	const textRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (seen) return;
		const overlay = overlayRef.current;
		const text = textRef.current;
		if (!overlay || !text) return;

		const tl = gsap.timeline({
			defaults: { duration: 1.0, ease: 'power3.out' }
		});
		// fade in overlay
		tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.6 });
		// title reveal
		tl.fromTo(text, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '+=0.1');
		// morph symbol pulse
		tl.to(overlay, { opacity: 0.95, duration: 0.9 }, '>');
		// message sequence
		tl.to(text, { onStart: () => { text.innerHTML = '<h2 class="text-3xl font-serif">The Language of Numbers</h2><p class="mt-2">I learned to see patterns where others saw chaos.</p>'; }, duration: 1.8 });
		tl.to(text, { onStart: () => { text.innerHTML = '<h2 class="text-3xl font-serif">Where Logic Meets Design</h2><p class="mt-2">Equations opened a doorway to expressive systems.</p>'; }, duration: 1.8 });
		tl.to(text, { onStart: () => { text.innerHTML = '<h2 class="text-3xl font-serif">Turning Logic into Experience</h2><p class="mt-2">Now I craft interfaces powered by precision & motion.</p>'; }, duration: 1.8 });
		// outro: shrink and fade out to show desktop
		tl.to(text, { opacity: 0, y: -20, duration: 0.8 });
		tl.to(overlay, { opacity: 0, duration: 0.7, onComplete: () => { localStorage.setItem(STORAGE_KEY, '1'); setSeen(true); } });

		return () => { tl.kill(); };
	}, [seen]);

	if (seen) return null;

	return (
		<div ref={overlayRef} className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80">
			<div className="text-center p-6 max-w-2xl">
				<div ref={textRef} className="text-white">
					{/* initial content set by GSAP timeline */}
					<div className="mb-6"><MorphingSymbolSet size={140} /></div>
					<h2 className="text-3xl font-serif">Initializing...</h2>
					<p className="mt-2 opacity-70">Booting the story — From Mathematics to Interfaces</p>
				</div>
			</div>
		</div>
	);
}