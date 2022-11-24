import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const notFound = 'https://user-images.githubusercontent.com/97648026/203670091-9321f2de-9794-42f5-8a2e-a3d0181e4e07.png';

const NotFound = () => {
    const navigate = useNavigate();
    console.log(("404"));

    return(
        <NotFoundWrapper>
            <NotFoundImageWrapper>
                <NotFoundImage src={notFound} />
                <MainLink onClick={() => navigate("/intro")}>
                    메인으로 가기
                </MainLink>
            </NotFoundImageWrapper>
        </NotFoundWrapper>
    )
};

const NotFoundWrapper = styled.div`
  overflow: hidden;
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotFoundImageWrapper = styled.div`
  min-width: 300px;
  width: 100%;
  height: 90%;
  max-width: 800px;
  max-height: 800px;
  position: relative;
`;

const NotFoundImage = styled.img`
  border-radius: 40px;
  object-fit: fill;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const MainLink = styled.div`
  position: absolute;
  font-size: 30px;
  -webkit-text-decoration: none;
  text-decoration: none;
  color: black;
  bottom: 5%;
  left: 50% !important;
  transform: translate(-50%);

  font-weight: 700;
  @media screen and (max-width: 1320px) {
    left: 30%;
    font-size: 28px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 27px;
  }
  @media screen and (max-width: 1180px) {
    font-size: 24px;
  }
  @media screen and (max-width: 1000px) {
    font-size: 20px;
  }
  @media screen and (max-width: 790px) {
    font-size: 16px;
  }
  @media screen and (max-width: 710px) {
    font-size: 24px;
  }
`;

export default NotFound;