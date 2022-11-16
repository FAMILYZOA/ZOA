import styled, { keyframes} from "styled-components";
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

const Dday = ({groupSchedule, date}) => {
  const Weekly = ['일', '월', '화', '수', '목', '금', '토']
  const [toggle, setToggle] = useState(false);

  return(
    <>
      <Container>                 
        <TitleBox>
          <DateToggleWrapper>
            <DateWrapper>
              {date.month}월 {date.day}일 ({Weekly[date.yoil]})
            </DateWrapper>
            <div onClick={() => {setToggle(!toggle)}}>
              {toggle === true? (
                <>
                  <MdKeyboardArrowUp />
                </>
              ): (
                <>
                  <MdKeyboardArrowDown />
                </>
              )}
            </div>
          </DateToggleWrapper>
          <div>
            {toggle === true ? (
              <>
                {groupSchedule.map((item, index) => (
                  <ContentWrapper key={index}>
                    <DdayWrapper>
                      D- {item.Dday}
                    </DdayWrapper>
                    <DdayTextWrapper>
                      {item.title}
                      <DdayDateWrapper>
                        {item.start_date.slice(5, 7)}월 {item.start_date.slice(8, 10)}일
                      </DdayDateWrapper>
                    </DdayTextWrapper>
                  </ContentWrapper>
                ))}
              </>
            ) : (
              <>
                <ContentWrapper>
                  {groupSchedule.length === 0 ? (
                    <>
                      등록된 일정이 없습니다.
                    </>
                  ): (
                    <>
                      <DdayWrapper>
                        D- {groupSchedule[0].Dday}
                      </DdayWrapper>
                      <DdayTextWrapper>
                        {groupSchedule[0].title}
                      </DdayTextWrapper>
                    </>
                  )}
                </ContentWrapper>
                <DotsWrapper>
                  <BsThreeDots />
                </DotsWrapper>
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
    justify-content: space-between;
    margin-bottom: 8px;
  `

  const DateWrapper = styled.div`
    margin-top: 0.5%;
    /* margin-right: 50%; */
    margin-bottom: 0.5%;
    /* margin-left: 0.5%; */
  `

  const ContentWrapper = styled.div`
    display: flex;
  `

  const DdayWrapper = styled.div`
    color: #ff787f;
    padding-right: 4px;
  `

  const DdayTextWrapper = styled.div`
  `

  const DdayDateWrapper = styled.div`
    color: #666666;
    font-size: small;
  `

  const DotsWrapper = styled.div`
    text-align: center;
  `

export default Dday;