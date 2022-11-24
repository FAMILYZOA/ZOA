import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import Modal from "react-modal";
import styled from "styled-components";
import { detect } from "detect-browser";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setAccessToken,
  setRefreshToken,
} from "../../features/token/tokenSlice";
import { setFamilyUsers } from "../../features/family/familySlice";
import { AuthRefresh } from "../../api/customAxios";
import { setUserImage } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toggleUpload } from "../../features/mobile/mobileSlice";

type modalType = {
  isOpen: boolean;
  toggle: any;
  currentImage: string;
};

const CloseBtnStyle = styled(GrClose)`
  position: absolute;
  right: 1em;
`;

const ModalContentDiv = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageTitleDiv = styled.div`
  letter-spacing: 1.25px;
  color: #ff787f;
  margin-bottom: 1em;
  text-align: center;
`;
const ImageBodyDiv = styled.div`
  width: 8em;
  height: 8em;
`;
const TempShowImage = styled.img`
  width: 8em;
  height: 8em;
  border-radius: 4em;
`;
const ButtonDiv = styled.div`
  display: flex;
  margin-top: 0.8em;
  width: 100%;
  justify-content: center;
`;
const ConfirmButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 35%;
  height: 2em;

  color: #fff;
  background-color: #ff787f;
  border-radius: 0.4em;
  margin-right: 0.4em;
`;
const CancelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 35%;
  height: 2.2em;

  box-sizing: border-box;

  color: #aaa;
  border: 2px solid #aaa;
  border-radius: 0.4em;
`;

const FontModal = (props: modalType) => {
  const [isModal, toggleModal] = useState<boolean>(true);
  const [tempImage, setTempImage] = useState<string>(props.currentImage);
  const [photo, setPhoto] = useState<File>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accessToken = useAppSelector((state) => state.token.access);
  const refreshToken = useAppSelector((state) => state.token.refresh);
  const familyId = useAppSelector((state) => state.family.id);
  const isUpload = useAppSelector((state) => state.mobile.isUpload);

  // 모바일 연동
  const getOS = () => {
    const browser = detect();
    if (browser) {
      return browser.os;
    }
  };

  const [os] = useState(getOS());

  const modalStyle = {
    content: {
      inset: "30% 5%",
      width: "80%",
      borderRadius: "2vh",
      border: "none",
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      display: "flex",
      justifyContent: "center",
      padding: "28px",
    },
  };

  const saveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const file = (target.files as FileList)[0];
    setTempImage(URL.createObjectURL(file));
    setPhoto(file);
  };

  const deleteFile = () => {
    URL.revokeObjectURL(tempImage);
    setTempImage("");
    setPhoto(undefined);
  };

  const photoInput = useRef<any>();
  const handleClick = () => {
    if ((os === "Android OS" || os === "iOS") && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage("imagePicker,profile");
      console.log('here');
      
      dispatch(toggleUpload(true));
      //props.toggle(false);
    } else {
      photoInput.current.click();
    }
  };

  const closeModal = () => {
    URL.revokeObjectURL(tempImage);
    setTempImage("");
    setPhoto(undefined);
    props.toggle(false);
  };

  const confirmModal = () => {
    if (os === "Android OS" || os === "iOS") {
      props.toggle(false);
    } else {
      const data = new FormData();
      if (photo !== undefined) {
        data.append("image", photo);
        axios({
          method: "PUT",
          url: `${process.env.REACT_APP_BACK_HOST}/accounts/profile/`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: data,
        })
          .then((res) => {
            dispatch(setUserImage(res.data.image));
            if (familyId >= 0) {
              axios({
                method: "get",
                url: `${process.env.REACT_APP_BACK_HOST}/family/${familyId}`,
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }).then((res) => {
                dispatch(setFamilyUsers(res.data.users));
              });
            }
          })
          .catch(async (err) => {
            switch (err.response.status) {
              case 401:
                const code = err.response.data.code;
                if (code === "token_not_valid") {
                  const tokens = await AuthRefresh(refreshToken);
                  if (tokens) {
                    dispatch(setAccessToken(tokens.access));
                    dispatch(setRefreshToken(tokens.refresh));
                  } else {
                    dispatch(setAccessToken(""));
                    dispatch(setRefreshToken(""));

                    navigate("/login", { replace: true });
                  }
                }
                break;
              default:
                break;
            }
          });
        props.toggle(false);
      }
    }
  };

  return (
    <Modal
      isOpen={isModal}
      ariaHideApp={false}
      style={modalStyle}
      onRequestClose={closeModal}
    >
      <CloseBtnStyle fontSize={16} color={"#888888"} onClick={closeModal} />
      {isUpload ? (
        <img src={"https://user-images.githubusercontent.com/97648026/203671082-b52fcbc8-84d6-433e-be2f-f02800aef8ec.gif"} alt="profile loading spinner" />
      ) : (
        <ModalContentDiv>
          <ImageTitleDiv>프로필 이미지 변경</ImageTitleDiv>
          <ImageBodyDiv>
            <TempShowImage src={tempImage} alt="" onClick={handleClick} />
            <input
              type="file"
              name="imgUpload"
              accept="image/*"
              onChange={saveFile}
              style={{ display: "none" }}
              ref={photoInput}
            />
          </ImageBodyDiv>
          <ButtonDiv>
            <ConfirmButton onClick={confirmModal}>확인</ConfirmButton>
            <CancelButton onClick={closeModal}>취소</CancelButton>
          </ButtonDiv>
        </ModalContentDiv>
      )}
    </Modal>
  );
};

export default FontModal;
