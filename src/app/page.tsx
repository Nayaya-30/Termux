import { ScrollAnimator } from '@/components/index';
import {
	Hero,
	Story,
	Projects,
	Interactives,
	Contact
} from './sections/index';

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