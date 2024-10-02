import React from "react";
import blog from "../../assets/blog-icon-vector-image-can-be-used-internet-marketing_120816-120930-removebg-preview-removebg-preview.png";
import product from "../../assets/product_10112423-removebg-preview.png";
import speaker from "../../assets/images-removebg-preview (1).png";

const Services = () => {
  const currentUser = "User";
  return (
    <div
      style={{
        backgroundColor: "#fff",
        marginTop: "7%",
        marginBottom: "7%",
      }}
    >
      <div class="container px-4 py-5" id="hanging-icons">
        <h2 style={{ textAlign: "center" }} className="display-4 fw-bold">
          Hello {currentUser} !
        </h2>
        <p class="pb-2 border-bottom" style={{ textAlign: "center" }}>
          Ready to Scale your business
        </p>
        <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div class="col d-flex align-items-start">
            <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <img
                style={{ height: "70px", width: "70px" }}
                src={blog}
                alt=""
              />
            </div>
            <div>
              <h3 class="fs-2 text-body-emphasis">BlogGenie</h3>
              <p>
                Effortlessly Create Engaging Blogs to Elevate Your Marketing
                Strategy with BlogGenie
              </p>
              <button href="#" class="button-30" role="button">
                See More
              </button>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <img
                style={{ height: "70px", width: "70px" }}
                src={product}
                alt=""
              />
            </div>
            <div>
              <h3 class="fs-2 text-body-emphasis">PicturePerfect</h3>
              <p>
                Seamlessly Generate Stunning Product Images and Templates with
                PicturePerfect
              </p>
              <button href="#" class="button-30" role="button">
                See More
              </button>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <img
                style={{ height: "70px", width: "70px" }}
                src={speaker}
                alt=""
              />
            </div>
            <div>
              <h3 class="fs-2 text-body-emphasis">SocialSage</h3>
              <p>
                Efficiently Manage and Enhance Your Social Media Presence with
                SocialSage
              </p>
              <button href="#" class="button-30" role="button">
                See More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
