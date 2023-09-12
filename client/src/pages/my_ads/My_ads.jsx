import React, { useState, useEffect } from "react";
import axios from "axios";
import "./my_ads.css";
import CircularProgress from "@material-ui/core/CircularProgress";

const My_ads = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const userDataFromLocalStorage = localStorage.getItem("user");
  const userData = JSON.parse(userDataFromLocalStorage);
  const UserId = userData?._id;

  useEffect(() => {
    axios
      .get(`/houses/userHouse/${UserId}`)
      .then((response) => {
        const housesData = response.data.houses;
        setHouses(housesData);
        setLoading(false);
        console.log("Houses associated with the user:", housesData);
      })
      .catch((error) => {
        console.error("Error fetching houses:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <CircularProgress className="loading-indicator" />
        </div>
      ) : (
        <div className="searchContainer">
          {houses.map((house) => (
            <div className="searchItem" key={house._id}>
              <img
                src={`/uploads/${house.photos[0]}`}
                alt=""
                className="siImg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/uploads/house_placeholder.png';
                }}
              />
              <div className="siContent">
                <h1 className="siTitle">{house.type} - ${house.price}</h1>
                <div className="siDetails">
                <span className="siSubtitle">Price: ${house.price}</span>
                  <span className="siSubtitle">City: {house.city}</span>
                  <span className="siSubtitle">Rooms: {house.rooms}</span>
                  <span className="siSubtitle">Baths: {house.baths}</span>
                  <span className="siSubtitle">
                    Equipments: {house.equipements.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default My_ads;
