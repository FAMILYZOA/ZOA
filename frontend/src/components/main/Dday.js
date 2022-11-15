import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";

const Dday = ({groupSchedule, date}) => {
  const Weekly = ['일', '월', '화', '수', '목', '금', '토']
  const [toggle, setToggle] = useState(false);
  // console.log(ddaySchedule);
  // console.log(ddaySchedule[0].Dday, ddaySchedule[0].title);


  return(
    <>
      <Container>
        <TitleBox>
          <DateToggleWrapper>
            <DateWrapper>
              {date.month}월 {date.day}일 ({Weekly[date.yoil]})
            </DateWrapper>
            <MdKeyboardArrowDown onClick={() => {setToggle(!toggle)}}/>
          </DateToggleWrapper>
          <div>
            {toggle === true ? (
              <>
                {groupSchedule.map((item, index) => (
                  <div key={index}>
                      D- {item.Dday}
                    {item.title}
                    <div style={{color: "#666666", fontSize: "small"}}>
                      {item.start_date.slice(5, 7)}월 {item.start_date.slice(8, 10)}일
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {/* D- {groupSchedule[0].Dday}
                 {groupSchedule[0].title} */}
                 <BsThreeDots />
              </>
            )}
          </div>
        </TitleBox>
      </Container>
    </>
  )
};

  const Container = styled.div`
    margin: 8px auto;
    z-index: 5;
    border-radius: 12px;
    width: 90%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: flex;
    flex-direction: row;
    justify-content: start;
  `

  const TitleBox = styled.div`
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 4px auto;
  `

  const DateToggleWrapper = styled.div`
    display: flex;
  `

  const DateWrapper = styled.div`
    margin-right: 50%;
  `


export default Dday;