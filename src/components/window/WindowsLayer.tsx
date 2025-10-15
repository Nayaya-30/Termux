// src/components/Windows/Window.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useAppDispatch } from '@/hooks/reduxHooks';
import {
  closeWindow,
  minimizeWindow,
  focusWindow,
  setPosition,
  setSize
} from '@/slic3s/windowSlice';
import classNames from 'classnames';
import { gsap } from 'gsap';

type Pos = { x: number; y: number };
type Size = { w: number; h: number };

type Props = {
  id: string;
  title: string;
  zIndex?: number;
  children: React.ReactNode;
  windowState?: any;
  style?: React.CSSProperties;
};

export default function Window({ id, title, zIndex = 100, children, windowState, style }: Props) {
  const dispatch = useAppDispatch();
  const elRef = useRef<HTMLDivElement | null>(null);
  const [resizing, setResizing] = useState(false);
  const resizingRef = useRef(false);

  const savedPos: Pos | undefined = windowState?.pos;
  const savedSize: Size | undefined = windowState?.size;

  const defaultPos = savedPos ? { x: savedPos.x, y: savedPos.y } : { x: 80, y: 120 };
  const defaultSize = savedSize ? { w: savedSize.w, h: savedSize.h } : { w: 520, h: 420 };

  useEffect(() => {
    const node = elRef.current;
    if (!node) return;
    const dockEl = document.querySelector('.dock');
    const dockRect = dockEl?.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    if (dockRect) {
      const startX = dockRect.left + dockRect.width / 2 - (nodeRect.left + nodeRect.width / 2);
      const startY = dockRect.top + dockRect.height / 2 - (nodeRect.top + nodeRect.height / 2);
      gsap.set(node, { x: startX, y: startY, scale: 0.6, opacity: 0 });
      gsap.to(node, { duration: 0.6, x: 0, y: 0, scale: 1, opacity: 1, ease: "power3.out" });
    } else {
      gsap.fromTo(node, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.45 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowState?.open]);

  function handleClose() {
    dispatch(closeWindow(id));
  }

  function handleMinimize() {
    const node = elRef.current;
    const dockEl = document.querySelector('.dock');
    if (!node || !dockEl) {
      dispatch(minimizeWindow(id));
      return;
    }
    const nodeRect = node.getBoundingClientRect();
    const dockRect = dockEl.getBoundingClientRect();
    const targetX = dockRect.left + dockRect.width / 2 - (nodeRect.left + nodeRect.width / 2);
    const targetY = dockRect.top + dockRect.height / 2 - (nodeRect.top + nodeRect.height / 2);

    gsap.timeline({
      onComplete: () => {
        dispatch(minimizeWindow(id));
      }
    })
      .to(node, { duration: 0.45, x: targetX, y: targetY, scale: 0.6, opacity: 0.55, ease: "power2.inOut" })
      .to(node, { duration: 0.22, opacity: 0, ease: "power1.in" }, "+=0.03");
  }

  function handleFocus() {
    dispatch(focusWindow(id));
  }

  function onStop(e: DraggableEvent, data: DraggableData) {
    dispatch(setPosition({ id, pos: { x: data.x, y: data.y } }));
    if (elRef.current) {
      elRef.current.style.transform = `translate(${data.x}px, ${data.y}px)`;
    }
  }

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!resizingRef.current) return;
      const node = elRef.current!;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const newW = Math.max(280, e.clientX - rect.left);
      const newH = Math.max(180, e.clientY - rect.top);
      node.style.width = `${newW}px`;
      node.style.height = `${newH}px`;
    }
    function onUp() {
      if (!resizingRef.current) return;
      resizingRef.current = false;
      setResizing(false);
      const node = elRef.current!;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      dispatch(setSize({ id, size: { w: Math.round(rect.width), h: Math.round(rect.height) } }));
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    if (resizing) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    }
    return () => {
      window.removeEventListener('mousemove', () => {});
      window.removeEventListener('mouseup', () => {});
    };
  }, [resizing, dispatch, id]);

  function startResize(e: React.MouseEvent) {
    e.stopPropagation();
    resizingRef.current = true;
    setResizing(true);
  }

  const inlineSizeStyle: React.CSSProperties = {
    width: defaultSize.w,
    height: defaultSize.h,
    ...style
  };

  return (
    <Draggable handle=".window-drag-handle" defaultPosition={defaultPos} onStart={handleFocus} onStop={onStop}>
      <div
        ref={elRef}
        className={classNames("window-shell fixed")}
        style={{ zIndex: windowState?.zIndex ?? zIndex, ...inlineSizeStyle }}
        onMouseDown={handleFocus}
      >
        <div className="flex items-center justify-between window-drag-handle px-3 py-2 bg-transparent cursor-move select-none">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="ml-2 font-semibold">{title}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleMinimize} className="px-2">—</button>
            <button onClick={handleClose} className="px-2">✕</button>
          </div>
        </div>

        <div className="p-4 overflow-auto" style={{ height: `calc(100% - 56px)` }}>
          {children}
        </div>

        <div
          onMouseDown={startResize}
          className={classNames("absolute right-2 bottom-2 w-4 h-4 cursor-se-resize rounded-sm")}
          style={{ opacity: 0.85 }}
          title="Resize"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="opacity-70">
            <path d="M21 3v6M17 3v10M13 3v14M9 3v18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Draggable>
  );
}