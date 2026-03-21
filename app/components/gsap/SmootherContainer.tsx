'use client'
import React, { useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

interface SmootherContainerProps {
	children: React.ReactNode;
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SmootherContainer: React.FC<SmootherContainerProps> = ({
		children
	}) => {
		const smoother = useRef<ScrollSmoother | null>(null);
		const smoothWrapper = useRef<HTMLDivElement>(null);

		useGSAP(() => {
			if (!smoothWrapper.current) return;
			smoother.current = ScrollSmoother.create({
				smooth: 2,
				effects: true,
			});
		}, { scope: smoothWrapper });
		
  return (
		<>
			<div id='smooth-wrapper' ref={smoothWrapper} className={`relative`}>
      	<div id='smooth-content' className={`relative`}>
					{children}
				</div>
			</div>
		</>
  )
}

export default SmootherContainer