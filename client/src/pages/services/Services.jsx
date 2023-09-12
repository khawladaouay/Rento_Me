import React from "react"
import img from "../../components/images/services.jpg"
import Back from "../../components/common/Back"
import "../../components/home/featured/Featured.css"
import FeaturedCard from "../../components/home/featured/FeaturedCard"

const Services = () => {
  return (
    <>
      <section className='services mb'>
        <Back name='Services' title='Services -All Services' cover={img} />
        <div className='featured container'>
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Services
