// src/components/Dock/DockIcon.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { openWindow, focusWindow } from '@/slices/windowSlice';

export default function DockIcon({ id, title, icon }: { id: string; title: string; icon: string; }) {
  const dispatch = useAppDispatch();
  const win = useAppSelector(s => s.windows.list.find(w => w.id === id));

  function handleClick() {
    dispatch(openWindow(id));
    dispatch(focusWindow(id));
  }

  return (
    <button
      onClick={handleClick}
      title={title}
      className="relative flex flex-col items-center justify-center w-16 h-16 p-1 rounded-lg hover:scale-105 transition-transform"
    >
      {icon ? (
        <Image src={icon} alt={title} width={40} height={40} className="object-contain" />
      ) : (
        <div className="w-8 h-8 flex items-center justify-center text-lg">{title[0]}</div>
      )}
      <span className="text-[11px] mt-1 opacity-80">{title}</span>
      {win?.minimized && (
        <span className="absolute -top-1 -right-1 px-1 rounded-full" style={{ background: 'var(--gold)', color: '#000', fontSize: 10 }}>•</span>
      )}
    </button>
  );
}