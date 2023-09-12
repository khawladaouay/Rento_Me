import "./App.css"
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./components/home/Home"
import Header from "./components/common/header/Header";
import About from "./pages/about/About"
import Services from "./pages/services/Services"
import Houses from "./pages/houses/houses"
import Signup from "./pages/Signup/Signup"
import Signin from "./pages/Signin/Signin"
import AddHouse from "./pages/addHouse/AddHouse"
import House from "./pages/house/House";
import ProfilePage from "./pages/profilePage/ProfilePage";
import Sidebar from "./components/sidebar/Sidebar";
import My_ads from "./pages/my_ads/My_ads";
import Profile from "./pages/profile/Profile";
import AddDetails from "./components/addDetails/AddDetails";
import AddLocation from "./components/addLocation/AddLocation";
import { AuthContext } from "./context/AuthContext";
import Footer from "./components/common/footer/Footer";

function App() {
  const [userData, setUserData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("Fetching user data...");
    const userDataFromLocalStorage = localStorage.getItem("user");
    let userId = null;

    if (userDataFromLocalStorage) {
      const userData = JSON.parse(userDataFromLocalStorage);
      userId = userData?._id || null;
    }

    if (!userId) {
      console.log("Not logged in!");
    } else {
        setUserData(user);
    }

  }, []);
  console.log(userData, user)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/houses/:id" element={<House />} />
        <Route path="/about" element={<About />} />
        <Route path="/houses" element={<Houses />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/addDetails" element={<AddDetails />} />
        <Route path="/addLocation" element={<AddLocation />} />
        <Route path="/addHouse" element={<AddHouse />} />
        <Route path="profilePage" element={<ProfilePage />}>
          <Route path="profile" element={<Profile user={userData} setUserData={setUserData} />} />
          <Route path="my_ads" element={<My_ads />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
