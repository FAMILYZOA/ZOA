import * as React from 'react';
import styled from "styled-components";
import symbol from "../../assets/symbol.png";
import {RiKakaoTalkFill} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom';

/*global Kakao*/


const Prelogin = styled.div`
    display: grid;
    grid-template-rows: 2fr 1fr;
    height: 100vh;
`
const ImgBox = styled.div`
    @media screen and (min-width: 720px) {
        width: 70vh;
        margin: auto;
    }
    height: 70vh;
    background-color: gray;

`

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
  font-size: 18px;
`;
const KakaoBtn = styled(Btn)`
  background-color: #FFCD00;
    
`;
const ZoaBtn = styled(Btn)`
  background: linear-gradient(90deg, #ff787f, #fec786);
`;
const IconBox = styled.div`
  margin: auto;
`;
const TextBox = styled.div`
    margin: auto;
`



function Btns(){
    const navigate = useNavigate();
    const NavZoa = () => {
        navigate(`/login`)
    }

    const clickKakaoLogin = () => {
      Kakao.Auth.authorize({
        redirectUri: "http://localhost:3000/",
      })
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
  return(
    <Prelogin>
        <ImgBox>이미지넣어죠</ImgBox>
        <Btns></Btns>
      </Prelogin>
  )
}

export default prelogin;
