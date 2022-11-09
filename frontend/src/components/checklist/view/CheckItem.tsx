import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { BsCheckLg } from "react-icons/bs";
import { FaChevronUp } from "react-icons/fa";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

interface propStyle {
  status?: any;
}
interface propDetail {
  toggle?: any;
}

const DetailWrap = styled.div<propDetail>`
  ${({ toggle }) => {
    if (!toggle) {
      return css`
        height: 0;
      `;
    } else {
      return css`
        height: 4em;
      `;
    }
  }}
  width: inherit;
  overflow: hidden;
  transition: height 0.35s ease;
`;
const CheckDetail = styled.div`
  position: relative;
  height: 4em;
  border-radius: 0.4em;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  padding: 0.6em 0.8em;
  margin-bottom: 0.8em;
`;
const CheckDetailTitle = styled.div`
  font-size: 0.9em;
`;
const CheckDetailDate = styled.div`
  color: #707070;
  font-size: 0.75em;
  margin-top: 0.2em;
`;
const CheckDetailChevron = styled.div`
  position: absolute;
  right: 0.8em;
  top: 0.8em;
  color: #000;
`;

const CheckDiv = styled.div`
  display: flex;
  margin-bottom: 0.8em;
`;
const CheckContent = styled.div`
  padding: 0.1px;
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
  width: 1.2em;
  height: 1.2em;
  border-radius: 0.2em;
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
  margin-left: 0.4em;
  font-size: 0.9em;
  line-height: 1.2em;
  font-weight: 400;
  flex: 1;
`;

type CheckItemProps = {
  item: { id: number; text: string; status: boolean; to_user_id: number };
  selectedMember: { id: number; name: string; image: string; set_name: string };
  index: number;
  getDetailSelect: (index: number) => void;
  detailOff: () => void;
  onDetail: number;
  refreshCheckList: (id: number) => void;
};

function CheckItem({
  item,
  index,
  getDetailSelect,
  detailOff,
  onDetail,
  refreshCheckList,
  selectedMember,
}: CheckItemProps) {
  const accessToken = useAppSelector((state) => state.token.access);
  const onClick = (id: number) => {
    console.log(`${id} clicked`);
    axios({
      method: "put",
      url: `${process.env.REACT_APP_BACK_HOST}/checklist/detail/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        status: !item.status,
      },
    })
      .then((res) => {
        console.log(res.data.status);
        refreshCheckList(selectedMember.id);
      })
      .catch((err) => {
        console.error(err);
      });
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
  };
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    if (onDetail === index) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [onDetail, index]);

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
      <DetailWrap toggle={toggle}>
        <CheckDetail>
          <CheckContent>
            <CheckDetailChevron onClick={() => offToggle()}>
              <FaChevronUp />
            </CheckDetailChevron>
            <CheckDetailTitle>{item.text}</CheckDetailTitle>
            <CheckDetailDate>{item.to_user_id}</CheckDetailDate>
          </CheckContent>
        </CheckDetail>
      </DetailWrap>
    </>
  );
}

export default CheckItem;
