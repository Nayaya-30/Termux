// src/components/Windows/ProjectsWindow.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import Window from '@/Window';
import { projects } from '@/data/projects';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { clearSelectedProject } from '@/slices/projectsSlice';

export default function ProjectsWindow({ windowState }: any) {
	const selectedProjectId = useAppSelector(s => s.projects.selectedProjectId);
	const dispatch = useAppDispatch();
	const [idx, setIdx] = useState(0);
	const listRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (selectedProjectId) {
			const foundIndex = projects.findIndex(p => p.id === selectedProjectId);
			if (foundIndex !== -1) {
				setIdx(foundIndex);
				// scroll the list to the item
				setTimeout(() => {
					const node = listRef.current?.querySelectorAll('.project-item')[foundIndex] as HTMLElement | undefined;
					node?.scrollIntoView({ behavior: 'smooth', block: 'center' });
				}, 80);
				// clear selection after using it
				dispatch(clearSelectedProject());
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedProjectId]);

	const project = projects[idx];

	function prev() { setIdx(i => (i - 1 + projects.length) % projects.length); }
	function next() { setIdx(i => (i + 1) % projects.length); }

	return (
		<Window id="projects" title="Projects" windowState={windowState}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
				<div className="p-4 glass rounded">
					<img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded" />
					<h3 className="mt-3 font-semibold">{project.title}</h3>
					<div className="text-sm opacity-80">{project.tagline}</div>
					<div className="mt-3 flex gap-2 flex-wrap">
						{project.tech.map(t => <span key={t} className="text-[12px] px-2 py-1 glass rounded">{t}</span>)}
					</div>
					<div className="mt-4 flex gap-2">
						<a href={project.live} target="_blank" rel="noreferrer" className="px-3 py-1 glass rounded">Live</a>
						<a href={project.repo} target="_blank" rel="noreferrer" className="px-3 py-1 glass rounded">Repo</a>
					</div>
				</div>

				<div className="p-4 flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<div className="font-semibold">Project Carousel</div>
						<div className="flex gap-2">
							<button onClick={prev} className="px-3 py-1 glass rounded">◀</button>
							<button onClick={next} className="px-3 py-1 glass rounded">▶</button>
						</div>
					</div>

					<div ref={listRef} className="space-y-2 overflow-auto max-h-[40vh] pr-2">
						{projects.map((p, i) => (
							<div
								key={p.id}
								onClick={() => setIdx(i)}
								className={`project-item p-2 rounded border ${i === idx ? 'border-gold bg-white/6' : 'border-white/6 hover:bg-white/3'} cursor-pointer`}
							>
								<div className="flex items-center justify-between">
									<div>
										<div className="font-medium">{p.title}</div>
										<div className="text-xs opacity-70">{p.tagline}</div>
									</div>
									<div className="text-xs opacity-60">{p.tech.join(', ')}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Window>
	);
}