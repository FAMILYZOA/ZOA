import React, { Component } from "react";
import Slider from "react-slick";
import './slick-theme.css';
import './slick.css';
import styled from "styled-components";


function Announcement() {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        spped: 500,
        autoplay:true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        sidesToScroll: 1,
        vertical: true,
        draggable: true,
    }
    return (
        <Slider {...settings}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
                    
        </Slider>

    )
}

export default Announcement;