import React from 'react'
import Carousel from './Carousel'
import GenderSection from './GenderSection'
import LatestProduct from './LatestProduct'
import Interests from './Interests'

const Home = () => {
  return (
    <div className='pt-[59px] '>
      <Carousel />
      <GenderSection />
      <LatestProduct />
      <Interests />
    </div>
  )
}

export default Home
