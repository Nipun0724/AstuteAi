import React from "react";

const Price = () => {
  return (
    <div>
      <div className="col-sm-5">
        <label htmlFor="firstName" className="form-label">
          Product Price
        </label>
        <div style={{ display: "flex", gap: "2rem" }}>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder=""
            required
          />
          <button className="button-30">Create</button>
        </div>
        <div className="invalid-feedback">Valid name is required.</div>
      </div>
      <label className="mt-4">Discounts</label>
      <div className="products">
        <div class="card" style={{ width: "12rem" }}>
          <img
            src="https://picsum.photos/536/354"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Date: 10/10/10 <br />
              Price: $12
            </p>
            <button className="button-30">Go somewhere</button>
          </div>
        </div>
        <div class="card" style={{ width: "12rem" }}>
          <img
            src="https://picsum.photos/536/354"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Date: 10/10/10 <br />
              Price: $12
            </p>
            <button className="button-30">Go somewhere</button>
          </div>
        </div>
        <div class="card" style={{ width: "12rem" }}>
          <img
            src="https://picsum.photos/536/354"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Date: 10/10/10 <br />
              Price: $12
            </p>
            <button className="button-30">Go somewhere</button>
          </div>
        </div>
        <div class="card extra-card" style={{ width: "12rem" }}>
          <i class="bi bi-plus" style={{ fontSize: "80px" }}></i>
        </div>
      </div>
    </div>
  );
};

export default Price;
