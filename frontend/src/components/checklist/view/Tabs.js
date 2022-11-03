import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAppSelector } from "../../../app/hooks";


const Container = styled.div`

`

const TabBox = styled.div`
    display: grid ;
    grid-template-columns: 1fr 1fr;
    width: 100% ;
`
const Tab = styled.div`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px 10px 0 0;
  background: linear-gradient(45deg, #fec786, #ff787f);
  opacity: ${(props) => (props.active === true ? 1 : 0.4)};
  font-size: 16px;
  color: white;
  text-align: center;
  line-height: 40px;
  font-weight: ${(props) => (props.active === true ? "bold" : 100)};
`;

const ContentsBox = styled.div`
    background-color: rgba(255,255,255,0.5);
    height: 60vh;
    border-radius: 0 0 10px 10px;
`

function Tabs({current}){
    const access = useAppSelector((state) => state.token.access)
    const [todoTab, setTodo] = useState(true);
    const [completeTab, setCompleteTab] = useState(false);
    const TodoClick = () => {
        setTodo(true);
        setCompleteTab(false);
    }
    const CompleteClick = () => {
        setTodo(false);
        setCompleteTab(true);
    }

    const todo = () => {
        axios({
            method: "GET",
            url : `https://k7b103.p.ssafy.io/api/v1/checklist/${current}/0/`,
            headers: {
                Authorization: `Bearer ${access}`,
            }
        })
    }

    return(
        <Container>
            <TabBox>
                <Tab onClick={TodoClick} active={todoTab}>TODO</Tab>
                <Tab onClick={CompleteClick} active={completeTab}>COMPLETED</Tab>
            </TabBox>
            <ContentsBox></ContentsBox>
            
        </Container>
    )
}

export default Tabs;