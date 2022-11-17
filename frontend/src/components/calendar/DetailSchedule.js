import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { BsCheck } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";


const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;

const Container = styled.div`
  animation: ${(props) => (props.state === "detail" ? fadeInUp : null)} 1s;
`;
const TitleInput = styled.input`
  width: 96%;
  height: 32px;
  padding: 4px;
  margin: auto 2%;
  outline: none;
  border: none;
  border-bottom: solid 1px rgba(255, 120, 127, 0.5);
  font-size: 1.5em;
  font-weight: bold;
`;

const ColorsList = styled.div`
  display: flex;
  align-items: center;
  align-items: flex-start;
  margin: 16px 0;
`;
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

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EndDateBox = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 4fr 1fr 4fr;
`;
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

function DetailSchedule({date, editSchedules, state, content}){
  const userId = useAppSelector((state) => state.user.id);
  const familyId = useAppSelector((state) => state.family.id);
  const thisdate =
    date.slice(0, 4) + "-" + date.slice(6, 8) + "-" + date.slice(10, 12);
  const colors = [
    "#fad7d4",
    "#bbf1e8",
    "#e2faed",
    "#c3e2ff",
    "#fbe8ae",
    "#e8e8ff",
  ];

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [startdate, setStartdate] = useState("")
  const [endtoggle, setEndtoggle] = useState(false);    
  const [enddate, setEnddate] = useState(thisdate);
  const [editing, setEditing] = useState(false);
  const [edittoggle, setEdittoggle] = useState(false);
  const [ddaytoggle, setDdaytoggle] = useState(false);

  useEffect(()=> {
    setTitle(content.title)
    setColor(content.color)
    setSelectedColor(content.color)
    if(content.end_date === content.start_date){
        setEndtoggle(false);
    } else{
        setEndtoggle(true);
    }
    setStartdate(content.start_date)
    setEnddate(content.end_date)
    setDdaytoggle(content.important_mark);
  },[])

  const theme = createTheme({
    palette: {
      neutral: {
        main: "#F7C3BE",
        contrastText: "white",
      },
    },
  });

  useEffect(() => {
    if(editing){
        if (title.length === 0) {
          editSchedules({
            id:content.id,
            title: "제목없음",
            color: color,
            end_date: enddate,
            important_mark: ddaytoggle,
            writer: userId,
            start_date: thisdate,
            family: familyId,
          });
        } else {
          editSchedules({
            id: content.id,
            title: title,
            color: color,
            end_date: enddate,
            important_mark: ddaytoggle,
            writer: userId,
            start_date: thisdate,
            family: familyId,
          });
        }
    }
  }, [edittoggle]);

  const onChangeTitle = (e) => {
      setTitle(e.currentTarget.value);
      setEditing(true);
      setEdittoggle(!edittoggle);
  };
  const onChangeColor = (e) => {
      setSelectedColor(e);
      setColor(e);
      setEditing(true);
      setEdittoggle(!edittoggle);
  };
  const onChangeToggle = () => {
      setEndtoggle(!endtoggle);
      setEditing(true);
      setEdittoggle(!edittoggle);
  };
  const onChangeDdayToggle = () => {
    setDdaytoggle(!ddaytoggle);
    setEditing(true);
    setEdittoggle(!edittoggle);
  };
  const onChangeEnddate = (e) => {
      const year = e.getFullYear();
      const month = e.getMonth() + 1;
      const day = e.getDate();
      setEnddate(year.toString() + "-" + month.toString() + "-" + day.toString());
      setEditing(true);
      setEdittoggle(!edittoggle);
  };
  const onChangeStartdate = (e) => {
      const year = e.getFullYear();
      const month = e.getMonth() + 1;
      const day = e.getDate();
      setStartdate(year.toString() + "-" + month.toString() + "-" + day.toString());
      setEditing(true);
      setEdittoggle(!edittoggle);
  };
  return (
    <Container state={state}>
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

      <ToggleContainer>
        <p>종료날짜 설정</p>
        <ThemeProvider theme={theme}>
          <Switch
            checked={endtoggle}
            onChange={onChangeToggle}
            inputProps={{ "aria-label": "controlled" }}
            color="neutral"
          ></Switch>
        </ThemeProvider>
      </ToggleContainer>

      {endtoggle ? (
        <EndDateBox>
          <DatePicker
            onChange={(date) => onChangeStartdate(date)}
            locale={ko}
            placeholder={startdate}
            customInput={
              <EndDateSelect>
                <AiOutlineCalendar color="#ff787f" size={20} />
                {startdate}
              </EndDateSelect>
            }
          />
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
              startDate={startdate}
              minDate={new Date(startdate)}
              locale={ko}
              placeholder={thisdate}
              customInput={
                <EndDateSelect>
                  <AiOutlineCalendar color="#ff787f" size={20} />
                  {enddate}
                </EndDateSelect>
              }
            />
          </>
        </EndDateBox>
      ) : (
        <></>
      )}
      <ToggleContainer>
        <p>디데이 활성화</p>
        <ThemeProvider theme={theme}>
          <Switch
            checked={ddaytoggle}
            onChange={onChangeDdayToggle}
            inputProps={{ "aria-label": "controlled" }}
            color="neutral"
          ></Switch>
        </ThemeProvider>
      </ToggleContainer>
    </Container>
  );
}

export default DetailSchedule;