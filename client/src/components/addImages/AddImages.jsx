import "./addImages.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, {useState, useRef} from "react";
function AddImages ({ images, setImages, formData }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef= useRef(null);
  const imageslist = images || []
  const navigate = useNavigate();

  function generateRandomFilename(originalFilename) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = originalFilename.split(".")[0];
    return filename + "-" + uniqueSuffix + ".png";
  }

  function selectFiles(){
    fileInputRef.current.click();
  }

  const onFileSelect = (event) => {
    const files = event.target.files;
    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const randomFilename = generateRandomFilename(files[i].name);
      setImages((prevImages) => [
        ...prevImages,
        {
          name: randomFilename,
          file: files[i],
          url: URL.createObjectURL(files[i]),
        },
      ]);
    }
  };

  function deleteImage(index) {
    setImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  }

  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }

  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!imageslist.some((e) => e.name === files[i].name)) {
        const randomFilename = generateRandomFilename(files[i].name);
        setImages((prevImages) => [
          ...prevImages,
          {
            name: randomFilename,
            file: files[i],
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  return (
    <div className="card">
      <div className="top">
        <p>Drag & Drop image uploading</p>
      </div>
    <div className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
      {isDragging ? (
        <span className="select">
        Drop images here
      </span>
      ) :(
      <>
    Drag & Drop image here or {""}
      <span className="select" role="button" onClick={selectFiles}>
        Browse
      </span>
      </>
      )

      }

      <input name="file" type="file" className="file" multiple ref={fileInputRef} onChange={onFileSelect}></input>
    </div>
    <div className="container">
       {imageslist.map((imagesvar, index) =>(
      <div className="image" key={index}>
        <span className="delete" onClick={() => deleteImage(index)}>&times;</span>
        <img src={imagesvar.url} alt={imagesvar.name}/>
    </div>
    ))}
    </div>
    </div>
  );
}

export default AddImages;
