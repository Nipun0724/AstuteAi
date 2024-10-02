import React from "react";
import { Link } from "react-router-dom";

const Description = ({ setCategory }) => {
  return (
    <div>
      <div className="col-sm-6">
        <label htmlFor="shelflife" className="form-label">
          Shelf Life (in months)
        </label>
        <input
          type="number"
          className="form-control"
          id="shelflife"
          placeholder=""
          required
        />
        <div className="invalid-feedback">Valid shelf life is required.</div>
      </div>
      <div className="col-sm-6 mt-2">
        <label htmlFor="quantity" className="form-label">
          Quatity (in mL)
        </label>
        <input
          type="number"
          className="form-control"
          id="quantity"
          placeholder=""
          required
        />
        <div className="invalid-feedback">Valid quantity is required.</div>
      </div>
      <div className="col-sm-6 mt-2">
        <label htmlFor="price" className="form-label">
          Price (in rupees)
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          placeholder=""
          required
        />
        <div className="invalid-feedback">Valid quantity is required.</div>
      </div>
      <div className="col-sm-6 mt-2">
        <label htmlFor="nutrition" className="form-label">
          Nutrional Information
        </label>
        <input
          type="text"
          className="form-control"
          id="nutrition"
          placeholder=""
          required
        />
        <div className="invalid-feedback">Valid nutrition is required.</div>
      </div>
      <div className="col-sm-6 mt-2">
        <label htmlFor="id" className="form-label">
          Product ID
        </label>
        <input
          type="text"
          className="form-control"
          id="id"
          placeholder=""
          required
        />
        <div className="invalid-feedback">Valid nutrition is required.</div>
      </div>

      <div className="mt-4 col-sm-6">
        <label htmlFor="USP" className="form-label">
          Special Features
        </label>
        <textarea
          className="form-control"
          id="USP"
          rows="3"
          required
        ></textarea>
        <div className="invalid-feedback">Valid USP is required.</div>
      </div>
      <div className="btn-container mt-5">
        <button
          className="button-30 submit-btn"
          onClick={() => setCategory("image")}
        >
          Back
        </button>
        <Link to="/products">
          <button className="button-30 submit-btn">Submit</button>
        </Link>
      </div>
    </div>
  );
};

export default Description;
