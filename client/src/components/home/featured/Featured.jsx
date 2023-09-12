import React from "react"
import Heading from "../../common/Heading"
import "./Featured.css"
import { Link } from "react-router-dom"
import FeaturedCard from "./FeaturedCard"

const Featured = () => {
  return (
    <>
      <section className='featured background'>
        <div className='container'>
          <Heading title='Featured Property Types' subtitle='Find All Type of Property.' />
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Featured
