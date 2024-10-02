import React from "react";
import "./Products.css";
import { Link } from "react-router-dom";
import final from "../../assets/final.png";

const Products = () => {
  return (
    <div>
      <h4 className="mb-3 pt-4">Your Products</h4>
      <hr style={{ width: "90%" }} />
      <div className="products">
        <div class="card" style={{ width: "12rem" }}>
          <img
            src={final}
            class="card-img-top"
            alt="..."
            style={{ height: "40%" }}
          />
          <div class="card-body">
            <h5 class="card-title">Baatla</h5>
            <p class="card-text">Price: ₹12</p>
            <button className="button-30">More Details</button>
          </div>
        </div>
        <Link to="/add-products">
          <button class="card extra-card" style={{ width: "12rem" }}>
            <i class="bi bi-plus" style={{ fontSize: "80px" }}></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Products;
