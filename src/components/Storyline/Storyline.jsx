import React from "react";
import Swiper from "swiper";
import { Pagination } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/pagination';
import "./Storyline.scss";


class Storyline extends React.Component {
  componentDidMount() {
    // Initialize Swiper
    this.swiper = new Swiper(".blog-slider", {
      spaceBetween: 30,
      effect: "fade",
      loop: true,
      speed: 800, // Adjust the speed of the slide transition (in milliseconds)
      pagination: {
        el: ".blog-slider__pagination",
        clickable: true,
      },
      on: {
        init: () => {
          const sliderContainer = document.querySelector('.blog-slider');
          if (sliderContainer) {
            sliderContainer.addEventListener("wheel", this.handleScroll);
          }
        },
      },
    });
  }

  componentWillUnmount() {
    const sliderContainer = document.querySelector('.blog-slider');
    if (sliderContainer) {
      sliderContainer.removeEventListener("wheel", this.handleScroll);
    }
  }

  handleScroll = (e) => {
    if (e.deltaY > 0) {
      this.swiper.slideNext(); // Scroll down, go to next slide
    } else if (e.deltaY < 0) {
      this.swiper.slidePrev(); // Scroll up, go to previous slide
    }
  };

  render() {
    return (
      <div className="slider-body">
        <h2 style={{textAlign:"center",marginBottom:"60px"}}>Steps for Website Builder</h2>
        <div className="blog-slider">
          <div className="blog-slider__wrp swiper-wrapper">
          <div class="blog-slider__item swiper-slide">
      <div class="blog-slider__img">
        
        <img className="_img" src="https://img.freepik.com/free-photo/web-design-online-technology-content-concept_53876-123927.jpg?t=st=1726057549~exp=1726061149~hmac=16982bde4d226690adcbbb7d6f45144717d227e060105cb6a7473d1ec392605a&w=1060" alt=""/>
      </div>
      <div class="blog-slider__content">
        <span class="blog-slider__code">Step - 1</span>
        <div class="blog-slider__title">Build Website</div>
        <div class="blog-slider__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi? </div>
        <a href="#" class="blog-slider__button">READ MORE</a>
      </div>
    </div>
    <div class="blog-slider__item swiper-slide">
      <div class="blog-slider__img">
        <img className="_img" src="https://img.freepik.com/free-photo/close-up-hand-holding-card_23-2149241415.jpg?t=st=1726057577~exp=1726061177~hmac=c7de6e57727748fd01dd3f074501c4489e4d91ef0d7b08edfd68e34f2d30645b&w=360" alt=""/>
      </div>
      <div class="blog-slider__content">
        <span class="blog-slider__code">Step - 2</span>
        <div class="blog-slider__title">Build E-commerce website</div>
        <div class="blog-slider__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?</div>
        <a href="#" class="blog-slider__button">READ MORE</a>
      </div>
    </div>
    
    <div class="blog-slider__item swiper-slide">
      <div class="blog-slider__img">
        <img className="_img" src="https://img.freepik.com/premium-photo/woman-bright-red-sweater-is-depicted-as-emerging-from-smartphone_1272475-8194.jpg?w=740" alt=""/>
      </div>
      <div class="blog-slider__content">
        <span class="blog-slider__code">Step - 3</span>
        <div class="blog-slider__title">Create Social media advertisements</div>
        <div class="blog-slider__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?</div>
        <a href="#" class="blog-slider__button">READ MORE</a>
      </div>
    </div>
    <div class="blog-slider__item swiper-slide">
      <div class="blog-slider__img">
        <img className="_img" src="https://img.freepik.com/free-photo/representation-user-experience-interface-design_23-2150169844.jpg?t=st=1726057572~exp=1726061172~hmac=2a16f5af6c109f6b42d252ce13e3dc37f2a11f91024ff08cae4e6381b352bb08&w=900" alt=""/>
      </div>
      <div class="blog-slider__content">
        <span class="blog-slider__code">Step - 4</span>
        <div class="blog-slider__title">Omni channel analytics</div>
        <div class="blog-slider__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?</div>
        <a href="#" class="blog-slider__button">READ MORE</a>
      </div>
    </div>
          </div>
          <div className="blog-slider__pagination"></div>
        </div>
      </div>
    );
  }
}

export default Storyline;
