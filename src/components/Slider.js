import React, { Component } from "react";
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Slider {...settings}>
          <div className="slider-img">
            <img alt="" src={"https://picsum.photos/1500/700?random=1"} />
          </div>
          <div className="slider-img">
            <img alt="" src={"https://picsum.photos/1500/700?random=2"} />
          </div>
          <div className="slider-img">
            <img alt="" src={"https://picsum.photos/1500/700?random=3"} />
          </div>
          <div className="slider-img">
            <img alt="" src={"https://picsum.photos/1500/700?random=4"} />
          </div>
        </Slider>
      </div>
    );
  }
}
