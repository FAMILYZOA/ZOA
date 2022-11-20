import React, { useState } from "react";
import styled from "styled-components";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import guide from "../../assets/mainmain_guide.png";
import Modal from "react-modal";
import { BsQuestionCircleFill } from "react-icons/bs";

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  z-index: 1;
`;

const FamilyName = styled.div`
  margin: 16px;
  font-size: 1.25em;
  font-weight: 900;
  color: #ff787f;
`;
const EditFamilyIcon = styled.div`
  margin: 16px;
`;
const Icon = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
`;
const ImgTag = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  margin: 0;
`

function Header() {
  const navigate = useNavigate();
  const familyName = useAppSelector((state) => state.family.name);
  const MoveFamilyEdit = () => {
    navigate("/family/manage");
  };
    // 모달 설정
    const [showModal, setShowModal] = useState(false);  
    const openModal = () => {
      setShowModal(true);
    };
    const closeModal = () => {
      setShowModal(false);
    };
    const modalStyle = {
      content: {
        inset:" 2% 2%",
        width: "96%",
        height: "96%",
        border: "none",
        backgroundColor: "rgba(0,0,0,0)",
        display: "flex",
        justifyContent: "center",
        padding: "0"
      },
    };
  return (
    <>
    <Modal
      isOpen={showModal}
      ariaHideApp={false}
      onRequestClose={closeModal}
      style={modalStyle}
    >
      <ImgTag src={guide} alt="" onClick={closeModal} />
    </Modal>
    <HeaderBox>
      <FamilyName>
        <p>{familyName}</p>
      </FamilyName>
      <div style={{display: "flex"}}>
        <Icon onClick={openModal}>
        <BsQuestionCircleFill size="24" color="#ff787f" />
        </Icon>
        <EditFamilyIcon onClick={MoveFamilyEdit}>
          <FaUsers size="24" color="#ff787f" />
        </EditFamilyIcon>
      </div>
    </HeaderBox>
    </>
  );
}

export default Header;
