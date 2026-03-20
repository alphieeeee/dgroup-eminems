'use client'
import React, { useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from "@gsap/react";
import { usePageTransition } from '../../hooks/usePageTransition';

interface TransitionLayoutProps {
  children: React.ReactNode;
}

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

const TransitionLayout: React.FC<TransitionLayoutProps> = ({
    children
  }) => {
    const { pageTransitionIn } = usePageTransition();
    gsap.registerPlugin(useGSAP);
    const smoother = useRef<ScrollSmoother | null>(null);
    const smoothWrapper = useRef<HTMLDivElement>(null);
    
    useGSAP(() => {
      if (!smoothWrapper.current) return;

      smoother.current = ScrollSmoother.create({
        smooth: 2,
        effects: true,
      });
      pageTransitionIn();
    }, { scope: smoothWrapper });

  return (
    <>
    <div id='smooth-wrapper' ref={smoothWrapper} className={`relative`}>
      <div id='smooth-content' className={`relative`}>
        <div id='main-container' className={`main-container relative`}>
          {children}
        </div>
        <div className={`transition-overlays absolute w-full h-full top-0 left-0 z-40 pointer-events-none`}>
          <div className={`transition-overlay absolute w-full h-full top-0 left-0 pointer-events-auto`}></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default TransitionLayout