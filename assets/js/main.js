let slides;
let dots;
let currentSlide;
let nextSlide;
const appearOptions = {
	threshold: 0,
	rootMargin: '0px 0px -250px 0px',
};
let slideWidth;

const accordion = document.getElementsByClassName('accordion_box');
const primaryNav = document.querySelector('.mobile_menu');
const navToggle = document.querySelector('.mobile_toggle');
const faders = document.querySelectorAll('.fade-in');
const sliders = document.querySelectorAll('.slide-in');
const nextButton = document.querySelector('.slider_right');
const prevButton = document.querySelector('.slider_left');
const dotsNav = document.querySelector('.slider_nav_list');
const track = document.querySelector('.slider_track');

navToggle.addEventListener('click', () => {
	const visibility = primaryNav.getAttribute('data-visible');
	if (visibility === 'false') {
		primaryNav.setAttribute('data-visible', true);
		navToggle.setAttribute('aria-expanded', true);
	} else if (visibility === 'true') {
		primaryNav.setAttribute('data-visible', false);
		navToggle.setAttribute('aria-expanded', false);
	}
});
if (prevButton) {
	prevButton.addEventListener('click', e => {
		const currentSlide = track.querySelector('.current_slide');
		const prevSlide = currentSlide.previousElementSibling;
		const currentDot = dotsNav.querySelector('.current_slide');
		const prevDot = currentDot.previousElementSibling;
		const prevIndex = slides.findIndex(slide => slide === prevSlide);
		moveToSlide(track, currentSlide, prevSlide);
		updateDots(currentDot, prevDot);
		hideShowArrows(slides, prevButton, nextButton, prevIndex);
	});
}
if (nextButton) {
	nextButton.addEventListener('click', e => {
		for (let i = 0; i < 2; i++) {
			currentSlide = track.querySelector('.current_slide');
			nextSlide = currentSlide.nextElementSibling;
		}
		const currentDot = dotsNav.querySelector('.current_slide');
		const nextDot = currentDot.nextElementSibling;
		const nextIndex = slides.findIndex(slide => slide === nextSlide);
		moveToSlide(track, currentSlide, nextSlide);
		updateDots(currentDot, nextDot);
		hideShowArrows(slides, prevButton, nextButton, nextIndex);
	});
}
if (dotsNav) {
	dotsNav.addEventListener('click', e => {
		const targetDot = e.target.closest('li');
		if (!targetDot) return;
		const currentSlide = track.querySelector('.current_slide');
		const currentDot = dotsNav.querySelector('.current_slide');
		const targetIndex = dots.findIndex(dot => dot === targetDot);
		const newTarget = targetIndex;
		const targetSlide = slides[newTarget];
		moveToSlide(track, currentSlide, targetSlide);
		updateDots(currentDot, targetDot);
		hideShowArrows(slides, prevButton, nextButton, targetIndex);
	});
}

const setSlidePosition = (slide, index) => {
	slide.style.left = slideWidth * index + 'px';
};
if (track) {
	slides = Array.from(track.children);
	slideWidth = slides[0].getBoundingClientRect().width;
	slides.forEach(setSlidePosition);
}

if (dotsNav) {
	dots = Array.from(dotsNav.children);
}
if (accordion) {
	for (let i = 0; i < accordion.length; i++) {
		accordion[i].addEventListener('click', function () {
			this.classList.toggle('active');
		});
	}
}

const appearOnScroll = new IntersectionObserver(function (
	entries,
	appearOnScroll
) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('appear');
			appearOnScroll.unobserve(entry.target);
		}
	});
},
appearOptions);
if (sliders) {
	sliders.forEach(slider => {
		appearOnScroll.observe(slider);
	});
}
if (faders) {
	faders.forEach(fader => {
		appearOnScroll.observe(fader);
	});
}

const moveToSlide = (track, currentSlide, targetSlide) => {
	track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
	currentSlide.classList.remove('current_slide');
	targetSlide.classList.add('current_slide');
};

const updateDots = (currentDot, targetDot) => {
	currentDot.classList.remove('current_slide');
	targetDot.classList.add('current_slide');
};
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
	if (targetIndex === 0) {
		prevButton.classList.add('is_hidden');
		nextButton.classList.remove('is_hidden');
	} else if (targetIndex === slides.length - 3) {
		prevButton.classList.remove('is_hidden');
		nextButton.classList.add('is_hidden');
	} else {
		prevButton.classList.remove('is_hidden');
		nextButton.classList.remove('is_hidden');
	}
};
