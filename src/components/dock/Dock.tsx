// src/components/Dock/Dock.tsx
'use client';
import React, { useEffect } from 'react';
import { dockApps } from '@/data/dockApps';
import DockIcon from '@/DockIcon';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { registerWindow, restoreLayout } from '@/slices/windowSlice';

export default function Dock() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dockApps.forEach(app => dispatch(registerWindow({ id: app.id, title: app.title })));
		dispatch(restoreLayout());
	}, [dispatch]);

	return (
		<div className="dock fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-3 z-50 shadow-xl">
			{dockApps.map(app => <DockIcon key={app.id} id={app.id} title={app.title} icon={app.icon} />)}
		</div>
	);
}