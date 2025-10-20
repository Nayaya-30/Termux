'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { closeApp } from '@/slices/uiSlice';
import Draggable from 'react-draggable';
import
	{ Clock,
	Stopwatch,
	Timer,
	Calendar,
	Calculator}  from './interactiveApps/index';

export default function FloatingWindow() {
	const { activeApp } = useAppSelector(s => s.ui);
	const dispatch = useAppDispatch();

	if (!activeApp) return null;

	const getApp = () => {
		switch (activeApp) {
			case 'clock': return <Clock />;
			case 'stopwatch': return <Stopwatch />;
			case 'timer': return <Timer />;
			case 'calendar': return <Calendar />;
			case 'calculator': return <Calculator />;
		}
	};

	return (
		<Draggable>
			<div className="fixed top-20 left-1/2 -translate-x-1/2 glass rounded-xl p-4 w-[350px]">
				<div className="flex justify-between items-center mb-2">
					<h2 className="capitalize">{activeApp}</h2>
					<button onClick={() => dispatch(closeApp())}>✕</button>
				</div>
				<div className="h-[300px]">{getApp()}</div>
			</div>
		</Draggable>
	);
}