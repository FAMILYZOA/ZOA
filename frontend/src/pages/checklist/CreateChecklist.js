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

const Container = styled.div`
  height: calc(95vh - 120px);
  margin: 5% 0;
  /* overflow-y: scroll; */
  overflow-x: hidden;
`;

function CreateChecklist() {
  const navigate = useNavigate();

  const [info, setInfo] = useState(
    {
      to_users_id: [],
      text: "",
      photo: "",
    },
    []
  );

  const receivers = (data) => {
    console.log(data);
    setInfo((pre) => {
      return { ...pre, to_users_id: data.receiver };
    });
  };
  const todos = (data) => {
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
    const data = new FormData();
    data.append("text", info.text);
    {
      info.to_users_id.map((userId) => data.append("to_users_id", userId));
    }
    if (info.photo !== "") {
      data.append("photo", info.photo);
    }
    //console.log(data);
    axios({
      method: "POST",
      url: `https://k7b103.p.ssafy.io/api/v1/checklist/`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: data,
    })
      .then((res) => {
        //console.log(res);
        navigate("/checklist");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header label="할 일 등록" back="true"></Header>
      <Container>
        <Receiver receivers={receivers}></Receiver>
        <TodoInput todos={todos}></TodoInput>
        <AddPhoto getPhoto={getPhoto}></AddPhoto>
        <Button label="등록하기" click={event} active={true}></Button>
      </Container>
    </div>
  );
}

export default CreateChecklist;
