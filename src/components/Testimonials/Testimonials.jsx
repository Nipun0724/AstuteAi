import React from 'react'
import m1 from "../../assets/m1.jpg"
import l1 from "../../assets/l1.jpg"
import l2 from "../../assets/l2.jpg"
import l3 from "../../assets/l3.jpg"
import m2 from "../../assets/m2.jpg"
import "./Testimonials.css"

const Testimonials = () => {
  return (
<div class="container-5">
    <h1 style={{textAlign:'center',fontFamily:'juro'}}>TESTIMONIALS</h1>
      <section id="testimonials">
        <figure class="testimonial daniel" style={{backgroundColor:'#a27cdf'} }>
          <figcaption>
            <img
              src={m1}
              alt=""
              width="35"
            />
            <p class="name">Rohan M. </p>
            <p class="title">Founder, Tech Innovators</p>
          </figcaption>
          <blockquote>
            <h3 class="quote-part-1">"Effortless Content Creation"

            </h3>
            <p class="quote-part-2">
                "Managing a startup and creating engaging content was overwhelming until I found this service. The AI-generated blogs are precise, the images are professional, and the ad generation for social media is fantastic. It's like having an entire creative team at my fingertips!" <br/>
                "I was particularly impressed by the blog generation feature. It not only saves me hours of writing but also ensures that the content is SEO-friendly and engaging. The fact that I can produce high-quality images based on simple prompts has added a new level of professionalism to our website and marketing materials. And the best part? The ad generation tool has given us the edge in targeting our customers on social media, driving conversions like never before."
            </p>
          </blockquote>
        </figure>
        <figure class="testimonial jonathan">
          <figcaption>
            <img
            src={l1}
            alt=""
              width="35"
            />
            <p class="name">Priya S. 
            </p>
            <p class="title">CEO, GreenLeaf Solutions</p>
          </figcaption>
          <blockquote>
            <h3 class="quote-part-1">
                "A Must-Have for Every Startup"
            </h3>
            <p class="quote-part-2">
                "As a startup founder, I struggled to keep up with content creation. This platform delivered exactly what I needed—high-quality blogs, stunning images, and social media ads that truly resonate with our audience. It’s been a game-changer for us."
            </p>
          </blockquote>
        </figure>
        <figure class="testimonial jeanette">
          <figcaption>
            <img
            src={l2}
            alt=""
              width="35"
            />
            <p class="name">Anjali R.  </p>
            <p class="title">Co-Founder, Bright Minds Tech</p>
          </figcaption>
          <blockquote>
            <h3 class="quote-part-1">
                "The Perfect Solution for Content Needs"

            </h3>
            <p class="quote-part-2">
                "Creating fresh and relevant content has always been a challenge. This platform solved that problem for us. The AI writes blogs in our tone, the image generator is incredible, and the social media ads have boosted our engagement. A must-have for startups!"
            </p>
          </blockquote>
        </figure>
        <figure class="testimonial patrick">
          <figcaption>
            <img
            src={m2}
            alt=""
              width="35"
            />
            <p class="name">Arjun K.</p>
            <p class="title">Owner, Startup Labs</p>
          </figcaption>
          <blockquote>
            <h3 class="quote-part-1">
                "Transforming Our Marketing"
            </h3>
            <p class="quote-part-2">
                "I was skeptical at first, but this platform exceeded my expectations. The AI effortlessly generates blog posts, beautiful images, and even social media ads. It feels like having a full creative team without the overheads. Highly recommended!"<br/>
                <br/>"When I first tried this service, I didn’t expect the level of quality it delivered. The AI blogs are structured perfectly, with a natural flow that feels like a human wrote them. The AI-generated images have been crucial for keeping our brand visually consistent across platforms. And the ad generation tool? It’s taken our social media marketing to the next level. We’ve been able to run more effective ads with less effort, freeing up time to focus on scaling the business and refining our product offerings."                
            </p>
          </blockquote>
        </figure>  
        <figure class="testimonial kira">
          <figcaption>
            <img
            src={l3}
            alt=""
              width="35"
            />
            <p class="name">Meera P.</p>
            <p class="title"> Founder, Innovate India</p>
          </figcaption>
          <blockquote>
            <h3 class="quote-part-1">
                "A Game-Changer for Growing Startups"
                </h3>
                <p class="quote-part-2">
                "This service has transformed our content strategy! From blog generation to social media ads, everything is seamless and efficient. We’ve seen a spike in engagement thanks to the AI-driven content. Perfect for founders looking to scale fast!"<br/>
                "Before finding this platform, we were struggling to produce enough content to keep up with our growth. Now, blog generation is as simple as clicking a button. I can focus on other core aspects of the business while knowing that the AI is handling our content creation needs. The AI-generated images are spot-on and look like they’ve been custom-made by a designer. The social media ads have been a revelation, allowing us to run more targeted and visually appealing campaigns."
            </p>
          </blockquote>
        </figure>
      </section>
    </div>
  )
}

export default Testimonials