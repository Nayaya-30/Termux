'use client';
import { useState } from 'react';

export default function Calculator() {
  const [input, setInput] = useState('');

  const handleClick = (val: string) => setInput(prev => prev + val);
  const calculate = () => {
    try { setInput(eval(input).toString()); } 
    catch { setInput('Error'); }
  };

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      <input className="col-span-4 bg-transparent border-b border-gray-500 text-right px-2" value={input} readOnly />
      {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map((val) => (
        <button
          key={val}
          onClick={() => (val === '=' ? calculate() : handleClick(val))}
          className="glass rounded p-2"
        >
          {val}
        </button>
      ))}
    </div>
  );
}