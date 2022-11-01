import styled from "styled-components";
import { useState } from "react";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import axios from "axios";

const CheckListItem = (item) => {

  // 체크 했을 때 스타일 설정
  let itemTextColor = "#000000";
  let textDecorationLine = "";
  
  if (item.status === true) {
    itemTextColor = "#808080";
    textDecorationLine = "line-through";
  }

  // 나중에 api 요청으로 체크리스트 patch 붙이기
  // const onSetCheck = () => {
    
  // };

  // // 체크리스트 완료 api
  // const onPutCheckList = () => {
  //   axios({
  //     method: "put",
  //     url: "https://k7b103.p.ssafy.io/api/v1/checklist/detail/"
  //   })
  //   .then((res) => {
      
  //   })
  // }

  return(
    <>
      <div style={{display: "flex"}}>
        <div style={{color: "#ff787f", margin: "4px 12px 4px 12px"}}>
          {item.status === true ? <FaCheckSquare/> : <FaRegSquare/>}
        </div>
        <div style={{color: itemTextColor, textDecorationLine: textDecorationLine}}>
          {item.text}
        </div>
      </div>
    </>
  )
};

export default CheckListItem;
