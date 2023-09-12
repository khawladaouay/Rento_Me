import React from "react";
import { list } from "../../data/Data";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import { faBed, fa } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecentCard = () => {
  const { data, loading, error } = useFetch("/houses");

  return (
    <div className="content grid3 mtop">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="box shadow">
              <div className="img">
                <img
                  src={`/uploads/${item.photos[0]}`}
                  alt=""
                  style={{ height: "300px", width: "410px" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/uploads/house_placeholder.png';
                  }}
                />
              </div>
              <div className="text">
                <div className="category flex">
                  <h4>{item.price} DT</h4>
                  <i className="fa fa-heart"></i>
                </div>
                
                <h6>{item.type}</h6>
                <p>
                  <i className="fa fa-location-dot"></i> {item.address}
                </p>
                <hr />
                <pre>
                  <FontAwesomeIcon icon={faBed} className="headerIcon" /><label htmlFor=""> {item.rooms} Beedrooms</label></pre>
                <Link to={`/houses/${item._id}`}>
                  <button className="siCheckButton">See availability</button>
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default RecentCard;
