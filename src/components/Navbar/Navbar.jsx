import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <a
              href="/"
              className="d-inline-flex link-body-emphasis text-decoration-none"
            >
              <img src={logo} alt="" className="logo" />
            </a>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-2">
                About
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2">
                Web-Builder
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2">
                Blog
              </a>
            </li>
          </ul>

          <div className="col-md-3 text-end">
            <Link to={isLoggedIn ? "/generate_logo" : "/sign-in"}>
              <button className="button-30" role="button" style={{zIndex:1000}}>
                <span className="text">
                  {isLoggedIn ? "Dashboard" : "Login"}
                </span>
              </button>
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
