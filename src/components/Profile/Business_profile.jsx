import React, { useState } from "react";

const BusinessProfile = ({ setYourProfile, setProfile }) => {
  // State to manage form inputs
  const [b_name, setBName] = useState("");
  const [b_idea, setBIdea] = useState("");
  const [location, setLocation] = useState("");
  const [years, setYears] = useState("");
  const [customers, setCustomers] = useState("");
  const [usp, setUSP] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "b_name":
        setBName(value);
        break;
      case "b_idea":
        setBIdea(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "years":
        setYears(value);
        break;
      case "customers":
        setCustomers(value);
        break;
      case "usp":
        setUSP(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      b_name,
      b_idea,
      location,
      years:parseInt(years),
      customers,
      usp,
    }));
    setYourProfile("logo");
  };

  return (
    <div>
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Business Profile</h4>
        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="b_name" className="form-label">
                Business name
              </label>
              <input
                type="text"
                className="form-control"
                id="b_name"
                value={b_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-0">
              <label htmlFor="b_idea" className="form-label">
                Business idea
              </label>
              <textarea
                className="form-control"
                id="b_idea"
                rows="4"
                value={b_idea}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="business-bio d-flex gap-3">
              <div className="col-sm-6">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  value={location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-sm-6">
                <label htmlFor="years" className="form-label">
                  Years
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="years"
                  value={years}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="business-bio d-flex gap-3 mt-3">
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="customers" className="form-label">
                  Customers
                </label>
                <textarea
                  className="form-control"
                  id="customers"
                  rows="3"
                  value={customers}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="usp" className="form-label">
                  Unique Selling Point
                </label>
                <textarea
                  className="form-control"
                  id="usp"
                  rows="3"
                  value={usp}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>

          <button className="button-30 submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessProfile;
