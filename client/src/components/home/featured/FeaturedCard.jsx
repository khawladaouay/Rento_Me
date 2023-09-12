import React from "react"
import { featured } from "../../data/Data"
import useFetch from "../../../hooks/useFetch"

const FeaturedCard = () => {
  const { data, loading, error } = useFetch("/houses/countByType");
  return (
    
      <div className='content grid5 mtop'>
        {loading ? (
          "loading"
        ) : (
          <>
        {data && featured.map((items, i) => (
          <div className='box' key={i}>
            <img src={items.cover} alt='' />
            <h4>{data[i]?.type}</h4>
            <label>{data[i]?.count}</label>
          </div>
        ))}
        </>
        )}
      </div>

  )
}

export default FeaturedCard
