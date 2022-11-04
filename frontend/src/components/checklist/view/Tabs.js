import React, { useEffect, useState } from "react";
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
    const [todoTab, setTodoTab] = useState(true);
    const [completeTab, setCompleteTab] = useState(false);
    const [todo, setTodo] = useState([]);
    const [todoNext, setTodoNext] = useState("");
    const [completeNext, setCompleteNext] = useState("");
    const [complete, setComplete] = useState([]);
    const TodoClick = () => {
        setTodoTab(true);
        setCompleteTab(false);
    }
    const CompleteClick = () => {
        setTodoTab(false);
        setCompleteTab(true);
    }

    useEffect(()=> {
        axios({
            method: "GET",
            url : `https://k7b103.p.ssafy.io/api/v1/checklist/${current}`,
            headers: {
                Authorization: `Bearer ${access}`,
            },
            params: {"status" : 0}
        }).then((res)=>{
            setTodo(res.data.results)
            setTodoNext(res.data.next);
        })
        axios({
          method: "GET",
          url: `https://k7b103.p.ssafy.io/api/v1/checklist/${current}`,
          headers: {
            Authorization: `Bearer ${access}`,
          },
          params: { status: 1 },
        }).then((res)=> {
            setComplete(res.data.results);
            setCompleteNext(res.data.next);
        })
    }, [])

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