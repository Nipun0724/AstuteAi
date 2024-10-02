import React, { useEffect, useState } from "react";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";

const YourProfile = ({ setYourProfile, setProfile }) => {
  // State to manage form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const input = document.querySelector("#phone");
    intlTelInput(input, {
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js",
    });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        break;
    }
  };

  const handleFormUpdate = () => {
    setProfile((prev) => ({
      ...prev,
      f_name: firstName,
      l_name: lastName,
      username,
      email,
      phone,
    }));
    setYourProfile("business");
  };

  return (
    <div>
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Your Profile</h4>
        <form className="needs-validation" noValidate>
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder=""
                value={firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder=""
                value={lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 mb-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-12 mb-4">
              <label htmlFor="phone" className="form-label phone-label">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
                value={phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            className="button-30 submit-btn"
            role="button"
            type="button"
            onClick={handleFormUpdate}
          >
            <span className="text">Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default YourProfile;
