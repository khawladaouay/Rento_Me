import "./profilePage.css";
import {
  Route,
  Routes,
  BrowserRouter,
  Outlet,
  useLocation,
} from "react-router-dom";
import My_ads from "../my_ads/My_ads";
import Profile from "../profile/Profile";
import Sidebar from "../../components/sidebar/Sidebar";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const location = useLocation();
  const isPathMatch = (path) => location.pathname === path;

  const { user } = useContext(AuthContext);
  return (
    <div className="d-flex">
      <div className="col-auto">
        <Sidebar />
      </div>
      <div>
        <Outlet />
      </div>
      {isPathMatch("/profilePage") && (
        <div className="welcome-message">
          Welcome to your profile, <span className="username-placeholder">{user.username}</span>!
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
