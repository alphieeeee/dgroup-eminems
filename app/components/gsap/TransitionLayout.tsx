'use client'
import React, { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { usePageTransition } from '../../../hooks/usePageTransition';
import SmootherContainer from './SmootherContainer';

interface TransitionLayoutProps {
  children: React.ReactNode;
}

const TransitionLayout: React.FC<TransitionLayoutProps> = ({
    children
  }) => {
    const mainContainer = useRef<HTMLDivElement>(null);
    const { pageTransitionIn } = usePageTransition();
    
    useGSAP(() => {
      pageTransitionIn();
    }, { scope: mainContainer });

  return (
    <>
      <SmootherContainer>
        <div id='main-container' ref={mainContainer} className={`main-container relative`}>
          {children}
        </div>
        <div className={`transition-overlays absolute w-full h-full top-0 left-0 z-40 pointer-events-none`}>
          <div className={`transition-overlay absolute w-full h-full top-0 left-0 pointer-events-auto`}></div>
        </div>
      </SmootherContainer>
    </>
  )
}

export default TransitionLayout