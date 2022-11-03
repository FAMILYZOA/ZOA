import styled from "styled-components";
import { useState } from "react";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import axios from "axios";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
`

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`


const TextBox = styled.p`
  text-decoration-line: ${props => (props.active === true ? "line-through #808080" : null )};
  color: ${props => (props.active === true? "#808080" : "black")};
  margin: auto 8px;
  font-size: 18px;
`


const CheckListItem = (item) => {

  // // 체크 했을 때 스타일 설정
  // let itemTextColor = "#000000";
  // let textDecorationLine = "";
  
  // if (item.status === true) {
  //   itemTextColor = "#808080";
  //   textDecorationLine = "line-through";
  // }

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

  return (
    <Container>
      <IconBox>
        {item.status === true ? (
          <FaCheckSquare size={16} color={"#FAD7D4"} />
        ) : (
          <FaRegSquare size={16} color={" #ff787f"} />
        )}
      </IconBox>
      <TextBox active={item.active}>{item.text}</TextBox>
    </Container>
  );
};

export default CheckListItem;