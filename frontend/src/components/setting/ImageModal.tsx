import axios from "axios";
import React, { useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import Modal from "react-modal";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUserImage } from "../../features/user/userSlice";

type modalType = {
  isOpen: boolean;
  toggle: any;
  currentImage: string;
};

const CloseBtnStyle = styled(GrClose)`
  position: absolute;
  right: 2.5vh;
`;

const ModalContentDiv = styled.div`
  width: 85vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageTitleDiv = styled.div`
  letter-spacing: 1.25px;
  color: #ff787f;
  margin-bottom: 5.5vmin;
  text-align: center;
`;
const ImageBodyDiv = styled.div`
  width: 44vmin;
  height: 44vmin;
`;
const TempShowImage = styled.img`
  width: 44vmin;
  height: 44vmin;
  border-radius: 22vmin;
`;
const ButtonDiv = styled.div`
  display: flex;
  margin-top: 4.5vmin;
`;
const ConfirmButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 35vw;
  height: 11vmin;

  color: #fff;
  background-color: #ff787f;
  border-radius: 2.2vmin;
  margin-right: 2.2vmin;
`;
const CancelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 35vw;
  height: 12vmin;

  box-sizing: border-box;

  color: #aaa;
  border: 2px solid #aaa;
  border-radius: 2.25vmin;
`;

const FontModal = (props: modalType) => {
  const [isModal, toggleModal] = useState<boolean>(true);
  const [tempImage, setTempImage] = useState<string>(props.currentImage);
  const [photo, setPhoto] = useState<File>();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.token.access);

  const modalStyle = {
    content: {
      top: "27.5vh",
      bottom: "27.5vh",
      left: "4vw",
      right: "4vw",
      borderRadius: "2vh",
      border: "none",
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      display: "flex",
      justifyContent: "center",
      padding: "3.5vw",
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
    photoInput.current.click();
  };

  const closeModal = () => {
    URL.revokeObjectURL(tempImage);
    setTempImage("");
    setPhoto(undefined);
    props.toggle(false);
  };

  const confirmModal = () => {
    const data = new FormData();
    if (photo !== undefined) {
      data.append("image", photo);
      console.log(photo);
      console.log(data);
      axios({
        method: "PUT",
        url: `${process.env.REACT_APP_BACK_HOST}/accounts/profile/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      })
        .then((res) => {
          console.log("Profile Image submitted");
          console.log(res.data);
          dispatch(setUserImage(res.data.image));
        })
        .catch((err) => {
          console.error(err);
        });
      props.toggle(false);
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
    </Modal>
  );
};

export default FontModal;
