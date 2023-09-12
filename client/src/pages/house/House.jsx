import "./house.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faBed,
  faBath,
  faRuler,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Map, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const House = () => {
  const TOKEN =
    "pk.eyJ1Ijoia2hha2hvIiwiYSI6ImNsbTl2NnRpcjBuemkzZG81c3Zkb3JzdzUifQ.CVQYBnN4nFHGddk796facg";
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [loading, setLoading] = useState(true);
  const [house, setHouse] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 17,
  });

  const [coordinatesAvailable, setCoordinatesAvailable] = useState(false);

  useEffect(() => {
    axios
      .get(`/houses/find/${id}`)
      .then((response) => {
        const houseData = response.data;
        setHouse(houseData);
        setLoading(false);
        console.log(houseData.location);
        if (houseData.location && houseData.location.length === 2) {
          const [longitude, latitude] = houseData.location;
          setViewport((prevViewport) => ({
            ...prevViewport,
            latitude,
            longitude,
          }));
          setCoordinatesAvailable(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching houses:", error);
      });
  }, []);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={`/uploads/${house.photos[slideNumber]}`}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}

          <div className="hotelWrapper">
            <h1 className="hotelTitle">{house.title}</h1>
            <div className="hotelImages">
              {house.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={`/uploads/${photo}`}
                    alt=""
                    className="hotelImg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/uploads/house_placeholder.png";
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>
                {house.address},&nbsp;&nbsp;{house.city}
              </span>
            </div>
            <div className="houseDetails">
              <FontAwesomeIcon icon={faBed} className="headerIcon" />
              &nbsp;&nbsp;
              <span>
                {" "}
                {house.rooms}{" "}
                Bedrooms&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <FontAwesomeIcon icon={faBath} className="headerIcon" />
              &nbsp;&nbsp;
              <span>
                {" "}
                {house.baths}{" "}
                Baths&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <FontAwesomeIcon icon={faRuler} className="headerIcon" />
              &nbsp;&nbsp;
              <span> {house.distance} m</span>
            </div>

            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Overview:</h1>

                <div className="overview">
                  <p className="hotelDesc">{house.desc}</p>
                </div>
                <br></br>
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">Equipements:</h1>
                  {house.equipements.length > 0 ? (
                    house.equipements.map((item, index) =>
                      item.split(",").map((equipment, subIndex) => (
                        <div className="equi" key={`${index}-${subIndex}`}>
                          {equipment.trim()}
                        </div>
                      ))
                    )
                  ) : (
                    <div className="equi">
                      <p>No equipment available</p>
                    </div>
                  )}
                  {coordinatesAvailable && (
                    <div className="map-wrapper">
                      <div className="map-container">
                        <Map
                          style={{ width: 700, height: 350 }}
                          initialViewState={viewport}
                          mapboxApiAccessToken={TOKEN}
                          mapStyle="mapbox://styles/mapbox/satellite-v9"
                        >
                          <Marker
                            longitude={viewport.longitude}
                            latitude={viewport.latitude}
                          >
                            <div className="marker">
                              <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                          </Marker>
                          <div
                            style={{ position: "absolute", top: 10, right: 10 }}
                          >
                            <NavigationControl showZoom={false} />
                          </div>
                        </Map>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="hotelDetailsPrice">
                <div className="flex">
                  <div className="col d-flex justify-content-cente">
                    <p style={{ fontSize: "23px" }}>
                      {house.price}DT for night
                    </p>
                  </div>
                  <i className="fa fa-heart"></i>
                </div>

                <div className="justify-content-center">
                  <button className="button-4">Rent</button>{" "}
                  <button className="button-3">arrange a visit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default House;
