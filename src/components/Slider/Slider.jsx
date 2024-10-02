// import React from "react";
// import "./Slider.css";
// const Slider = () => {
//   return (
//     <div className="slider">
//       <h2 style={{ textAlign: "center" }} className="display-5 fw-bold">
//         Blog Generator
//       </h2>
//       <hr style={{ margin: "2%" }} />
//       <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
//         <div className="carousel-indicators">
//           <button
//             type="button"
//             data-bs-target="#myCarousel"
//             data-bs-slide-to="0"
//             className=""
//             aria-label="Slide 1"
//           ></button>
//           <button
//             type="button"
//             data-bs-target="#myCarousel"
//             data-bs-slide-to="1"
//             aria-label="Slide 2"
//             className=""
//           ></button>
//           <button
//             type="button"
//             data-bs-target="#myCarousel"
//             data-bs-slide-to="2"
//             aria-label="Slide 3"
//             className="active"
//             aria-current="true"
//           ></button>
//         </div>
//         <div className="carousel-inner">
//           <div className="carousel-item step-1 active">
//             <div className="container">
//               <div className="carousel-caption text-start">
//                 <h1>Create Account</h1>
//                 <p className="opacity-75">Login and create account</p>
//                 <p>
//                   <button className="button-30 submit-btn" href="#">
//                     Go to Blog Generator
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="carousel-item step-2">
//             <div className="container">
//               <div className="carousel-caption text-start">
//                 <h1>Give your prompt</h1>
//                 <p>Give the title for the blog post you want to generate</p>
//                 <p>
//                   <button className="button-30 submit-btn" href="#">
//                     Go to Blog Generator
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="carousel-item step-3">
//             <div className="container">
//               <div className="carousel-caption text-start">
//                 <h1>Upload blog to your website</h1>
//                 <p>
//                   After getting a satisfiable blog you can upload it to your
//                   website
//                 </p>
//                 <p>
//                   <button className="button-30 submit-btn" href="#">
//                     Go to Blog Generator
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#myCarousel"
//           data-bs-slide="prev"
//         >
//           <span
//             className="carousel-control-prev-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#myCarousel"
//           data-bs-slide="next"
//         >
//           <span
//             className="carousel-control-next-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Slider;

import React from 'react'
import "./Slider.css";

const Slider = () => {
  return (
    <div>
      <section className="circular-slider">
        <div className="container">
          <div className="text">
            <h1>01 Launch Fast</h1>
            <p>Launch your online store effortlessly with our intuitive design tools. From layout to products, get everything ready in minutes.</p>
          </div>
          <div className="text">
            <h1>02 Promote Powerfully</h1>
            <p>Elevate your brand with AI-powered content—captivating descriptions, SEO blogs, and social media posts, all crafted for maximum impact.</p>
          </div><div className="text">
            <h1>03 Decide Wisely</h1>
            <p>Unlock real-time data insights to fine-tune your strategy and make smarter, faster decisions that boost your business growth.</p>
          </div>
        </div>
        <div className="slider">
          <div className="indicator">
            
          </div>
          <div className="img">

          </div>
        </div>
      </section>
    </div>
  )
}

export default Slider