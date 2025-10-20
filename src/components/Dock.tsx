'use client';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { openApp } from '@/slices/uiSlice';
import { motion } from 'framer-motion';
import Image from 'next/image';

const apps = [
	{ id: 'clock', icon: '/icons/clock.svg', label: 'Clock' },
	{ id: 'stopwatch', icon: '/icons/stopwatch.svg', label: 'Stopwatch' },
	{ id: 'timer', icon: '/icons/timer.svg', label: 'Timer' },
	{ id: 'calendar', icon: '/icons/calendar.svg', label: 'Calendar' },
	{ id: 'calculator', icon: '/icons/calculator.svg', label: 'Calculator' },
];

export default function Dock() {
	const dispatch = useAppDispatch();

	return (
		<motion.div
			initial={{ y: 100 }}
			animate={{ y: 0 }}
			transition={{ type: 'spring', stiffness: 80 }}
			className="fixed bottom-5 left-1/2 -translate-x-1/2 flex gap-4 glass px-6 py-3 rounded-2xl shadow-lg"
		>
			{apps.map(app => (
				<button
					key={app.id}
					onClick={() => dispatch(openApp(app.id))}
					className="relative flex flex-col items-center group"
				>
					<Image src={app.icon} alt={app.label} width={32} height={32} />
					<span className="absolute bottom-[-20px] opacity-0 group-hover:opacity-100 text-xs">{app.label}</span>
				</button>
			))}
		</motion.div>
	);
}