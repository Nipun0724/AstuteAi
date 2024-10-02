import React, { useState } from "react";

const Category = ({ setCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  const categories = {
    Milk: ["Whole Milk", "Skimmed Milk", "Organic Milk"],
    Cheese: ["Cheddar", "Mozzarella", "Parmesan"],
    Yogurt: ["Greek Yogurt", "Regular Yogurt", "Flavored Yogurt"],
    Butter: ["Salted Butter", "Unsalted Butter", "Clarified Butter"],
    Cream: ["Whipping Cream", "Double Cream", "Single Cream"],
    IceCream: ["Vanilla", "Chocolate", "Strawberry"],
    Powdered: ["Powdered Milk", "Powdered Cheese", "Powdered Butter"],
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSubCategoryOptions(categories[category] || []);
  };

  return (
    <div>
      <div className="col-6 mb-4">
        <label htmlFor="category" className="form-label">
          Dairy Products
        </label>
        <select
          className="form-select"
          id="category"
          aria-label="Default select example"
          style={{ marginTop: "0px" }}
          onChange={handleCategoryChange}
        >
          <option selected>Select a category</option>
          <option value="Milk">Milk</option>
          <option value="Cheese">Cheese</option>
          <option value="Yogurt">Yogurt</option>
          <option value="Butter">Butter</option>
          <option value="Cream">Cream</option>
          <option value="IceCream">Ice Cream</option>
          <option value="Powdered">Powdered</option>
        </select>
      </div>

      <div className="col-6 mb-4">
        <label htmlFor="subCategory" className="form-label">
          Sub Category
        </label>
        <select
          className="form-select"
          id="subCategory"
          aria-label="Default select example"
          style={{ marginTop: "0px" }}
        >
          <option selected>Select a subcategory</option>
          {subCategoryOptions.map((subCategory, index) => (
            <option key={index} value={subCategory}>
              {subCategory}
            </option>
          ))}
        </select>
      </div>

      <div className="col-sm-6">
        <label htmlFor="firstName" className="form-label">
          Product Name
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          placeholder=""
          required
        />
        <div className="invalid-feedback">Valid name is required.</div>
      </div>

      <button
        className="button-30 submit-btn mt-5"
        style={{ marginLeft: "35%", width: "15rem" }}
        onClick={() => setCategory("image")}
      >
        Next
      </button>
    </div>
  );
};

export default Category;
