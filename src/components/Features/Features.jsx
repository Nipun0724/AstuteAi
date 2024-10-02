import React, { useEffect, useRef } from "react";
import "./Features.css"; // Import your CSS file
import p1 from "../../assets/connecting.png";
import p2 from "../../assets/brand.png";
import p3 from "../../assets/profits.png";

const Features = () => {
  // Create refs for each card
 

  return (
    <div className="card-container">
      {/* Card 1 */}
      <div className="card-1" >
        <img src={p1} alt="Boost Social Connectivity" />
        <div className="content">
          <h2>BOOST SOCIAL CONNECTIVITY</h2>
          <p>
            Enhance your social media engagement and reach a wider audience with
            AI-generated content tailored for maximum impact across platforms.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card-2"   >
        <img src={p2} alt="Increase Brand Visibility" />
        <div className="content">
          <h2>INCREASE BRAND VISIBILITY</h2>
          <p>
            Create consistent and professional branding with ease, helping your
            startup stand out and attract more customers, leading to stronger
            brand recognition.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="card-3">
        <img src={p3} alt="Drive Higher Profits" />
        <div className="content">
          <h2>DRIVE HIGHER PROFITS</h2>
          <p>
            Save time and resources by automating your content creation,
            allowing you to focus on scaling your business and increasing
            profitability through optimized marketing efforts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
