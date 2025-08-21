document.addEventListener('DOMContentLoaded', () => {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.3
	});

	document.querySelectorAll('.animation__fade-in').forEach(el => observer.observe(el));

	document.querySelectorAll('.projects__item-header').forEach(header => {
		header.addEventListener('click', () => {
			const content = header.nextElementSibling;
			content.classList.toggle('open');
		});
	});

	const menu = document.getElementById('menu');
	const navList = document.getElementById('nav-list');

	menu.addEventListener('click', () => {
		navList.classList.toggle('active');
	});

	const navLinks = navList.querySelectorAll('.header__nav-link');
	
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			navList.classList.remove('active');
		});
	});
});
