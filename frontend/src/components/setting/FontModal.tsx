import { useEffect } from "react";
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

const FontDescStyle = styled.p`
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

const FontSliderLabelStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const FontSlider = styled.input`
  width: 100%;
  margin: 0;
  background: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    position: relative;
    bottom: 6px;
    background: #ff787f,
  }

  &::-webkit-slider-runnable-track {
    height: 2px;
    background-color: #bebebe;
  }
`;

const PreviewDescStyle = styled.p`
  margin-top: 12px;
  margin-bottom: 12px;

  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 36px;
  /* identical to box height, or 180% */

  letter-spacing: 1.25px;
  text-transform: uppercase;

  /* Grey Light */

  color: #aaaaaa;
`;

const PreviewStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* Peach */
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  /* identical to box height, or 180% */

  letter-spacing: 1.25px;
  text-transform: uppercase;

  color: #000000;

  border: 1px solid #ff787f;
  border-radius: 8px;
`;

const FontBtnStyle = styled.div`
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

const FontModal = (props: modalType) => {
  const [sliderValue, setSliderValue] = useState<number>(2);
  const [isModal, toggleModal] = useState<boolean>(true);


  const modalStyle = {
    content: {
      top: "25%",
      bottom: "30%",
      borderRadius: "16px",
    },
  };

  const sliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.currentTarget.value));
  };

  const closeModal = () => {
    props.toggle(false);
  };

  const comfirmModal = () => {
    // 전체 폰트 바꾸기..?
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
      <div>
        <FontDescStyle>글자 크기</FontDescStyle>
        <div>
          <FontSliderLabelStyle>
            <p style={{ fontSize: "16px", margin: 0 }}>작게</p>
            <p style={{ fontSize: "20px", margin: 0 }}>보통</p>
            <p style={{ fontSize: "24px", margin: 0 }}>크게</p>
          </FontSliderLabelStyle>
          <FontSlider
            type={"range"}
            min={"1"}
            max={"3"}
            value={sliderValue}
            onInput={sliderChange}
            onChange={sliderChange}
          />
        </div>
        <PreviewDescStyle>미리보기</PreviewDescStyle>
        <PreviewStyle>
          {sliderValue === 1 ? (
            <p style={{ fontSize: "16px" }}>다람쥐 헌 챗바퀴에 타고파</p>
          ) : sliderValue === 2 ? (
            <p style={{ fontSize: "20px" }}>다람쥐 헌 챗바퀴에 타고파</p>
          ) : (
            <p style={{ fontSize: "24px" }}>다람쥐 헌 챗바퀴에 타고파</p>
          )}
        </PreviewStyle>
        <FontBtnStyle onClick={comfirmModal}>
          <p>확인</p>
        </FontBtnStyle>
      </div>
    </Modal>
  );
};

export default FontModal;
