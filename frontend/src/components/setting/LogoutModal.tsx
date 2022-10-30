import { useState } from "react";
import { GrClose } from "react-icons/gr";
import Modal from "react-modal";
import styled from "styled-components";

type modalType = {
    isOpen:boolean,
    toggle:any,
}

const CloseBtnStyle = styled(GrClose)`
  position: relative;
  left: 68vw;
`;

const LogoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogouTitleStyle = styled.p`
  margin: 0;

  /* Pretendard-20 */
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 36px;
  /* identical to box height, or 180% */

  letter-spacing: 1.25px;

  /* Peach */

  color: #ff787f;
`;

const LogoutDescStyle = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 36px;
  /* or 180% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 1.25px;
  text-transform: uppercase;

  color: #000000;
`;

const LogoutBtnStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: auto;
  margin-top: 20px;
  width: 35%;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  /* or 20px */

  letter-spacing: -0.01em;

  color: #ffffff;

  background: #ff787f;
  border-radius: 10px;

  p {
    margin-top: 12px;
    margin-bottom: 12px;
  }
`;

const LogoutModal = (props: modalType) => {
  const [isModal, toggleModal] = useState<boolean>(true);

  const modalStyle = {
    content: {
      top: "35%",
      bottom: "35%",
      borderRadius: "16px",
    },
  };

  const closeModal = () => {
    props.toggle(false);
  };

  const comfirmModal = () => {
    // 로그아웃 하기
    props.toggle(false);
  };

  return (
    <Modal
      isOpen={isModal}
      ariaHideApp={false}
      style={modalStyle}
      onRequestClose={closeModal}
    >
      <CloseBtnStyle fontSize={16} color={"#888888"} onClick={closeModal} />
      <LogoutStyle>
        <LogouTitleStyle>로그아웃</LogouTitleStyle>
        <LogoutDescStyle>정말 로그아웃 하시겠습니까?</LogoutDescStyle>
        <LogoutBtnStyle onClick={comfirmModal}>
          <p>확인</p>
        </LogoutBtnStyle>
      </LogoutStyle>
    </Modal>
  );
};


export default LogoutModal;
