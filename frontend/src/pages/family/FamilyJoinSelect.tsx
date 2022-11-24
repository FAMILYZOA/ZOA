import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { IoLogOut } from "react-icons/io5";
import { useAppDispatch } from "./../../app/hooks";
import {
  setAccessToken,
  setRefreshToken,
} from "../../features/token/tokenSlice";
import { setFcmTokenId } from "../../features/mobile/mobileSlice";
import axios from "axios";

const logo =
  "https://user-images.githubusercontent.com/97648026/203668440-eb211853-8abe-4dc5-b0ee-8912e5cfefa3.png";
const greeting =
  "https://user-images.githubusercontent.com/97648026/203668446-aeea6d99-71d8-4968-b019-5b73253dc17a.png";
const HeaderBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  z-index: 1;
`;

const IconBox = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  img {
    height: 32px;
  }
`;
const Greetings = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2.4em;
  font-weight: 700;
  object-fit: contain;
`;
const Guide = styled.div`
  width: 80%;
  margin: 0 auto 1.6em;
  font-size: 0.8em;
  text-align: center;
  color: #707070;
  line-height: 1.3em;
`;
const JoinContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3em 0 0;
`;
const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
`;
const FamilyCreateBtn = styled.button`
  width: 90%;
  height: 56px;
  margin: auto;
  background: #fec786;
  border: none;
  border-radius: 16px;
  font-weight: bold;
  font-size: 1.1em;
  color: white;
`;
const FamilyParticipateBtn = styled.button`
  width: 90%;
  height: 56px;
  margin: auto;
  background: #fe9b7c;
  border: none;
  border-radius: 16px;
  font-weight: bold;
  font-size: 1.1em;
  color: white;
`;

const FamilyJoinSelect = () => {
  const navigate = useNavigate();
  const familyId = useAppSelector((state) => state.family.id);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.token.access);
  const refreshToken = useAppSelector((state) => state.token.refresh);
  const fcmTokenId = useAppSelector((state) => state.mobile.fcmTokenId);
  useEffect(() => {
    if (familyId >= 0) {
      navigate("/");
    }
  }, [familyId]);

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACK_HOST}/accounts/logout/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          refresh: `${refreshToken}`,
        },
      }).then(() => {
        dispatch(setAccessToken("")); // 로그아웃 하기
        dispatch(setRefreshToken(""));
        localStorage.removeItem("token");
        axios({
          method: "DELETE",
          url: `${process.env.REACT_APP_BACK_HOST}/event/FCM/${fcmTokenId}/`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((res) => {
            dispatch(setFcmTokenId(""));
          })
          .catch((err) => {
            console.log(err);
          });
        navigate("/intro", { replace: true });
      });
    } else {
    }
  };

  return (
    <>
      <HeaderBox>
        <div></div>
        <ImgBox>
          <img src={logo} alt="" />
        </ImgBox>
        <IconBox onClick={logout}>
          <IoLogOut size="24" color="#ff787f" />
        </IconBox>
      </HeaderBox>
      <JoinContents>
        <div style={{ width: "100%" }}>
          <Greetings>
            <img
              style={{ objectFit: "contain", width: "80%" }}
              src={greeting}
              alt="어서오세요!"
            />
          </Greetings>
          <Guide>
            가족 생성/참여하여 <br /> 구성원들과 하루를 공유해보세요!
          </Guide>
          <BtnBox>
            <FamilyCreateBtn
              onClick={() => {
                navigate("/family/create");
              }}
            >
              가족 생성하기
            </FamilyCreateBtn>
          </BtnBox>
          <BtnBox>
            <FamilyParticipateBtn
              onClick={() => {
                navigate("/family/code");
              }}
            >
              참여코드로 참여하기
            </FamilyParticipateBtn>
          </BtnBox>
        </div>
      </JoinContents>
    </>
  );
};

export default FamilyJoinSelect;
