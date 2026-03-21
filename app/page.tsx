import React from 'react'
import DiscussionThumbnails from './components/DiscussionThumbnails';
import AnimPanning from './components/gsap/AnimPanning';

export const Home: React.FC = () => {
  return (
    <main className='relative mx-auto w-[min(90vw,1920px)] flex min-h-screen items-center justify-center flex-col'>
      <div className='relative py-[5vw]'>
        <AnimPanning
          duration={1}
          direction={'up'}
          from={5}
          to={0}
          delay={0.3}
          fade={'in'}
          onScroll={false}
        >
          <h1 className='text-6xl font-bold text-white text-center max-w-[600px] lg:max-w-[575px]'>Welcome to M&M's Dgroup Family</h1>
        </AnimPanning>
      </div>
      <DiscussionThumbnails />
    </main>
  )
}

export default Home;