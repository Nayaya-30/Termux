// src/components/ui/ThemeSwitch.tsx
'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { toggleTheme } from '@/slices/themeSlice';

export default function ThemeSwitch() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(s => s.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-3 py-1 rounded-full border border-white/6 glass flex items-center gap-2"
      title={`Switch theme (current: ${mode})`}
    >
      <span className="text-xs uppercase">{mode}</span>
    </button>
  );
}