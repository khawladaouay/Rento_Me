import "./sidebar.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import { motion } from "framer-motion";
import {
  AccountCircleRounded,
  AssignmentTurnedInRounded,
  AttachMoneyRounded,
  BarChartRounded,
  ColorLensRounded,
  DashboardRounded,
  SettingsRemoteRounded,
  TocRounded,
  Favorite,
  Redo,
} from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import Item from "../item/item";
import { useState, useContext } from "react";
function Sidebar() {
  const { dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  // for collpsing sidebar
  const handleToggle = () => {
    setOpen(!open);
  };

  const sideContainerVariants = {
    true: {
      width: "15rem",
    },
    false: {
      transition: {
        delay: 0.6,
      },
    },
  };

  const sidebarVariants = {
    true: {},
    false: {
      width: "3rem",
      transition: {
        delay: 0.4,
      },
    },
  };

  const profileVariants = {
    true: {
      alignSelf: "center",
      width: "4rem",
    },
    false: {
      alignSelf: "flex-start",
      marginTop: "2rem",
      width: "3rem",
    },
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
    <div className="App">
      <motion.div
        data-open={open}
        variants={sideContainerVariants}
        initial={`${open}`}
        animate={`${open}`}
        className="sidebar_container"
      >
        {/* sidebar div */}
        <motion.div
          className="sidebar"
          initial={`${open}`}
          animate={`${open}`}
          variants={sidebarVariants}
        >
          {/* lines_icon */}
          <motion.div
            whileHover={{
              scale: 1.2,
              rotate: 180,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(3.5px)",
              WebkitBackdropFilter: "blur(3.5px)",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              transition: {
                delay: 0.2,
                duration: 0.4,
              },
            }}
            onClick={handleToggle}
            className="lines_icon"
          ></motion.div>
          {/* groups */}
          <div className="groups">
            {/* group 1 */}
            <div className="group">
              <Link to="/profilePage/profile">
                <Item icon={<AccountCircleRounded />} name="Settings" />
              </Link>
              <Link to="/profilePage/my_ads">
                <Item icon={<BarChartRounded />} name="My houses" />
              </Link>
            </div>
          </div>
          {/* group 2 */}
          <div className="group">
            <Item icon={<Favorite />} name="Favorite" />
            <a onClick={handleLogout}>
              {" "}
              <Item icon={<Redo />} name="logout" />{" "}
            </a>
          </div>
        </motion.div>
      </motion.div>

      <div className="body_container"></div>
    </div>
  );
}

export default Sidebar;
