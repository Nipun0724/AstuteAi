import React from "react";
import "./HeroSection.css";
import bg from "../../assets/aaa.png";
import iphone from "../../assets/iphone2.png";

const HeroSection = () => {
  return (
    <div className="hero-section" style={{ backgroundImage:bg }}>
          <div>
      <div className="container">
        <div className="content"></div>
      </div>
      <div className="iphone-container">
        <img src={iphone} alt="Tilted iPhone" />
      </div>
      {/* Adding three independently positioned boxes */}
      <div className="box box1">SOCIAL SAGE</div>
      <div className="box box2">PICTURE PERFECT</div>
      <div className="box box3">BLOG GENIE</div>
    </div>
      
    </div>
  );
};

export default HeroSection;

