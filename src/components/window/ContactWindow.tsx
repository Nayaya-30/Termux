// src/components/Windows/ContactWindow.tsx
'use client';
import React, { useState } from 'react';
import Window from '@/Window';

export default function ContactWindow({ windowState }: any) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setStatus('sending');
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, message })
			});
			if (!res.ok) throw new Error('Network');
			setStatus('sent');
			setName(''); setEmail(''); setMessage('');
		} catch (err) {
			console.error(err);
			setStatus('error');
		}
	}

	return (
		<Window id="contact" title="Contact" windowState={windowState}>
			<div className="space-y-3">
				<div className="text-sm">Send me a message — or open your email client.</div>

				<form onSubmit={handleSubmit} className="space-y-2">
					<input required placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 glass rounded text-black" />
					<input required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 glass rounded text-black" />
					<textarea required placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} className="w-full p-2 glass rounded h-28 text-black" />
					<div className="flex items-center gap-2">
						<button type="submit" disabled={status === 'sending'} className="px-3 py-1 glass rounded">
							{status === 'sending' ? 'Sending...' : 'Send'}
						</button>
						<a className="px-3 py-1 glass rounded" href={`mailto:yourname@example.com?subject=Contact from ${encodeURIComponent(name || 'Portfolio')}&body=${encodeURIComponent(message)}`}>
							Open Mail Client
						</a>
						{status === 'sent' && <div className="text-sm" style={{ color: 'var(--gold)' }}>Sent — thanks!</div>}
						{status === 'error' && <div className="text-sm text-red-400">Failed to send.</div>}
					</div>
				</form>
			</div>
		</Window>
	);
}