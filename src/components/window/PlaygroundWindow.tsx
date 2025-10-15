// src/components/Windows/PlaygroundWindow.tsx
'use client';
import React from 'react';
import Window from '@/Window';
import AnalogClock from '@/components/InteractiveApps/AnalogClock';
import Stopwatch from '@/components/InteractiveApps/Stopwatch';
import Timer from '@/components/InteractiveApps/Timer';

export default function PlaygroundWindow({ windowState }: any) {
	return (
		<Window id="playground" title="Playground" windowState={windowState}>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<AnalogClock />
				<Stopwatch />
				<Timer />
			</div>
		</Window>
	);
}