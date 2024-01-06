import React, { useEffect, useState } from "react";
import { db } from "../pages/Firebase/firebase"
import AnchorLink from 'react-anchor-link-smooth-scroll'
import "./desktop1.css";
import { collection, onSnapshot } from "firebase/firestore";

const Desktop1 = () => {
  const [area, setArea] = useState("");
  const [no, setNo] = useState(""); 
  const [specialization, setSpecialization] = useState("");
  const [doctors, setdoctors] = useState([]);
  // const [doctors, setdoctors] = useState([]);  loadinggg

  const getValue = () => {
    let list = [];
    let answer = [];
    if (specialization !== "" && area !== "") {
      // setLoading(true);
      const unsub = onSnapshot(
        collection(db, "doctors"),
        (snapshot) => {
          snapshot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          list.forEach((doctor) => {
            if (doctor.specialization.toLowerCase() == specialization.toLowerCase() && doctor.city.toLowerCase() == area.toLowerCase()) {
              answer.push(doctor);
            }
          });
          console.log("Doctors data:", list);
          setdoctors(answer);
          setSpecialization("");
          setArea("");
          setNo(answer.length === 0 ? "No Doctor Found." : "");
        },
        (error) => {
          console.log(error);
        }
      );
      return () => {
        unsub();
      };
    }
  };






  return (
    <div className="desktop-1">
      <div className="front">
        <div className="front-child" />
        <div className="front-item" />
        <div className="front-inner" />
        <img className="pro-pic-icon" alt="" src="/pro-pic@2x.png" />
        <div className="heading">FindPulse</div>
        <img className="pose-3-icon" alt="" src="/pose-3@2x.png" />
        <div className="search-a-right">Search a Right Doctor For You</div>
        <AnchorLink href="#rectangle-parent">
          <button className="vector-parent">
            <img className="group-child" alt="" src="/rectangle-1@2x.png" />
            <div className="search" >Search</div>
          </button>
        </AnchorLink>

      </div>
      <div id="rectangle-parent">
        <div className="group-item" />
        <div className="discover-the-best">Discover the best doctors</div>
        <input
          className="group-inner"
          placeholder="Specialization"
          type="text"
          value={specialization}
          onChange={(event) => setSpecialization(event.target.value)}
        />
        <input
          className="group-input"
          placeholder="Select Area"
          type="text"
          value={area}
          onChange={(event) => setArea(event.target.value)}
        />
        <button className="search-btn" onClick={getValue}>
          <div className="search-btn-child" />
          <img
            className="search-normal-icon"
            alt=""
            src="/searchnormal@2x.png"
          />
        </button>
        <div className="ellipse-div" />

        {/* data extraction */}
        <div className="answer">
        {doctors.length === 0 ? (
          <div className="rectangle-group">
            <h4 id="no">{no}</h4>
          </div>
        ) : (
          doctors.map((item) => (
            <div className="rectangle-group" key={item.id}>
              <div className="rectangle-div" />
              <img className="mask-group-icon" alt="" src={item.img} />
              <div className="dr-">
                Dr.{item.name}
                <p>City:{item.city}</p>
              </div>
            </div>
          ))
        )}
      </div>

      </div>
      <div className="desktop-1-child" />
      <div className="illustration-parent">
        <img className="illustration-icon" alt="" src="/illustration@2x.png" />
        <div className="thank-you">Thank You</div>
      </div>

    </div>
  );
};

export default Desktop1;
