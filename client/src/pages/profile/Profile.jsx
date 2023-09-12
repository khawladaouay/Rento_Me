import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { TextField } from "@material-ui/core";
import axios from "axios";

function Profile({ user_passed, setUserData_passed }) {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("user");

    if (userDataFromLocalStorage) {
      const userData = JSON.parse(userDataFromLocalStorage);
      setUserId(userData?._id || null);
    }

    if (!userId) {
      console.log("Not logged in!");
    } else {
      axios
        .get(`/users/${userId}`)
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: username,
      email: email,
      phone: phone,
      country: country,
      city: city,
    };

    axios
      .put(`/users/${userId}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const { username, email, phone, country, city } = userData;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3 border-right">

          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">UserName</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="UserName"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Mobile Number</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="enter phone number"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Email ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter email id"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="country"
                    name="country"
                    value={userData.country}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    name="city"
                    value={userData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="submit"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
