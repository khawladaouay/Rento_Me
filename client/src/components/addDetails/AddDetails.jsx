import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./addDetails.css";
import axios from "axios";
import Select from "react-select";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Multiselect } from "multiselect-react-dropdown";
const AddDetails = () => {
  const data = [
    { equipment: "wifi", id: 1 },
    { equipment: "television", id: 2 },
    { equipment: "kitchen", id: 3 },
    { equipment: "washing machine", id: 4 },
    { equipment: "free parking", id: 5 },
    { equipment: "toll parking", id: 6 },
    { equipment: "air conditioner", id: 7 },
    { equipment: "pool", id: 8 },
    { equipment: "hot tub", id: 9 },
    { equipment: "barbecue", id: 10 },
    { equipment: "outdoor dining area", id: 11 },
    { equipment: "chimney", id: 12 },
    { equipment: "access to the lake", id: 13 },
    { equipment: "access to the beach", id: 14 },
    { equipment: "outdoor shower", id: 15 },
  ];
  const [options] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rooms, setRooms] = useState("");
  const [baths, setBaths] = useState("");
  const [price, setPrice] = useState("");
  const [equipments, setEquipements] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      type: type,
      title: title,
      desc: desc,
      rooms: rooms,
      baths: baths,
      price: price,
      equipments: equipments,
    };
    axios
      .post("/houses", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="wrapper">
      <div className="title">Registration Form</div>
      <form className="form">
        <div className="inputfield">
          <label>Title</label>
          <input type="text" className="input" />
        </div>
        <div className="inputfield">
          <label>Type</label>
          <div className="custom_select">
            <select>
              <option value="">Select</option>
              <option value="Apartment">Apartment</option>
              <option value="Office">Office</option>
              <option value="Home">Home</option>
              <option value="Villa">Villa</option>
              <option value="Studio">Studio</option>
            </select>
          </div>
        </div>
        <div className="inputfield">
          <label>Rooms</label>
          <input type="number" className="input" />
        </div>
        <div className="inputfield">
          <label>Baths</label>
          <input type="number" className="input" />
        </div>
        <div className="inputfield">
          <label>Distance</label>
          <input type="number" className="input" />
        </div>

        <div className="inputfield">
          <label>Price</label>
          <input type="number" className="input" />
        </div>
        <div className="inputfield">
          <label>Description</label>
          <textarea className="textarea"></textarea>
        </div>
        <div className="inputfield">
          <label>Equipments</label>
          <div style={{ width: "100%", display: "flex" }}>
            <Multiselect options={options} displayValue="equipment" />
          </div>
        </div>
        <div className="inputfield">
          <button type="submit" className="btn">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDetails;
