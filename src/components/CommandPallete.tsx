// src/components/CommandPalette.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { openWindow } from '@/slices/windowSlice';
import { selectProject } from '@/slices/projectsSlice';
import { projects } from '@/data/projects';

type Item = { id: string; title: string; type: 'app' | 'project' };

const APPS: Item[] = [
	{ id: 'story', title: 'My Story', type: 'app' },
	{ id: 'playground', title: 'Playground', type: 'app' },
	{ id: 'projects', title: 'Projects', type: 'app' },
	{ id: 'contact', title: 'Contact', type: 'app' },
];

export default function CommandPalette() {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [index, setIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const items: Item[] = React.useMemo(() => {
		const projItems = projects.map(p => ({ id: p.id, title: p.title, type: 'project' as const }));
		return [...APPS, ...projItems];
	}, []);

	const filtered = items.filter(i => i.title.toLowerCase().includes(query.toLowerCase()));

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			const mod = e.metaKey || e.ctrlKey;
			if ((e.key === 'k' || e.key === 'K') && mod) {
				e.preventDefault();
				setOpen(o => {
					const next = !o;
					if (next) setTimeout(() => inputRef.current?.focus(), 50);
					return next;
				});
			}
			if (e.key === 'Escape') setOpen(false);
		}
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	useEffect(() => setIndex(0), [query, open]);

	function handleOpenItem(item: Item) {
		if (item.type === 'app') {
			// open the app window
			dispatch(openWindow(item.id));
		} else {
			// project selected -> set selection and open projects window
			dispatch(selectProject(item.id));
			dispatch(openWindow('projects'));
		}
		setOpen(false);
		setQuery('');
	}

	function onKeyDown(e: React.KeyboardEvent) {
		if (e.key === 'ArrowDown') { e.preventDefault(); setIndex(i => Math.min(i + 1, filtered.length - 1)); }
		if (e.key === 'ArrowUp') { e.preventDefault(); setIndex(i => Math.max(i - 1, 0)); }
		if (e.key === 'Enter') {
			e.preventDefault();
			if (filtered[index]) handleOpenItem(filtered[index]);
		}
		if (e.key === 'Escape') setOpen(false);
	}

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-[9999] flex items-start justify-center p-6 pointer-events-none">
			<div className="w-full max-w-2xl pointer-events-auto mt-24 glass p-4 rounded-lg shadow-xl">
				<div className="flex items-center gap-3">
					<input
						ref={inputRef}
						value={query}
						onChange={e => setQuery(e.target.value)}
						onKeyDown={onKeyDown}
						placeholder="Search apps, projects... (⌘/Ctrl+K)"
						className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 p-2"
						aria-label="Command search"
					/>
					<button onClick={() => { setOpen(false); setQuery(''); }} className="px-3 py-1 glass rounded">Close</button>
				</div>

				<div className="mt-3 max-h-72 overflow-auto">
					{filtered.length === 0 && <div className="text-sm text-gray-400 p-3">No results</div>}
					{filtered.map((it, i) => (
						<div
							key={it.id + it.type}
							onMouseEnter={() => setIndex(i)}
							onClick={() => handleOpenItem(it)}
							className={`p-2 rounded cursor-pointer flex items-center justify-between ${i === index ? 'bg-white/6' : 'hover:bg-white/3'}`}
							role="button"
						>
							<div>
								<div className="font-medium">{it.title}</div>
								<div className="text-xs opacity-60">{it.type}</div>
							</div>
							<div className="text-xs opacity-60">{i === index ? '↵' : ''}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}