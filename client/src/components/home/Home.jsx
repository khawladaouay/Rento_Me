import React from "react"
import Awards from "./awards/Awards"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import Location from "./location/Location"
import Price from "./price/Price"
import Recent from "./recent/Recent"
import RecentCard from "./recent/RecentCard"
import Team from "./team/Team"
import Footer from "../common/footer/Footer"

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Recent />
      <div className='container recent'>
          <RecentCard />
        </div>
      <Footer/>
    </>
  )
}

export default Home
