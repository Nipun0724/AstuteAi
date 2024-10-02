import React, { useState } from "react";
import "./Profile.css";
import Your_profile from "./Your_profile";
import Business_profile from "./Business_profile";
import Logo from "./Logo";

const Profile = () => {
  const [yourProfile, setYourProfile] = useState("your");
  const [profile,setProfile]=useState({
    f_name:"",
    l_name:"",
    username:"",
    email:"",
    phone:0,
    b_idea:"",
    location:"",
    years:0,
    customers:"",
    usp:"",
    logo:"",
    b_name:"",
  })

  return (
    <div className="container">
      <header className="d-flex justify-content-center py-3">
        {/* <ul className="nav nav-underline">
          <li className="nav-item">
            <a
              className={`nav-link ${yourProfile === "your" ? "active" : ""}`}
              aria-current="page"
              onClick={() => setYourProfile("your")}
              href="#"
            >
              Your Profile
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                !yourProfile === "business" ? "active" : ""
              }`}
              onClick={() => setYourProfile("business")}
              href="#"
            >
              Business Details
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${yourProfile === "logo" ? "active" : ""}`}
              aria-current="page"
              onClick={() => setYourProfile("logo")}
              href="#"
            >
              Logo Generator
            </a>
          </li>
        </ul> */}
      </header>
      {yourProfile === "your" && (
        <Your_profile setYourProfile={setYourProfile} setProfile={setProfile}/>
      )}
      {yourProfile === "business" && (
        <Business_profile setYourProfile={setYourProfile} setProfile={setProfile}/>
      )}
      {yourProfile === "logo" && <Logo setYourProfile={setYourProfile} setProfile={setProfile} profile={profile}/>}
    </div>
  );
};

export default Profile;
