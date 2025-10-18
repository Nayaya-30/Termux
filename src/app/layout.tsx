import '@/styles/global.scss';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import ThemeSwitch from '@/components/ui/ThemeSwitch';
import { CommandPalette } from '@/components/index.ts';
import MorphingSymbolSet from '@/components/MorphingSymbolSet';
import GuidedTour from '@/components/GuidedTour';
import GuidedTourManager from '@/components/GuidedTourManager';
import Dock from '@/components/Dock';
import FloatingWindow from '@/components/FloatingWindow';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Usouph OS — From Numbers to Interfaces',
	description: 'Interactive glassmorphic portfolio'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Provider store={store}>
					{/* global helpers */}
					<FloatingWindow />
					<CommandPalette />
					<GuidedTour />
					<GuidedTourManager />
					<div className="fixed top-4 right-6 z-60">
						<ThemeSwitch />
					</div>

					{/* small morphing emblem at top-left for visual continuity */}
					<div className="fixed top-6 left-6 z-50 pointer-events-none">
						<MorphingSymbolSet size={86} />
					</div>

					{children}
				</Provider>
			</body>
		</html>
	);
}