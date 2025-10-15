'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import IntroCinematic from '@/IntroCinematic';

export default function GuidedTourManager() {
  const showIntro = useSelector((state: RootState) => state.guidedTour.showIntro);

  useEffect(() => {
    const seen = localStorage.getItem('intro_seen');
    if (seen) return;
  }, []);

  if (showIntro) return <IntroCinematic />;
  return null;
}