import { useState, useEffect, useContext  } from "react";
import { useNavigate } from "react-router-dom";
import {Stepper,StepLabel, Step} from "@material-ui/core";
import {Button} from "antd";
import {Multiselect} from "multiselect-react-dropdown";
import AddImages from "../../components/addImages/AddImages";
import AddLocation from "../../components/addLocation/AddLocation";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function AddHouse() {
  const formData = new FormData();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [addDetails, setAddDetails] = useState({
    type: "",
    title: "",
    desc: "",
    rooms: "",
    baths: "",
    price: "",
    distance: "",
    equipements: [],
  });
  const [images, setImages] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const userDataFromLocalStorage = localStorage.getItem("user");
  const userData = JSON.parse(userDataFromLocalStorage);

  const handleNext = () => {
    console.log("next clicked");
    setCurrent(current + 1);
  };

  const handlePrevious = () => {
    console.log("prev clicked");
    setCurrent(current - 1);
  };

  const handleDetailsSubmit = (values) => {
    setAddDetails(values);
    handleNext();
  };

  const handleSubmit = () => {
    if (city === "" || address === "") {
      alert("City and Address cannot be empty.");
      return;
    }

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    images.forEach((image) => {
      formData.append("images", image.file, image.name);
    });

    images.forEach((image) => {
      formData.append("photos", image.name);
    });

    formData.append("location[]", coordinates.longitude);
    formData.append("location[]", coordinates.latitude);
    formData.append("city", city);
    formData.append("address", address);

    for (const key in addDetails) {
      formData.append(key, addDetails[key]);
    }

    formData.append("user", userData?._id);

    console.log(formData)
    axios
      .post('/houses', formData, { headers })
      .then((res) => {
        console.log(res);
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div>
      <Stepper activeStep={current}>
        <Step>
          <StepLabel>Add Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Upload Images</StepLabel>
        </Step>
        <Step>
          <StepLabel>Choose Location</StepLabel>
        </Step>
      </Stepper>

      {current === 0 && (
        <AddDetails
          onFinish={handleDetailsSubmit}
          current={current}
          onNext={handleNext}
          onPrevious={handlePrevious}
          formData={addDetails}
        />
      )}
      {current === 1 && (
        <>
          <AddImages images={images} setImages={setImages} formData={formData} />
          <br></br>
          <button onClick={handlePrevious}>Previous</button>&nbsp;
          <button type="primary" onClick={handleNext} disabled={!images.length > 0}>
            Next
          </button>
        </>
      )}
      {current === 2 && (
        <>
        <AddLocation
          onNext={handleNext}
          onPrevious={handlePrevious}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          setCity={setCity}
          setAddress={setAddress}
          city={city}
          address={address}
        />
        <div>
          <button onClick={handlePrevious}>Previous</button>&nbsp;
          <button onClick={handleSubmit}>Submit</button>
        </div>
        </>
      )}
    </div>
  );
}

function AddDetails({ onFinish, current, onNext, onPrevious, formData }) {
  const data = [
    {equipment: 'wifi', id: 1},
    {equipment: 'television', id: 2 },
    {equipment: 'kitchen', id: 3 },
    {equipment: 'washing machine', id: 4 },
    {equipment: 'free parking', id: 5 },
    {equipment: 'toll parking', id: 6},
    {equipment: 'air conditioner', id: 7 },
    {equipment: 'pool', id: 8 },
    {equipment: 'hot tub', id: 9 },
    {equipment: 'barbecue', id: 10 },
    {equipment: 'outdoor dining area', id: 11},
    {equipment: 'chimney', id: 12 },
    {equipment: 'access to the lake', id: 13 },
    {equipment: 'access to the beach', id: 14 },
    {equipment: 'outdoor shower', id: 15 },
  ];

  const [options] = useState(data);
  const [type, setType] = useState(formData.type || "");
  const [title, setTitle] = useState(formData.title || "");
  const [desc, setDesc] = useState(formData.desc || "");
  const [rooms, setRooms] = useState(formData.rooms || "");
  const [baths, setBaths] = useState(formData.baths || "");
  const [price, setPrice] = useState(formData.price || "");
  const [distance, setDistance] = useState(formData.distance || "");
  const [equipements, setEquipements] = useState(formData.equipements || []);
  const [allInputsFilled, setAllInputsFilled] = useState(false);

  const checkInputsFilled = () => {
    if (desc && rooms && baths && price && distance && type && title && equipements.length > 0) {
      setAllInputsFilled(true);
    } else {
      setAllInputsFilled(false);
    }
  };

  function handleNextAndSave() {

    onFinish({
    type: type,
    title: title,
    desc: desc,
    rooms: rooms,
    baths: baths,
    price: price,
    equipements: equipements,
    distance: distance,
    });
  }

  useEffect(() => {
    checkInputsFilled();
  });

  return (
    <form>
    <div className="wrapper" >
    <div className="title">
      Registration Form
    </div>
    <div className="form">
       <div className="inputfield">
          <label>Title</label>
          <input type="text" className="input" value={title}
          onInput={(e) => {setTitle(e.target.value);checkInputsFilled()}}
          />
       </div>
        <div className="inputfield">
          <label>Type</label>
          <div className="custom_select">
            <select onInput={(e) => {setType(e.target.value);checkInputsFilled()}} defaultValue={formData.type}>
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
          <input type="number" className="input" value={rooms} onInput={(e) => {setRooms(e.target.value);checkInputsFilled()}}/>
       </div>
      <div className="inputfield">
          <label>Baths</label>
          <input type="number" className="input" value={baths} onInput={(e) => {setBaths(e.target.value);checkInputsFilled()}}/>
       </div>
       <div className="inputfield">
          <label>Distance</label>
          <input type="number" className="input" value={distance} onInput={(e) => {setDistance(e.target.value);checkInputsFilled()}}/>
       </div>

        <div className="inputfield">
          <label>Price</label>
          <input type="number" className="input" value={price} onInput={(e) => {setPrice(e.target.value);checkInputsFilled()}}/>
       </div>
      <div className="inputfield">
          <label>Description</label>
          <textarea className="textarea" value={desc} onInput={(e) => {setDesc(e.target.value);checkInputsFilled()}}></textarea>
       </div>
       <div className="inputfield">
          <label>Equipments</label>
          <div  style={{width:"100%", display:"flex"}}>
          <Multiselect
            options={options}
            displayValue="equipment"
            selectedValues={formData.equipements.map((equipment) => ({ equipment }))}
            onSelect={(selectedList) => {
              const selectedEquipmentNames = selectedList.map((item) => item.equipment);
              setEquipements(selectedEquipmentNames);
              checkInputsFilled();
            }}
            onRemove={(selectedList) => {
              const RemovedList = selectedList.map((item) => item.equipment);
              setEquipements(RemovedList);
              checkInputsFilled();
            }}
          />
          </div>
       </div>
       <div className="inputfield">
       <button type={current === 2 ? "submit" : "button"} className="btn" onClick={handleNextAndSave} disabled={current !== 2 && !allInputsFilled}>
        {current === 2 ? "Submit" : "Next"}
      </button>
    </div>
    </div>
</div>
</form>
  )
}

export default AddHouse;
