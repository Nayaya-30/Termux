'use client';
export default function Calendar() {
  const today = new Date();
  const date = today.toDateString();
  return <div className="flex items-center justify-center h-full text-xl">{date}</div>;
}