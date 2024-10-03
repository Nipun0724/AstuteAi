import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import placeholder from "../../assets/placeholder.png";
import "./Advertisement.css"

const Advertisement = () => {
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [backgroundDescription, setBackgroundDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchVideoUrl = async () => {
      if (productName && backgroundDescription) {
        setLoading(true);
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/generate_advertisement",
            {
              prompt: backgroundDescription, // Send background description as prompt
              product_type: productName,      // Send product name as product_type
            }
          );
          setVideoUrl(response.data.image_url); // Assuming you're getting an image URL instead of a video URL          
        } catch (error) {
          console.error("Error fetching video URL:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchVideoUrl();
  }, [productName, backgroundDescription]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProductName(e.target.elements.productName.value);
    setBackgroundDescription(e.target.elements.backgroundDescription.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Generate Social Post</h2>
      <hr style={{ width: "90%" }} />
      <div className="blog-page">
        <form onSubmit={handleSubmit} className="blog-form">
          <div>
            <label htmlFor="productName" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="mt-3">
            <label htmlFor="backgroundDescription" className="form-label">
              Promt
            </label>
            <input
              type="text"
              className="form-control"
              id="backgroundDescription"
              placeholder="Enter prompt"
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
          ) : videoUrl ? (
            <div className="placeholder-content video-ad">
              <img
                src={videoUrl}
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <div className="placeholder-content">
              <img src={placeholder} alt="" style={{ height: "150px" }} />
              <p>Your Post goes here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
