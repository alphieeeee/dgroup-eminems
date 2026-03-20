import React from 'react'
import DiscussionThumbnails from './components/DiscussionThumbnails';

export const Home: React.FC = () => {
  return (
    <main className='relative mx-auto w-[min(90vw,1920px)] flex min-h-screen items-center justify-center flex-col'>
      <div className='relative py-[5vw]'>
        <h1 className='text-6xl font-bold text-white text-center max-w-[600px] lg:max-w-[575px]'>Welcome to M&M's Dgroup Family</h1>
      </div>
      <DiscussionThumbnails />
    </main>
  )
}

export default Home;