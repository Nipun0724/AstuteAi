import React from "react";
import logo from "../../assets/logo.png";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="custom-bg">
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
              <a
                href="/"
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none"
              >
                <img
                  src={logo}
                  alt=""
                  style={{ width: "50px", height: "60px" }}
                />
              </a>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li>
                  <a
                    href="#submenu1"
                    data-bs-toggle="collapse"
                    className="nav-link-dashboard nav-link px-0 align-middle"
                  >
                    <i class="bi bi-bookmark-star-fill"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Get Started
                    </span>{" "}
                  </a>
                  <ul
                    className="collapse nav flex-column ms-4"
                    id="submenu1"
                    data-bs-parent="#menu"
                  >
                    <li className="w-100">
                      <a href="#" className="nav-link-dashboard nav-link px-0">
                        <i class="bi bi-binoculars-fill"></i>

                        <span className="ms-1 d-none d-sm-inline">
                          Overview
                        </span>
                      </a>
                    </li>
                    <li className="w-100">
                      <Link
                        to="/profile"
                        className="nav-link-dashboard nav-link px-0"
                      >
                        <i class="bi bi-person-circle"></i>
                        <span className="ms-1 d-none d-sm-inline">
                          Your Profile
                        </span>
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="nav-link-dashboard nav-link px-0">
                        {" "}
                        <i class="bi bi-info-circle-fill"></i>
                        <span className="ms-1 d-none d-sm-inline">
                          Tutorials
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-link-dashboard nav-link px-0">
                        {" "}
                        <i class="bi bi-journal-bookmark-fill"></i>
                        <span className="ms-1 d-none d-sm-inline">
                          Documentaion
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    href="#submenu2"
                    data-bs-toggle="collapse"
                    className="nav-link-dashboard nav-link px-0 align-middle"
                  >
                    <i class="bi bi-grid-fill"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Products
                    </span>{" "}
                  </a>
                  <ul
                    className="collapse nav flex-column ms-4"
                    id="submenu2"
                    data-bs-parent="#menu"
                  >
                    <li className="w-100">
                      <Link
                        to="/products"
                        className="nav-link-dashboard nav-link px-0"
                      >
                        {" "}
                        <i class="bi bi-cart-fill"></i>
                        <span className="ms-1 d-none d-sm-inline">
                          Your Store
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/add-products"
                        className="nav-link-dashboard nav-link px-0"
                      >
                        {" "}
                        <i class="bi bi-cart-plus-fill"></i>
                        <span className="ms-1 d-none d-sm-inline">Add</span>
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="nav-link-dashboard nav-link px-0">
                        {" "}
                        <i class="bi bi-cart-dash-fill"></i>
                        <span className="ms-1 d-none d-sm-inline">Delete</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    href="#submenu3"
                    data-bs-toggle="collapse"
                    className="nav-link-dashboard nav-link px-0 align-middle"
                  >
                    <i class="bi bi-chat-right-quote-fill"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Social Media
                    </span>{" "}
                  </a>
                  <ul
                    className="collapse nav flex-column ms-4"
                    id="submenu3"
                    data-bs-parent="#menu"
                  >
                    <li>
                      <Link
                        to="/advertisement"
                        className="nav-link-dashboard nav-link px-0"
                      >
                        {" "}
                        <i class="bi bi-badge-ad-fill"></i>
                        <span className="ms-1 d-none d-sm-inline">
                          Advertisements
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/generate-blogs"
                        className="nav-link-dashboard nav-link px-0"
                      >
                        {" "}
                        <i class="bi bi-substack"></i>
                        <span className="ms-1 d-none d-sm-inline">Blogs</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    href="#submenu4"
                    data-bs-toggle="collapse"
                    className="nav-link-dashboard nav-link px-0 align-middle"
                  >
                    <i class="bi bi-speedometer2"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Analytics
                    </span>{" "}
                  </a>
                  <ul
                    className="collapse nav flex-column ms-4"
                    id="submenu4"
                    data-bs-parent="#menu"
                  >
                    <li className="w-100">
                      <a href="#" className="nav-link-dashboard nav-link px-0">
                        {" "}
                        <i class="bi bi-grid-fill"></i>
                        <span className="ms-1 d-none d-sm-inline">
                          Products
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-link-dashboard nav-link px-0">
                        {" "}
                        <i class="bi bi-piggy-bank-fill"></i>
                        <span className="ms-1 d-none d-sm-inline">Sales</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <hr />
              <div className="dropdown pb-4">
                <a
                  href="#"
                  className="d-flex align-items-center text-decoration-none dropdown-toggle"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="hugenerd"
                    width="30"
                    height="30"
                    className="rounded-circle"
                  />
                  <span className="d-none d-sm-inline mx-1">Aditya</span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark text-small shadow"
                  aria-labelledby="dropdownUser1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
