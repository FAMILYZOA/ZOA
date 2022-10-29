import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { BsCheckLg } from "react-icons/bs";
import { FaChevronUp } from "react-icons/fa";

interface propStyle {
  status?: any;
}

const CheckDetail = styled.div`
  position: relative;
  height: 10vh;
  border-radius: 1vh;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  padding: 1.5vh 2vh;
  margin-bottom: 2vh;
`;
const CheckDetailTitle = styled.div`
  font-size: 2.25vh;
`;
const CheckDetailDate = styled.div`
  color: #707070;
  font-size: 1.75vh;
  margin-top: 0.5vh;
`;
const CheckDetailChevron = styled.div`
  position: absolute;
  right: 2vh;
  top: 2vh;
  color: #000;
`;

const CheckDiv = styled.div`
  display: flex;
  margin-bottom: 2vh;
`;
const CheckBox = styled.div<propStyle>`
  // status 값이 false일 경우 비체크, true일 경우 체크
  ${({ status }) => {
    if (status) {
      return css`
        background-color: #fad7d4;
      `;
    } else {
      return css`
        box-sizing: border-box;
        border: 3px solid #ff787f;
      `;
    }
  }}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3vh;
  height: 3vh;
  border-radius: 0.5vh;
  color: #fff;
`;

const CheckTitle = styled.div<propStyle>`
  // status 값이 false일 경우 비체크, true일 경우 체크
  ${({ status }) => {
    if (status) {
      return css`
        color: #888;
        text-decoration-line: line-through;
      `;
    }
  }}
  margin-left: 1vh;
  font-size: 2.25vh;
  line-height: 3vh;
  font-weight: 400;
  flex: 1;
`;

type CheckItemProps = {
  item: { id: number; text: string; status: boolean; to_user_id: number };
  index: number,
  getDetailSelect: (index: number) => void,
  detailOff: () => void,
  onDetail: number,
};

function CheckItem({ item, index, getDetailSelect, detailOff, onDetail }: CheckItemProps) {
  const onClick = (id: number) => {
    console.log(`${id} clicked`);
  };

  const onToggle = () => {
    if (toggle) {
      detailOff();
    } else {
      getDetailSelect(index);
    }
  };

  const offToggle = () => {
    setToggle(false);
    detailOff();
  }
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    if (onDetail === index) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  },[onDetail])

  return (
    <>
      <CheckDiv>
        <CheckBox onClick={() => onClick(item.id)} status={item.status}>
          <div>{item.status && <BsCheckLg />}</div>
        </CheckBox>
        <CheckTitle onClick={() => onToggle()} status={item.status}>
          {item.text}
        </CheckTitle>
      </CheckDiv>
      {toggle && (
        <CheckDetail>
          <CheckDetailChevron onClick={() => offToggle()}>
            <FaChevronUp />
          </CheckDetailChevron>
          <CheckDetailTitle>From. 엄마(봉미선)</CheckDetailTitle>
          <CheckDetailDate>2022. 10. 13</CheckDetailDate>
        </CheckDetail>
      )}
    </>
  );
}

export default CheckItem;
