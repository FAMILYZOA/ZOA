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

  // 날짜 유효성 검사(1일이나 말일에 월 바뀌는거는 아직)
  // 전 날로 가기
  const onHandleBeforeDate = () => {
    setCurDate({...curDate, date: curDate.date -1});
  };

  // 다음날로 가기
  const onHandleAfterDate = () => {
    setCurDate({...curDate, date: curDate.date +1});
  };

  // 받아온 값 저장
  const [scrums, setScrums] = useState([{
    image: "",
    yesterday: "",
    today: "",
  },]);

  const token = useAppSelector((state) => state.token.access);
  const family = useAppSelector((state) => state.family.users);
  const userId = useAppSelector((state) => state.user.id)
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
  const famScrums = [];
  let i = 0
  for (i = 1; i < scrums.length; i++) {
    famScrums.push(scrums[i])
  }
  console.log("전체 스크럼", scrums);
  console.log("가족정보", family);
  const myScrum = useState([{
    image: "",
    yesterday: "",
    today: "",
  }])
  let j = 0
  for (j = 0; j < scrums.length; j++) {
    if (scrums[j].user_id === userId) {
      myScrum.unshift(scrums[j])
      scrums.splice(j, 1)
    }
  };
  console.log(scrums);
  console.log(myScrum);
  console.log(family);

  return(
    <>
      <Header/>
        <div style={{display: "inline-flex"}}>
          <div style={{justifyContent: "center", display: "flex"}}>
            {/* <BsChevronLeft onClick={onHandleBeforeDate}/> */}
            <BsChevronLeft/>
              <div style={{color: "#ff787f", fontWeight: "bolder", fontSize: "3vh"}}>
                {curDate.year}. {curDate.month}. {curDate.date}
              </div>
            {/* <BsChevronRight onClick={onHandleAfterDate}/> */}
            <BsChevronRight/>
            </div>
          </div>
          <div>
            <ScrumItem myScrum={myScrum[0]}></ScrumItem>
          </div>
          <div>
            {famScrums.map((item) => (
              <ScrumFamItem {...item} key={item.id}/>
            ))}
          </div>
    </>
  )
};

export default ScrumHome;