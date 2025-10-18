'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MorphingSymbolSet from './MorphingSymbolSet.tsx';
import { useDispatch } from 'react-redux';
import { hideIntro } from '@/slices/guidedTourSlice';

export default function IntroCinematic() {
	const dispatch = useDispatch();
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const tl = gsap.timeline({
			defaults: { ease: 'power3.inOut', duration: 1.2 },
			onComplete: () => dispatch(hideIntro()),
		});

		tl.fromTo(
			el.querySelector('.intro-bg'),
			{ opacity: 0 },
			{ opacity: 1, duration: 1 }
		)
			.from('.intro-text-1', { opacity: 0, y: 40 })
			.to('.intro-text-1', { opacity: 0, y: -40 }, '+=1')
			.from('.intro-text-2', { opacity: 0, y: 40 })
			.to('.intro-text-2', { opacity: 0, y: -40 }, '+=1')
			.from('.intro-text-3', { opacity: 0, y: 40 })
			.to('.intro-text-3', { opacity: 0, y: -40 }, '+=1');

		return () => tl.kill();
	}, [dispatch]);

	return (
		<div
			ref={containerRef}
			className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-[9999] overflow-hidden"
		>
			<div className="intro-bg absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-0" />
			<div className="relative z-10 flex flex-col items-center justify-center">
				<h1 className="intro-text-1 text-5xl md:text-6xl font-bold gold-text mb-6">
					From Numbers
				</h1>
				<MorphingSymbolSet />
				<h1 className="intro-text-2 text-5xl md:text-6xl font-bold gold-text mt-6">
					To Interfaces
				</h1>
				<p className="intro-text-3 text-gray-400 mt-6 text-lg">
					Where logic met creativity.
				</p>
			</div>
		</div>
	);
}