import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import "./desktop3.css";
import { storage, db } from "./Firebase/Firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const initialState = {
  name: "",
  specialization: "",
  city: "",
  des: ""
}
const Desktop3 = () => {
  const [data, setData] = useState(initialState);
  const { name, specialization, city, des } = data;
  const [file, setFile] = useState(null);
  const [progress, setprogress] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed", (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setprogress(progress);
        }, (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        });
    };
    file && uploadFile()
  }, [file]);


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(name && specialization && city && des)) {
      alert("Please enter all the details.");
    }
    else
    {
      await addDoc(collection(db, "doctors"), {
      ...data,timestamp: serverTimestamp(),
    });
    setData(initialState);
    setFile(null);
    alert("Data Stored");

    }
    
  };

  return (
    <div className="desktop-3">
      <div className="desktop-3-child">
        <form onSubmit={handleSubmit}>
          <div className="upload-image">
            <input
              className="rectangle-input"
              type="file"
              name="imgg"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <input
            className="rectangle-input"
            placeholder="Enter specialization"
            type="text"
            name="specialization"
            value={specialization}
            onChange={handleChange}
          />
          <input
            className="rectangle-input"
            placeholder="Enter name"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
          {/* <div className="rectangle-div" /> */}
          <input
            className="rectangle-input"
            placeholder="Enter city"
            type="text"
            name="city"
            value={city}
            onChange={handleChange}
          />
          <textarea
            className="rectangle-input rectangle-textarea"
            placeholder="Description"
            name="des"
            value={des}
            onChange={handleChange}
          />
          <br />

          <button
            type="submit" className="rectangle-input rectangle-button"
            disabled={progress !== null && progress < 100}
          >Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default Desktop3;
