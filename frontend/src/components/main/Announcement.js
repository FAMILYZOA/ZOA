import React from "react";
import Slider from "react-slick";
import "./slick-theme.css";
import "./slick.css";
import styled from "styled-components";

const Contents = styled.div`
  margin: 16px 8px;
  z-index: 4;
`;
const Text = styled.div`
  font-size: 16px;
  margin: 0 4px 0 0;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const From = styled.p`
  text-align: end;
  margin: 4px 0 8px 0;
  font-size: 14px;
  color: #444444;
  width: 95%;
`;

function Announcement({ scrum }) {
  const settings = {
    slide: "Contents",
    dots: false,
    arrows: false,
    infinite: true,
    spped: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    sidesToScroll: 1,
    vertical: true,
    draggable: true,
    adaptiveHeight: true,
  };
  return (
    <Slider {...settings}>
      {scrum.length === 0 ? (
        <Contents>
          <Text>📢 '안녕'에서 가족들에게 한마디를 작성해보세요! </Text>
        </Contents>
      ) : (
        scrum.map((item, index) =>
            item.today.length > 1 ? (
              <Contents key={index}>
                <Text>📢 {item.today}</Text>
                <From>
                  From.{item.set_name}({item.name})
                </From>
              </Contents>
            ) : (
              <Contents key={index}>
                <Text>📢 오늘의 공지가 없습니다.</Text>
                <From>
                  From.{item.set_name}({item.name})
                </From>
              </Contents>
            )
          )
      )}
    </Slider>
  );
}

export default Announcement;
