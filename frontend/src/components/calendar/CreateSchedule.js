import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { BsCheck } from "react-icons/bs"
import { AiOutlineCalendar } from "react-icons/ai"
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";



const TitleInput = styled.input`
    width: 96%;
    height: 32px;
    padding: 4px;
    margin: auto 2%;
    outline: none;
    border: none;
    border-bottom: solid 1px rgba(255,120,127, 0.5);
    font-size: 1.5em;
    font-weight: bold;
`

const ColorsList = styled.div`
    display: flex;
    align-items: center;
    align-items: flex-start;
    margin: 16px 0;
`
const ColorBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  margin-right: 8px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.color === props.selected ? "solid 1px #707070" : "none"};
  box-shadow: ${(props) =>
    props.color === props.selected
      ? "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      : "none"};
`;

const EndToggleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const EndDateBox = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 4fr 1fr 4fr;
`
const StartDate = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border: none;
  border-bottom: 1px solid #fad7d4;
  font-size: 1em;
  margin: auto;
`;
const EndDateSelect = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: none;
  border-bottom: 1px solid #fad7d4;
  font-size: 1em;
  margin: auto;
`;

function CreateSchedule({date, schedules}) {
    const userId = useAppSelector((state)=> state.user.id);
    const familyId = useAppSelector((state)=>state.family.id)
    const thisdate = date.slice(0,4) + '-' + date.slice(6,8) + '-' + date.slice(10,12);
    const colors = ["#fad7d4", "#bbf1e8", "#e2faed", "#c3e2ff", "#fbe8ae", "#e8e8ff"] ;
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#fad7d4");
    const [selectedColor, setSelectedColor] = useState("");
    const [endtoggle, setEndtoggle] = useState(false);
    const [enddate, setEnddate] = useState(thisdate);

    const theme = createTheme({
      palette: {
        neutral: {
          main: "#F7C3BE",
          contrastText: "white",
        },
      },
    });

    useEffect(()=>{
      if(title.length === 0) {
        schedules({title: '제목없음', color: color, enddate: enddate})
      } else{
        schedules({
          title: title,
          color: color,
          enddate: enddate,
          important_mark: false,
          writer: userId,
          start_date: thisdate,
          family: familyId,
        });
      }
    }, [title, color, enddate])

    const onChangeTitle = (e) => {
        setTitle(e.currentTarget.value);
    }
    const onChangeColor = (e) => {
        setSelectedColor(e);
        setColor(e);
    }
    const onChangeToggle = () => {
        setEndtoggle(!endtoggle);
    }
    const onChangeEnddate = (e) => {
        const year = e.getFullYear();
        const month = e.getMonth() + 1;
        const day = e.getDate();
        setEnddate(year.toString() + '-' + month.toString() + '-' + day.toString());
    }
    return (
      <>
        <TitleInput
          placeholder="일정 제목"
          onChange={onChangeTitle}
          maxLength={20}
          value={title}
        ></TitleInput>

        <ColorsList>
          {colors.map((item, index) => (
            <ColorBox
              key={index}
              color={item}
              selected={selectedColor}
              onClick={() => onChangeColor(item)}
            >
              {selectedColor === item ? (
                <BsCheck size={28} color="#707070" />
              ) : (
                <></>
              )}
            </ColorBox>
          ))}
        </ColorsList>

        <EndToggleContainer>
          <p>종료날짜 설정</p>
          <ThemeProvider theme={theme}>
            <Switch
              onChange={onChangeToggle}
              inputProps={{ "aria-label": "controlled" }}
              color="neutral"
            ></Switch>
          </ThemeProvider>
        </EndToggleContainer>

        {endtoggle ? (
          <EndDateBox>
            <StartDate>{thisdate}</StartDate>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              -
            </div>
            <>
              <DatePicker
                onChange={(date) => onChangeEnddate(date)}
                startDate={thisdate}
                minDate={new Date()}
                locale={ko}
                placeholder={thisdate}
                customInput={
                  <EndDateSelect>
                    <AiOutlineCalendar color="#ff787f" size={20}/>
                    {enddate}
                  </EndDateSelect>
                }
              />
            </>
          </EndDateBox>
        ) : (
          <></>
        )}
      </>
    );
}

export default CreateSchedule;