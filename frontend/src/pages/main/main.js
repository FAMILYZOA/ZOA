import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/main/Header";
import Emojis from "../../components/main/Emoji";
import Announcement from "../../components/main/Announcement";
import CheckList from "../../components/main/checklist/CheckList";
import Dday from "../../components/main/Dday";
import { useAppSelector } from "../../app/hooks";
import axios from "axios";
import { AuthRefresh } from "../../api/customAxios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setRefreshToken,
} from "../../features/token/tokenSlice";
import { ModalBack, ModalContent, ModalDiv } from "../../components";

const Modal24 = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ConfirmButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 35%;
  height: 2em;

  color: #fff;
  background-color: #ff787f;
  border-radius: 0.4em;
  margin-right: 0.4em;
`;

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const access = useAppSelector((state) => state.token.access);
  const refresh = useAppSelector((state) => state.token.refresh);
  const family = useAppSelector((state) => state.family.id);
  const [scrum, setScrum] = useState([]);
  const [groupSchedule, setGroupSchedule] = useState([]);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("familyId")) {
      if (localStorage.getItem("access_token")) {
        if (family < 0){
          const familyId = localStorage.getItem("familyId");
          navigate(`/join/${familyId}`);
        } else {
          if (family === localStorage.getItem("familyId")) {
            localStorage.removeItem("familyId");
          } else {
            const familyId = localStorage.getItem("familyId");
            navigate(`/join/${familyId}`);
          }
        }
      } else {
        navigate("/intro");
      }
    } else {
      if (!localStorage.getItem("access_token")) {
        navigate("/intro");
      } else if (family < 0) {
        console.log(family);
        navigate('family/select/')
      }
    }
  }, []);

  // 디데이 날짜 설정
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    yoil: new Date().getDay(),
  });
  
  // 디데이 api 요청
  const getGroupSchedule = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACK_HOST}/calendar/Dday/${date.year}-${date.month}-${date.day}`,
      headers: {
        Authorization: `Bearer ${access}`
      },
    }).then((res) => {
      setGroupSchedule([...res.data])
    })
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACK_HOST}/scrums/`,
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then((res) => {
        setScrum(res.data);
      })
      .catch(async (err) => {
        switch (err.response.status) {
          case 401:
            const code = err.response.data.code;
            if (code === "token_not_valid") {
              const tokens = await AuthRefresh(refresh).catch((err) => {

                navigate("/intro", { replace: true });
              });
              if (tokens) {
                dispatch(setAccessToken(tokens.access));
                dispatch(setRefreshToken(tokens.refresh));
              }
            }
            break;
          case 403:
            if (localStorage.getItem("familyId")) {
              const familyId = localStorage.getItem("familyId");
              navigate(`/join/${familyId}`);
            } else {
              console.log(family);
              // setIsModal(true);
            }
            break;
          default:
            break;
        }
      });
  }, [family]);

  const navigateToSelect = () => {
    setIsModal(false);
    navigate("family/select/");
  }

  useEffect(() => {
    setIsModal(false);
    getGroupSchedule();
  }, []);

  return (
    <div>
      {isModal && (<ModalBack onClick={() => {navigateToSelect()}}/>)}
      {isModal && (<ModalDiv>
        <ModalContent>
          <Modal24>
            <div>
            {"참여중인 가족이 없습니다."}
            </div>
            <div>
            {"가족 참여 페이지로 이동합니다."}
            </div>
          </Modal24>
          <ButtonDiv>
            <ConfirmButton onClick={() => {navigateToSelect()}}>확인</ConfirmButton>
          </ButtonDiv>
        </ModalContent>
      </ModalDiv>)}
      <Header></Header>
      <Emojis scrum={scrum}></Emojis>
      <Dday groupSchedule={groupSchedule} date={date}/>
      <Announcement scrum={scrum}></Announcement>
      <CheckList />
    </div>
  );
}

export default Main;
