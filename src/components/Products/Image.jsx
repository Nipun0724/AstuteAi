import React, { useState } from "react";
import placeholder from "../../assets/placeholder.png";
import product1 from "../../assets/final.png";
import "./Image.css";

const Image = ({ setCategory }) => {
  const [imgArray, setImgArray] = useState([]);
  const [resImg, setResImg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxLength = parseInt(e.target.getAttribute("data-max_length"), 10);

    files.forEach((file) => {
      if (!file.type.match("image.*")) {
        return;
      }

      if (imgArray.length < maxLength) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImgArray((prevArray) => [
            ...prevArray,
            { file: file, url: e.target.result },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveImage = (fileToRemove) => {
    setImgArray((prevArray) =>
      prevArray.filter((img) => img.file !== fileToRemove)
    );
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResImg("submitted");
    }, 5000);
  };

  return (
    <div>
      <div className="product-enhancer-page">
        <div className="product-input-field">
          <label className="mt-2">Product Image</label>
          <div className="upload-box">
            <div className="upload-btn-box">
              <input
                type="file"
                multiple
                data-max_length="20"
                className="upload-inputfile"
                id="file-upload"
                onChange={handleImageUpload}
              />
              <label htmlFor="file-upload" className="upload-btn ">
                <i className="bi bi-plus" style={{ fontSize: "80px" }}></i>
              </label>
            </div>

            {imgArray.map((img, index) => (
              <div key={index} className="upload-img-box">
                <div
                  className="img-bg"
                  style={{
                    background: `url(${img.url}) center/cover no-repeat`,
                  }}
                  data-number={index}
                  data-file={img.file.name}
                >
                  <div
                    className="upload-img-close"
                    onClick={() => handleRemoveImage(img.file)}
                  >
                    <i className="bi bi-x"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Prompt
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="4"
            ></textarea>
          </div>
          <button className="button-30 mt-3 mb-3" onClick={handleSubmit}>
            Perfect Product
          </button>
        </div>
        <div
          className="blog-post placeholder-blog placeholder-image mt-5"
          style={{ height: "55vh" }}
        >
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status"></div>
            </div>
          ) : resImg ? (
            <div className="placeholder-content">
              <img
                src={product1}
                alt="Product"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          ) : (
            <div className="placeholder-content">
              <img
                src={placeholder}
                alt="Placeholder"
                style={{ height: "150px" }}
              />
              <p>Your Image comes here</p>
            </div>
          )}
        </div>
      </div>
      <div className="btn-container mt-4">
        <button
          className="button-30 submit-btn"
          onClick={() => setCategory("category")}
        >
          Back
        </button>
        <button
          className="button-30 submit-btn"
          onClick={() => setCategory("description")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Image;
