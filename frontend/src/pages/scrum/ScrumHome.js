import Header from "../../components/header";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
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
  const [scrums, setScrums] = useState([]);
  const famScrums = [];
  
  // const token = useAppSelector((state) => state.token.value);
  useEffect(() => {
    axios({
      method: "get",
      url: `https://k7b103.p.ssafy.io/api/v1/scrums`,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3Mjc5NzU0LCJpYXQiOjE2NjcxOTMzNTQsImp0aSI6ImQ5MTZiN2I0M2ViYTQwMzVhNjBmNjY3ZTIwMjNkMzE0IiwidXNlcl9pZCI6MjJ9.pBBNXZtRgqXRGZYbsSbhEXbjI4Lnz_LzRu4Lz3iedX4',
      },
    })
    .then((res) => {
      console.log(res.data)
      setScrums({...res.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])
  console.log(scrums[0])
  let i = 0
  for (i = 1; i < scrums.length; i++) {
    famScrums.push(scrums[i])
  }
  famScrums.push(scrums[1])
  famScrums.push(scrums[2])
  // console.log(scrums[1])
  console.log(famScrums)

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
            <ScrumItem scrums={scrums[0]}></ScrumItem>
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