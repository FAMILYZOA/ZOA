import React, { useEffect, useState, useRef, useCallback } from "react";
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
    overflow-y: scroll;
    overflow-x: hidden;
`

const Toggle = styled.div`
    height: 20vh;
`

function TodoContents({current, todo}){
    const access = useAppSelector((state) => state.token.access);


    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [load, setLoad] = useState(1);
    const preventRef = useRef(true);
    const obsRef = useRef(null);
    const endRef = useRef(false);

    useEffect(() => {
        getTodo();
        const observer = new IntersectionObserver(obsHandler, {threshold : 0.5});
        if(obsRef.current) observer.observe(obsRef.current);
        return () => {observer.disconnect();}
    }, [])

    useEffect(()=> {
        getTodo();
        console.log(list);
    }, [page])

    const obsHandler = ((entries)=> {
        const target = entries[0];
        if(!endRef.current && target.isIntersecting && preventRef.current) {
            preventRef.current = false;
            setPage(prev => prev + 1);
        }
    })

    const getTodo = useCallback(async() => { //글 불러오기
        setLoad(true);
        const res = await axios({
          method: "GET",
          url: `https://k7b103.p.ssafy.io/api/v1/checklist/${current}?page=${page}&status=0`,
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        if(res.data){
            if(res.data.next === null){ //마지막 페이지
                endRef.current = true;
            }
            setList(prev => [...prev, ...res.data.results]); // 리스트 추가
            preventRef.current = true;
        }else {
            console.log(res);
        }
        setLoad(false); //로딩 종료
    }, [page]);
    return(
        <div>
            {
                list && <> {
                    list.map((li)=> 
                    <Toggle key={li.id}>{li.text}</Toggle>
                    )
                }
                </>
            }
            {load ?
            <div>로딩중</div>
            :
            <></>    
        }
        <div ref={obsRef}>옵저버 Element</div>
        </div>
    )
}

function Tabs({current}){
    console.log('1', current);
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
        if(current >= 0){

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
    }
    }, [])

    return(
        <Container>
            <TabBox>
                <Tab onClick={TodoClick} active={todoTab}>TODO</Tab>
                <Tab onClick={CompleteClick} active={completeTab}>COMPLETED</Tab>
            </TabBox>
            <ContentsBox>
                <TodoContents current={current} todo={todo}></TodoContents>
            </ContentsBox>
            
        </Container>
    )
}

export default Tabs;