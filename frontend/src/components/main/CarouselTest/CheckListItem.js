import styled from "styled-components";
import { useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";

const CheckListItem = () => {

  const [check, setCheck] = useState(false);
  // 체크 했을 때 스타일 설정
  let itemTextColor = "#808080";
  let textDecorationLine = "line-through";
  
  if (check === false) {
    itemTextColor = "#000000";
    textDecorationLine = "";
  }

  // 나중에 api 요청으로 체크리스트 patch 붙이기
  const onSetCheck = () => {
    setCheck(!check)
  };

  return(
    <>
      <div onClick={onSetCheck} style={{display: "flex"}}>
        <div style={{color: "#ff787f", margin: "4px 12px 4px 12px"}}>
          {check === true ? <FaCheckSquare/> : <FaRegSquare/>}
        </div>
        <div style={{color: itemTextColor, textDecorationLine: textDecorationLine}}>
          점심먹기
        </div>
      </div>
    </>
  )
};

export default CheckListItem;