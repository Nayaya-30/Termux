import ScrollAnimator from '@/components/ScrollAnimator';
import {
	Hero,
	Story,
	Projects,
	InterInteractives,
	Contact
} from './sections/index.ts'

export default function Page() {
	return (
		<main>
			<ScrollAnimator />
			<Hero />
			<Story />
			<Projects />
			<Interactives />
			<Contact />
			<div className="text-xs opacity-60 mt-6">
				Tip: Press <kbd>⌘/Ctrl</kbd> + <kbd>K</kbd> to open command palette.
			</div>
		</main>
	);
}