import { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

export function animPanning(
	elementRef: RefObject<HTMLElement | null>, // element to animate
	triggerRef?: RefObject<HTMLElement | null>, // trigger element
	delay: number = 0, // delay of animation
	duration: number = 0.5, // duration of animation
	markers: boolean = false, // show markers
	animOnce: boolean = false, // animate once
	onScroll: boolean = true, // animate on scroll
	direction: 'left' | 'right' | 'up' | 'down' = 'left', // direction of panning
	from: number = 100, // from position
	to: number = 0, // to position
	fade: 'in' | 'out' = 'in', // fade in or out
	ease: string = 'sine.inOut' // easing function
) {
	if (elementRef.current) {
		const el = elementRef.current
		const triggerEL = triggerRef?.current ? triggerRef?.current : el;
		let fromParams = {};
		let toParams = {};
		if(direction === 'left' || direction === 'right') {
			if(fade === 'in') {
				fromParams = { opacity: 0, xPercent: from };
				toParams = { opacity: 1, xPercent: to };
			} else {
				fromParams = { opacity: 1, xPercent: from };
				toParams = { opacity: 0, xPercent: to };
			}
		} else {
			if(fade === 'in') {
				fromParams = { opacity: 0, yPercent: from };
				toParams = { opacity: 1, yPercent: to };
			} else {
				fromParams = { opacity: 1, yPercent: from };
				toParams = { opacity: 0, yPercent: to };
			}
		}
		const panningTL = gsap.timeline({ paused: true, delay: delay, defaults: { ease: ease } });
		gsap.set(el, { ...fromParams });
		panningTL.to(el, { duration: duration, ...toParams });

		if(onScroll) {
			// ENTER
			const panningEnterST = ScrollTrigger.create({
				trigger: triggerEL,
				start: 'clamp(top 95%)',
				onEnter: () => panningTL.play(),
				markers: markers,
			});
			// RESET ON LEAVE BACK
			if(!animOnce) {
				const panningLeaveBackST = ScrollTrigger.create({
					trigger: triggerEL,
					start: 'top bottom',
					onLeaveBack: () => panningTL.pause(0),
					markers: markers,
				});
			}
		} else {
			panningTL.play();
		}
	}
}