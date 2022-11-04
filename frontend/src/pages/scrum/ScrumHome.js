import Header from "../../components/header";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import ScrumItem from "../../components/scrum/ScrumItem";
import ScrumFamItem from "../../components/scrum/ScrumFamItem";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const ScrumHome = () => {

  const [curDate, setCurDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  });

  // 받아온 값 저장
  const [scrums, setScrums] = useState([{
    image: "",
    yesterday: "",
    today: "",
  },]);

  const token = useAppSelector((state) => state.token.access);
  const userId = useAppSelector((state) => state.user.id)
  const userImg = useAppSelector((state) => state.user.image)

  const navigate = useNavigate();
  useEffect (()=> {
    if (token.length === 0) {
      navigate("/intro");
    }
  });

  useEffect(() => {
    axios({
      method: "get",
      url: `https://k7b103.p.ssafy.io/api/v1/scrums`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setScrums([...res.data])
    })
    .catch((err) => {
      console.log(err)
    })
  }, [token])

  // 내 스크럼 저장할 state 선언
  const myScrum = useState([{
    image: "",
    yesterday: "",
    today: "",
  }])

  // 받아온 스크럼 data에서 스크럼 작성 id 와 유저 id 비교하기
  let j = 0
  for (j = 0; j < scrums.length; j++) {
    if (scrums[j].user_id === userId) {
      myScrum.unshift(scrums[j])
      scrums.splice(j)
    } else {
      myScrum.unshift({image: `${userImg}`, yesterday: "", today: ""})
    }
  };
  console.log(scrums);

  return(
    <>
      <Header label="안녕"/>
          <div style={{justifyContent: "center", display: "flex"}}>
              <div style={{color: "#ff787f", fontWeight: "bolder", fontSize: "3vh"}}>
                {curDate.year}. {curDate.month}. {curDate.date}
              </div>
          </div>
          <ScrumItem myScrum={myScrum[0]}></ScrumItem>
          {scrums.map((item) => (
            <ScrumFamItem {...item} key={item.user_id}/>
          ))}
    </>
  )
};

export default ScrumHome;