import React from "react";
import Slider from "react-slick";
import './slick-theme.css';
import './slick.css';
import styled from "styled-components";

const Contents = styled.div`
    margin: 16px 8px;
`
const Text = styled.div`
    font-size: 16px;
    margin: 0 4px 0 0;
    width: 90%;
    height: 3vh;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const From = styled.p`
  text-align: end;
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #444444;
  width: 95%;
`;

function Announcement() {
    const settings = {
        slide: 'Contents',
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
            <Contents>
                <Text>📢오늘 저녁 밖에서 먹고 들어갈게 dddddddddddddddddddddddddddddddddd</Text>
                <From>From.아빠(신형식)</From>
            </Contents>
                    
        </Slider>

    )
}

export default Announcement;