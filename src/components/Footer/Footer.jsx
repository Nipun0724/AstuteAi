import React from "react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#3e2b47" }}> {/* Darker background */}
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-4 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a
              href="/"
              className="mb-3 me-2 mb-md-0 text-decoration-none lh-1"
            >
              <img
                src={logo}
                alt="Company Logo"
                style={{ height: "40px", width: "auto" }}
              />
            </a>
            <span className="mb-3 mb-md-0" style={{ color: "#ffffff" }}>
              © 2024 Company, Inc
            </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-decoration-none" href="#">
                <i className="bi bi-facebook" style={{ fontSize: "24px", color: "#956098" }}></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-decoration-none" href="#">
                <i className="bi bi-instagram" style={{ fontSize: "24px", color: "#956098" }}></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-decoration-none" href="#">
                <i className="bi bi-medium" style={{ fontSize: "24px", color: "#956098" }}></i>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
