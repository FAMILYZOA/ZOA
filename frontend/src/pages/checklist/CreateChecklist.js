import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/header";
import Receiver from "../../components/checklist/create/Receiver";
import TodoInput from "../../components/checklist/create/TodoInput";
import AddPhoto from "../../components/checklist/create/AddPhoto";
import Button from "../../components/Button";
import axios from "axios";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";

const Container = styled.div`
  height: calc(95vh - 120px);
  margin: 5% 0;
  /* overflow-y: scroll; */
  overflow-x: hidden;
`;

function CreateChecklist() {
  const navigate = useNavigate();
  const [allow, setAllow] = useState(true);
  // const userID = useAppSelector((state) => state.user.id);
  // const userName = useAppSelector((state) => state.family.users.filter(user => user.id === userID)[0].set_name);
  const userName = useAppSelector((state) => state.user.name);

  const [info, setInfo] = useState(
    {
      to_users_id: [],
      text: "",
      photo: "",
    },
    []
  );
  const [active, setActive] = useState(false);

  const receivers = (data) => {
    if (data.receiver.length === 0) {
      setActive(false);
    } else if (info.text === "") {
      setActive(false);
    } else {
      setActive(true);
    }
    setInfo((pre) => {
      return { ...pre, to_users_id: data.receiver };
    });
  };
  const todos = (data) => {
    if (data.todo === "") {
      setActive(false);
    } else if (info.to_users_id.length === 0) {
      setActive(false);
    } else {
      setActive(true);
    }
    setInfo((pre) => {
      return { ...pre, text: data.todo };
    });
  };
  const getPhoto = (data) => {
    setInfo((pre) => {
      return { ...pre, photo: data.photo };
    });
  };

  const event = () => {
    if (allow) {
      setAllow(false);
      if (info.text === "") {
        setActive(false);
      } else if (info.to_users_id.length === 0) {
        setActive(false);
      } else {
        setActive(true);
        const data = new FormData();
        data.append("text", info.text);
        info.to_users_id.map((userId) => data.append("to_users_id", userId));
        if (info.photo !== "") {
          data.append("photo", info.photo);
        }
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_BACK_HOST}/checklist/`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          data: data,
        }).then((res) => {
          const messageData = new FormData();
          messageData.append("body", `[할 일] ${userName}님이 할 일을 작성하셨습니다. 지금 들어가서 확인해보세요`);
          messageData.append("writer", res.data[0].to_users_id);
          axios({
            method: "POST",
            url: `${process.env.REACT_APP_BACK_HOST}/event/FCM/send/`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            data: messageData
          })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
          navigate("/checklist");
        });
      }
    }
  };

  return (
    <div>
      <Header label="할 일 등록" back="true"></Header>
      <Container>
        <Receiver receivers={receivers}></Receiver>
        <TodoInput todos={todos}></TodoInput>
        <AddPhoto getPhoto={getPhoto}></AddPhoto>
        <Button label="등록하기" click={event} active={active}></Button>
      </Container>
    </div>
  );
}

export default CreateChecklist;
