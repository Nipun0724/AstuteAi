import React, { useState } from "react";
import axios from "axios";
import "./Blogs.css";
import placeholder from "../../assets/placeholder.png";

function Generate_Blog() {
  const [blogPost, setBlogPost] = useState("");
  // const [imageSrc, setImageSrc] = useState("");
  // const [imageAlt, setImageAlt] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogInput = e.target.blogInput.value;
    // const imageInput = e.target.imageInput.value;

    setLoading(true);

    try {
      // Sending request to the backend
      const response = await axios.post("http://127.0.0.1:8000/generate_blog", {
        blog_input: blogInput,
        // image_input: imageInput,
      });

      // Handling the response data
      const { title, blog_content } = response.data;
      setBlogPost(blog_content);
      // setImageSrc(image);
      // setImageAlt(image_alt);
      setTitle(title); // Set title from the response
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Generate Blog Post</h2>
      <hr style={{ width: "90%" }} />
      <div className="blog-page">
        <form onSubmit={handleSubmit} className="blog-form">
          <div>
            <label htmlFor="blogInput" className="form-label">
              Enter the topic for blog
            </label>
            <input
              type="text"
              className="form-control"
              id="blogInput"
              placeholder="Enter blog topic"
              required
            />
          </div>
          {/* <div className="mt-3">
            <label htmlFor="imageInput" className="form-label">
              Enter image description for blog
            </label>
            <input
              type="text"
              className="form-control"
              id="imageInput"
              placeholder="Enter image description"
              required
            />
          </div> */}
          <button type="submit" className="button-30 submit-btn mt-4">
            Submit
          </button>
        </form>

        {loading ? (
          <div className="blog-post placeholder-blog">
            <div className="text-center">
              <div className="spinner-border" role="status"></div>
            </div>
          </div>
        ) : blogPost ? (
          <article className="blog-post mt-2">
            <h2 className="display-6 link-body-emphasis mt-3 px-3">{title}</h2>
            <p className="blog-post-meta mx-3">
              {new Date().toDateString()} by <a href="#">Author</a>
            </p>
            {/* <img
              src={imageSrc}
              alt={imageAlt}
              className="mx-3"
              style={{ width: "40vw", height: "40vh" }}
            /> */}
            <p style={{ lineHeight: "1.8rem", padding: "20px 15px" }}>
              {blogPost}
            </p>
          </article>
        ) : (
          <div className="blog-post placeholder-blog">
            <div className="placeholder-content">
              <img src={placeholder} alt="" style={{ height: "150px" }} />
              <p>Your blog goes here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Generate_Blog;
