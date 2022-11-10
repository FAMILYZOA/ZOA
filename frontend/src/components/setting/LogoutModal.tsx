import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import Modal from "react-modal";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setAccessToken, setRefreshToken } from "../../features/token/tokenSlice";
import axios from "axios";

type modalType = {
  isOpen: boolean;
  toggle: any;
};

const CloseBtnStyle = styled(GrClose)`
  position: absolute;
  right: 1em;
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
  line-height: 36px;

  height: 3.7em;
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
  height: 2.2em;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  /* or 20px */

  letter-spacing: -0.01em;

  color: #ffffff;

  background: #ff787f;
  border-radius: 0.5em;
`;

const LogoutModal = (props: modalType) => {
  const [isModal, toggleModal] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.token.access);
  const refreshToken = useAppSelector(state => state.token.refresh);

  const modalStyle = {
    content: {
      inset: "35% 5%",
      width: "80%",
      height: "30%",
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
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACK_HOST}/accounts/logout/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        refresh: `${refreshToken}`
      }
    })
      .then(() => {
        dispatch(setAccessToken("")); // 로그아웃 하기
        dispatch(setRefreshToken(""))
        props.toggle(false);
        navigate("/intro", { replace: true });
      })
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
