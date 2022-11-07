import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAppSelector } from "../../../app/hooks";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { BiCheckbox } from "react-icons/bi";
import Spinner from "../../../assets/Spinner.gif";

const Container = styled.div``;

const TabBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;
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
  background-color: rgba(255, 255, 255, 0.5);
  height: 60vh;
  border-radius: 0 0 10px 10px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const NoToggle = styled.div`
  display: flex;
  height: 5vh;
  align-items: center;
  margin: 8px 0;
  p {
    margin: 0 4px;
  }
`;
const IconBox = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Toggle = styled.div`
  display: flex;
  width: 100%;
  border: none;
  height: ${(props) => (props.id === props.current ? "78px" : "0")};
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 20px;
  align-items: center;
  p {
    font-size: 20px;
    margin: 0;
  }
  span {
    font-size: 14px;
    color: #707070;
  }
  div {
    // display: ${(props) => (props.id === props.current ? "block" : "none")};
    // transition: display 0.5s;
    margin: 5%;
  }
  transition: height 0.5s;
  overflow-y: hidden;
`;

const ContentsContainer = styled.div`
  margin: 5%;
`;

function TodoContents({ currentId }) {
  const access = useAppSelector((state) => state.token.access);

  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(1);
  const preventRef = useRef(true);
  const obsRef = useRef(null);
  const endRef = useRef(false);

  const [click, setClick] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    getTodo();
  }, [page, currentId]);

  const obsHandler = (entries) => {
    const target = entries[0];
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };

  const getTodo = useCallback(async () => {
    if (currentId >= 0 && page !== 0) {
      //글 불러오기
      setLoad(true);
      const res = await axios({
        method: "GET",
        url: `https://k7b103.p.ssafy.io/api/v1/checklist/${currentId}?page=${page}&search=0`,
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      if (res.data) {
        if (res.data.next === null) {
          //마지막 페이지
          endRef.current = true;
        }

        //   setList((prev) => [...prev, ...res.data.results].map((item) => (
        //     item ? {...item, active:false} : list
        //   ))); // 리스트 추가
        console.log(res.data);
        setList(list.concat(res.data.results)); // 리스트 추가
        console.log("list", list);
        preventRef.current = true;
      }
      setLoad(false); //로딩 종료
    }
  }, [page, currentId]);

  const clickItem = (id) => {
    if (click !== id) {
      setClick(id);
    } else {
      setClick(-1);
    }
  };

  const check = (contentsId, index) => {
    const tempList = [...list];
    const data = new FormData();
    data.append("status", 1);
    axios({
      method: "PUT",
      url: `https://k7b103.p.ssafy.io/api/v1/checklist/detail/${contentsId}`,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      data: data,
    }).then((res) => {
      console.log(res);
      tempList.splice(index, 1)
      setList(tempList);
    });;
  };

  return (
    <ContentsContainer>
      {list && (
        <>
          {list.map((li, index) => (
            <div key={index}>
              <NoToggle>
                <BiCheckbox
                  size={32}
                  color="#FF787F"
                  onClick={() => check(li.id, index)}
                />
                <p onClick={() => clickItem(li.id)}>{li.text}</p>
              </NoToggle>
              <Toggle id={li.id} current={click}>
                <div>
                  <p>From. {li.to_users_id.name}</p>
                  <span>
                    {li.created_at.slice(0, 4)}.{li.created_at.slice(5, 7)}.
                    {li.created_at.slice(8, 10)}
                  </span>
                </div>
              </Toggle>
            </div>
          ))}
        </>
      )}
      {load ? (
        <div>
          <img src={Spinner} />
        </div>
      ) : (
        <></>
      )}
      <div ref={obsRef}></div>
    </ContentsContainer>
  );
}

function CompleteContents({ currentId }) {
  const access = useAppSelector((state) => state.token.access);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(1);
  const preventRef = useRef(true);
  const obsRef = useRef(null);
  const endRef = useRef(false);
  const [flag, setFlag] = useState(true);

  const [click, setClick] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    getTodo();
  }, [page, flag, currentId]);

  const obsHandler = (entries) => {
    const target = entries[0];
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };
  const getTodo = useCallback(async () => {
    //글 불러오기
    if (currentId >= 0 && page !== 0) {
      setLoad(true);
      const res = await axios({
        method: "GET",
        url: `https://k7b103.p.ssafy.io/api/v1/checklist/${currentId}?page=${page}&search=1`,
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      if (res.data) {
        if (res.data.next === null) {
          //마지막 페이지
          endRef.current = true;
        }
        //   setList((prev) => [...prev, ...res.data.results].map((item) => (
        //     item ? {...item, active:false} : list
        //   ))); // 리스트 추가
        setList((prev) => [...prev, ...res.data.results]); // 리스트 추가
        preventRef.current = true;
      }
      setLoad(false); //로딩 종료
    }
  }, [page, flag]);

  const clickItem = (id) => {
    if (click !== id) {
      setClick(id);
    } else {
      setClick(-1);
    }
  };

  const check = (contentsId, index) => {
    const data = new FormData();
    const tempList = [...list];
    data.append("status", 0);
    axios({
      method: "PUT",
      url: `https://k7b103.p.ssafy.io/api/v1/checklist/detail/${contentsId}`,
      headers: {
        Authorization: `Bearer ${access}`,
      },
      data: data,
    }).then((res) => {
      console.log(res);
      tempList.splice(index, 1)
      setList(tempList);
    });
  };

  return (
    <ContentsContainer>
      {list && (
        <>
          {list.map((li, index) => (
            <div key={index}>
              <NoToggle>
                <IconBox onClick={() => check(li.id, index)}>
                  <BsFillCheckSquareFill size={18.6} color="#F2D2CE" />
                </IconBox>
                <p onClick={() => clickItem(li.id)}>{li.text}</p>
              </NoToggle>
              <Toggle id={li.id} current={click}>
                <div>
                  <p>From. {li.to_users_id.name}</p>
                  <span>
                    {li.created_at.slice(0, 4)}.{li.created_at.slice(5, 7)}.
                    {li.created_at.slice(8, 10)}
                  </span>
                </div>
              </Toggle>
            </div>
          ))}
        </>
      )}
      {load ? (
        <div>
          <img src={Spinner} />
        </div>
      ) : (
        <></>
      )}
      <div ref={obsRef}></div>
    </ContentsContainer>
  );
}

function Tabs({ current }) {
  const access = useAppSelector((state) => state.token.access);
  const [todoTab, setTodoTab] = useState(true);
  const [completeTab, setCompleteTab] = useState(false);

  const [todo, setTodo] = useState([]);
  const [todoNext, setTodoNext] = useState("");
  const [completeNext, setCompleteNext] = useState("");
  const [complete, setComplete] = useState([]);
  const TodoClick = () => {
    setTodoTab(true);
    setCompleteTab(false);
  };
  const CompleteClick = () => {
    setTodoTab(false);
    setCompleteTab(true);
  };

  useEffect(() => {
    if (current >= 0) {
      axios({
        method: "GET",
        url: `https://k7b103.p.ssafy.io/api/v1/checklist/${current}`,
        headers: {
          Authorization: `Bearer ${access}`,
        },
        params: { status: 0 },
      }).then((res) => {
        setTodo(res.data.results);
        setTodoNext(res.data.next);
      });
      axios({
        method: "GET",
        url: `https://k7b103.p.ssafy.io/api/v1/checklist/${current}`,
        headers: {
          Authorization: `Bearer ${access}`,
        },
        params: { status: 1 },
      }).then((res) => {
        setComplete(res.data.results);
        setCompleteNext(res.data.next);
      });
    }
  }, []);

  return (
    <Container>
      <TabBox>
        <Tab onClick={TodoClick} active={todoTab}>
          TODO
        </Tab>
        <Tab onClick={CompleteClick} active={completeTab}>
          COMPLETED
        </Tab>
      </TabBox>
      <ContentsBox>
        {todoTab === true ? (
          <TodoContents currentId={current}></TodoContents>
        ) : (
          <CompleteContents currentId={current}></CompleteContents>
        )}
      </ContentsBox>
    </Container>
  );
}

export default Tabs;
