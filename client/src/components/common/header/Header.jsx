import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./header.css";
import { nav } from "../../data/Data";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Button, List, ListItem } from "@mui/material";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    try {
      dispatch({ type: "LOGOUT" });
      await axios.get("/auth/logout");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <header>
        <div className="container flex">
          <div>
            <img src="/uploads/logo1.png" alt="" />
          </div>
          <div className="nav">
            <List className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <ListItem key={index}>
                  <Button component={Link} to={list.path}>
                    {list.text}
                  </Button>
                </ListItem>
              ))}
            </List>
          </div>
          {user && user.username ? (
            <NavDropdown title={user.username} id="username">
              <LinkContainer to="/profilePage">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/addHouse">
                <NavDropdown.Item>add house</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <div className="flex">
              <Link to="/addHouse">
                <button onClick={handleClick} className="cta">
                  <span>Post an ad</span>
                  <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
              </Link>
              <Link to="/signup">
                <button className="button">Register</button>
              </Link>
              <Link to="/login">
                <button className="button">Login</button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
