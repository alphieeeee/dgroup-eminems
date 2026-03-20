import gsap from "gsap";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const usePageTransition = () => {
	// ANIM IN
	const pageTransitionIn = () => {
		const mainEl = document.getElementById('main-container')
		const overlayEl = document.querySelectorAll('.transition-overlay')
		if (mainEl && overlayEl.length) {
			// const transitionInTL = gsap.timeline({ paused: true, defaults: { ease: 'sine.inOut' } })
			gsap.timeline({ paused: true, defaults: { ease: 'sine.inOut' } })
			gsap.set(mainEl, { autoAlpha: 0 })
			gsap.to(overlayEl, { duration: 0.6, autoAlpha: 0, ease: 'sine.out', force3D: true })
			gsap.to(mainEl, { duration: 0.6, autoAlpha: 1, ease: 'sine.out', force3D: true })
		}
    console.log('page transition in');
	}
	// ANIM OUT
	const pageTransitionOut = (
    href: string,
    router: AppRouterInstance
  ) => {
    const mainEl = document.getElementById('main-container')
    const overlayEl = document.querySelectorAll('.transition-overlay')
    if (mainEl && overlayEl.length) {
      gsap.to(mainEl, { duration: 0.6, autoAlpha: 0, ease: 'sine.in', force3D: true })
      gsap.to(overlayEl, {
        duration: 0.6,
        autoAlpha: 1,
        ease: 'sine.in',
        force3D: true,
        onComplete: () => {
          setTimeout(() => {
            router.push(href)
          }, 100);
        }
      })
    }
    console.log('page transition out');
  }

	return {
		pageTransitionIn,
		pageTransitionOut
	}
}