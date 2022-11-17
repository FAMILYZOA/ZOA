import styled, { keyframes} from "styled-components";
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

const Dday = ({groupSchedule, date}) => {
  const Weekly = ['일', '월', '화', '수', '목', '금', '토']
  const [toggle, setToggle] = useState(false);
  const [noday, setNoday] = useState(false);

  useEffect(()=> {
    if(groupSchedule.length === 0){
      setNoday(true)
    } else{
      setNoday(false);
    }
  },[groupSchedule])
  

  return (
    <>
      <Container toggle={toggle}>
        <TitleBox toggle={toggle}>
          <DateToggleWrapper>
            <DateWrapper>
              {date.month}월 {date.day}일 ({Weekly[date.yoil]})
            </DateWrapper>
            <div
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              {noday === false ? (
                toggle === true ? (
                <>
                  <MdKeyboardArrowUp />
                </>
              ) : (
                <>
                  <MdKeyboardArrowDown />
                </>
              )
              ) : (<></>)}
            </div>
          </DateToggleWrapper>
          <div>
            <>
              <ContentList toggle={toggle}>
                {groupSchedule.map((item, index) => (
                  <ContentWrapper2 key={index} toggle={toggle}>
                    <DdayWrapper>D-{item.Dday}</DdayWrapper>
                    <DdayTextWrapper>
                      {item.title}
                      <DdayDateWrapper>
                        {item.start_date.slice(5, 7)}월{" "}
                        {item.start_date.slice(8, 10)}일
                      </DdayDateWrapper>
                    </DdayTextWrapper>
                  </ContentWrapper2>
                ))}
              </ContentList>
            </>
            <>
              <ContentWrapper toggle={toggle}>
                {groupSchedule.length === 0 ? (
                  <NoDday>
                    <span>오늘의 이벤트가 없습니다.</span>
                  </NoDday>
                ) : (
                  <>
                    <DdayWrapper>D-{groupSchedule[0].Dday}</DdayWrapper>
                    <DdayTextWrapper>{groupSchedule[0].title}</DdayTextWrapper>
                  </>
                )}
              </ContentWrapper>
              {noday === false ? (
                <DotsWrapper toggle={toggle}>
                <BsThreeDots size={16} color="#707070" />
              </DotsWrapper>
              ) : (
                <></>
              )}
            </>
          </div>
        </TitleBox>
      </Container>
    </>
  );
};

  const Container = styled.div`
    margin: 8px auto;
    z-index: 5;
    border-radius: 12px;
    width: 90%;
    min-height: 88px;
    height: ${(props) => (props.toggle ? "176px" : "88px")};
    transition: height 0.5s;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    padding: 8px;
  `;

  const TitleBox = styled.div`
    justify-content: space-between;
    height: ${(props) => (props.toggle === true ? "172px" : "88px")};
    overflow-y: hidden;
    transition: height 0.5s;
    align-items: center;
    width: 90%;
    margin: 4px auto;
  `;

  const DateToggleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  `

  const DateWrapper = styled.div`
    margin-top: 0.5%;
    font-size: 0.9em;
  `;

  const ContentWrapper = styled.div`
    display: flex;
    display: ${(props) => (props.toggle !== true ? "flex" : "none")};
    margin: 8px;
  `;

  const ContentWrapper2 = styled.div`
    display: flex;
    margin: 0 8px 8px;
  `;

  const ContentList = styled.div`
    display: ${(props) => (props.toggle === true ? null : "none")};
    opacity: ${(props) => (props.toggle === true ? "1" : "0")};
    height: ${(props) => (props.toggle === true ? "144px" : "0px")};
    transition: height opacity 1s;
    margin-bottom: 8px;
    overflow-y: scroll;
  `;

  const NoDday = styled.div`
    width: 100%;
    color: #707070;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 0.9em;
    margin: 8px 0;
  `;

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
    height: 16px;
    display: ${(props) => (props.toggle !== true ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    margin-top: 4px;
  `;

export default Dday;