import * as React from "react";
import styled from "styled-components";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import symbol from "../../assets/symbol.webp";
import img1 from "../../assets/img1.webp";
import img2 from "../../assets/img2.webp";
import img3 from "../../assets/img3.webp";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination, Autoplay]);

/*global Kakao*/

const Prelogin = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  height: 100vh;
`;
const ImgBox = styled.div`
  @media screen and (min-width: 720px) {
    width: 70vh;
    margin: auto;
  }
  height: 70vh;
  width: 100vw;
  img {
    height: 70vh;
    width: 100vw;
    @media screen and (min-width: 720px) {
      width: 70vh;
      margin: auto;
    }
  }
`;

const BtnBox = styled.div`
  @media screen and (min-width: 720px) {
    width: 70vh;
    margin: auto;
  }
  height: 30vh;
  .copyright {
    position: fixed;
    bottom: 4px;
    width: 100%;
    @media screen and (min-width: 720px) {
      width: 70vh;
    }
    margin: auto;
    text-align: center;
  }
`;
const Btn = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  width: 90%;
  height: 30%;
  border: none;
  border-radius: 10px;
  margin: 3% auto 0;
  @media screen and (min-width: 720px) {
    width: 60vh;
    margin: 3% auto 0;
  }
`;
const KakaoBtn = styled(Btn)`
  background-color: #ffcd00;
`;
const ZoaBtn = styled(Btn)`
  background: linear-gradient(90deg, #ff787f, #fec786);
`;
const IconBox = styled.div`
  margin: auto;
`;
const TextBox = styled.div`
  margin: auto;
`;

function SlideBox() {
  return (
    <ImgBox>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        loop={true}
      >
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" />
        </SwiperSlide>
      </Swiper>
    </ImgBox>
  );
}

function Btns() {
  const navigate = useNavigate();
  const NavZoa = () => {
    navigate(`/login`);
  };

  const clickKakaoLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: `${process.env.REACT_APP_FE_HOST}/kakaoLoading/`,
    });
  };

  return (
    <BtnBox>
      <KakaoBtn onClick={clickKakaoLogin}>
        <IconBox>
          <RiKakaoTalkFill size="28" color="#471A00" />
        </IconBox>
        <TextBox>
          <p color="#471A00">카카오계정으로 시작하기</p>
        </TextBox>
      </KakaoBtn>
      <ZoaBtn onClick={NavZoa}>
        <IconBox>
          <img src={symbol} alt="zoaSymbol" style={{ width: "24px" }} />
        </IconBox>
        <TextBox>
          <p>좋아계정으로 시작하기</p>
        </TextBox>
      </ZoaBtn>
      <p className="copyright">Copyright @B103</p>
    </BtnBox>
  );
}

function prelogin() {
  return (
    <Prelogin>
      <SlideBox></SlideBox>
      <Btns></Btns>
    </Prelogin>
  );
}

export default prelogin;
