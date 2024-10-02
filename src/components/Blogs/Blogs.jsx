import React from "react";
import technology from "../../assets/technology.jpg";
import finance from "../../assets/finance.jpg";
import { Link } from "react-router-dom";

const Blogs = () => {
  return (
    <div>
      <h4 className="mb-3 pt-4">Your Blogs</h4>
      <hr style={{ width: "90%" }} />
      <div className="products">
        <div class="card" style={{ width: "15rem", height: "22rem" }}>
          <img src={technology} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Finance</h5>
            <p class="card-text">
              Date: 10/10/10 <br />
              Price: $12
            </p>
            <button className="button-30">More Details</button>
          </div>
        </div>
        <div class="card" style={{ width: "15rem", height: "22rem" }}>
          <img src={finance} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Technology</h5>
            <p class="card-text">
              Date: 10/10/10 <br />
              Price: $12
            </p>
            <button className="button-30">More Details</button>
          </div>
        </div>
        <Link to="/generate-blogs">
          <button
            class="card extra-card"
            style={{ width: "15rem", height: "22rem" }}
          >
            <i class="bi bi-plus" style={{ fontSize: "80px" }}></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
