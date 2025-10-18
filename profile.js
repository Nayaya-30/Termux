function updateTime() {
	const timeElement = document.querySelector('[data-testid="test-user-time"]');
	if (timeElement) {
		timeElement.textContent = `Current time: ${Date.now()} ms`;
	} else {
		timeElement.textContent = "time";
	}
}

// Initial time mount
updateTime();

// Update every second
setInterval(updateTime, 1000);

// Optional: Handle avatar upload (if needed for testing)
function handleAvatarUpload(file) {
	const reader = new FileReader();
	reader.onload = (e) => {
		const avatarImg = document.querySelector('[data-testid="test-user-avatar"]');
		if (avatarImg) {
			avatarImg.src = e.target.result;
		}
	};
	reader.readAsDataURL(file);
}

// Keyboard navigation enhancement
document.addEventListener('DOMContentLoaded',
	function () {
		const focusableElements = document.querySelectorAll('a, button, [tabindex="0"]');
		focusableElements.forEach(el => {
			el.addEventListener('keydown',
				function (e) {
					if (e.key === 'Enter' || e.key === ' ') {
						el.click();
					}
				});
		});
	});

// 3D tilt effect on card
const card = document.querySelector('.profile-card');
if (card && window.matchMedia('(hover: hover)').matches) {
	card.addEventListener('mousemove',
		function (e) {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const centerX = rect.width / 2;
			const centerY = rect.height / 2;

			const rotateX = (y - centerY) / 30;
			const rotateY = (centerX - x) / 30;

			card.style.transform = `translateZ(20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
		});

	card.addEventListener('mouseleave',
		function () {
			card.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg)';
		});
}