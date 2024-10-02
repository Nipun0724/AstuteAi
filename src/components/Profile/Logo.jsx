import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import placeholder from "../../assets/placeholder.png";

const Logo = ({ setProfile, profile }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogoSubmit = async (e) => {
    e.preventDefault();

    const industry = e.target.industry.value;
    const objects = e.target.objects.value;
    const colors = e.target.colors.value;

    setLoading(true);

    try {
      // Sending request to the backend
      const response = await axios.post("http://127.0.0.1:8000/generate_logo", {
        industry,
        objects,
        colors,
      });

      // Handling the response data
      const { logo_url } = response.data;
      
      setImageSrc(logo_url); // Setting the image source to the generated logo URL

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div style={{ padding: "20px" }}>
      <h2>Generate Logo</h2>
      <hr style={{ width: "90%" }} />
      <div className="blog-page">
        <form onSubmit={handleLogoSubmit} className="blog-form">
          <div>
            <label htmlFor="industry" className="form-label">
              Industry name
            </label>
            <input
              type="text"
              className="form-control"
              id="industry"
              placeholder="Enter industry name"
              required
            />
          </div>
          <div className="mt-3">
            <label htmlFor="objects" className="form-label">
              Objects
            </label>
            <input
              type="text"
              className="form-control"
              id="objects"
              placeholder="Enter objects"
              required
            />
          </div>
          <div className="mt-3">
            <label htmlFor="colors" className="form-label">
              Colors
            </label>
            <input
              type="text"
              className="form-control"
              id="colors"
              placeholder="Enter color description"
              required
            />
          </div>
          <button type="submit" className="button-30 submit-btn mt-4">
            Submit
          </button>
        </form>
        <div
          className="blog-post placeholder-blog placeholder-image mt-5"
          style={{ height: "55vh" }}
        >
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status"></div>
            </div>
          ) : imageSrc ? (
            <div className="placeholder-content video-ad">
              <img src={imageSrc} width="100%" height="100%" />
            </div>
          ) : (
            <div className="placeholder-content">
              <img src={placeholder} alt="" style={{ height: "150px" }} />
              <p>Your logo goes here</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Logo;
