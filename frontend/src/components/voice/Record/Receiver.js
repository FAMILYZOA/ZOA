import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAppSelector } from "../../../app/hooks";

const Container = styled.div`
  border-bottom: 1px solid #d9d9d9;
  margin: 8px 5%;
`;
const MainText = styled.div`
  font-size: 0.8em;
  font-weight: bold;
  text-align: start;
`;

const UserContainer = styled.div`
  display: flex;
  margin: 16px 8px;
  width: 90%-32px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  @media screen and (min-width: 520px) {
    &::-webkit-scrollbar {
      width: auto;
      height: 5px;
      border-radius: 3px;
      background-color: #ffcdbe;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ff787f;
      height: 3px;
      border-radius: 3px;
    }
  }
`;

const UserBox = styled.div`
  opacity: ${(props) => (props.rc.includes(props.id) ? 1 : 0.5)};
  display: inline-block;
  width: 64px;
  height: 80px;
  margin: 8px 8px 8px 0;
  text-align: center;
  img {
    width: 64px;
    height: 64px;
    border-radius: 100px;
    margin: 0;
  }
  p {
    margin: 0 auto;
    font-size: 0.6em;
  }
  transition: opacity 0.2s;
`;

function Receiver({ receivers }) {
  const userId = useAppSelector(state => state.user.id)
  const tmpfamily = useAppSelector((state)=> state.family.users)
  const [family, setFamily] = useState([]);

  useEffect(() => {
    setFamily(
      tmpfamily.filter((item) => {
        if (item.id !== userId) {
          return item ? { ...item, active: false } : family
        }
      })
    );
  }, [tmpfamily]);

  const [receiver, setReceiver] = useState([]);
  const active = (active, id, index) => {
    if (receiver.includes(id)) {
      let newReceiver = [...receiver];
      newReceiver.splice(receiver.indexOf(id), 1);
      setReceiver([...newReceiver]);
    } else {
      setReceiver([id, ...receiver]);
    }
  };

  useEffect(() => {
    receivers({ receiver: receiver });
  }, [receiver]);

  return (
    <Container>
      <MainText>
        받는 사람<span style={{ color: "red" }}>*</span>
      </MainText>
      <UserContainer>
        {family.map((item, index) => (
          <UserBox
            key={index}
            onClick={() => active(item.active, item.id, index)}
            rc={receiver}
            id={item.id}
          >
            <img src={item.image} alt="" />
            <p>{item.name}</p>
          </UserBox>
        ))}
      </UserContainer>
    </Container>
  );
}

export default Receiver;
