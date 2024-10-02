import React, { useState } from "react";
import Category from "./Category";
import Image from "./Image";
import Price from "./Price";
import Description from "./Description";

const Add_Products = () => {
  const [category, setCategory] = useState("category");

  return (
    <div className="container">
      <header className="d-flex justify-content-center py-3">
        <ul className="nav nav-underline">
          <li className="nav-item">
            <a
              className={`nav-link ${category === "category" ? "active" : ""}`}
              aria-current="page"
              onClick={() => setCategory("category")}
              href="#"
            >
              Products category
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${category === "image" ? "active" : ""}`}
              aria-current="page"
              onClick={() => setCategory("image")}
              href="#"
            >
              Products Image
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                category === "description" ? "active" : ""
              }`}
              aria-current="page"
              onClick={() => setCategory("description")}
              href="#"
            >
              Products description
            </a>
          </li>
          {/* <li className="nav-item">
            <a
              className={`nav-link ${category === "price" ? "active" : ""}`}
              aria-current="page"
              onClick={() => setCategory("price")}
              href="#"
            >
              Products Price
            </a>
          </li> */}
        </ul>
      </header>
      {category == "category" && <Category setCategory={setCategory} />}
      {category == "image" && <Image setCategory={setCategory} />}
      {category == "description" && <Description setCategory={setCategory} />}
      {category == "price" && <Price setCategory={setCategory} />}
    </div>
  );
};

export default Add_Products;
