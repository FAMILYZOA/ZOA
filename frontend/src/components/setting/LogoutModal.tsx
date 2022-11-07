import { useState } from "react";
import { GrClose } from "react-icons/gr";
import Modal from "react-modal";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { setAccessToken } from "../../features/token/tokenSlice";

type modalType = {
  isOpen: boolean;
  toggle: any;
};

const CloseBtnStyle = styled(GrClose)`
  position: absolute;
  right: 2.5vh;
`;

const LogoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogouTitleStyle = styled.div`
  /* Pretendard-20 */
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 36px;
  /* identical to box height, or 180% */

  letter-spacing: 1.25px;

  /* Peach */

  color: #ff787f;
`;

const LogoutDescStyle = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 36px;

  height: 9.5vh;
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

  width: 35vw;
  height: 5.5vh;

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
`;

const LogoutModal = (props: modalType) => {
  const [isModal, toggleModal] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const modalStyle = {
    content: {
      top: "35vh",
      bottom: "35vh",
      left: "4vw",
      right: "4vw",
      borderRadius: "2vh",
      border: "none",
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      display: "flex",
      justifyContent: "center",
    },
  };

  const closeModal = () => {
    props.toggle(false);
  };

  const comfirmModal = () => {
    dispatch(setAccessToken("")); // 로그아웃 하기
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
