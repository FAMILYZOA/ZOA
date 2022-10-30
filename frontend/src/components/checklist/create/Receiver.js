import React, {useState, useEffect} from "react";
import styled from "styled-components";
import jjangu from "../../../assets/jjangu.png";
import bong from "../../../assets/bong.png";
import userDefault from "../../../assets/defaultProfile.png";


const Container = styled.div`
    margin: 5%;
    border-bottom: 1px solid #d9d9d9;

`
const MainText = styled.div`
    font-size: 16px;
    font-weight: bold;
    text-align: start;
`

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
    opacity: ${(props) => props.rc.includes(props.user) ? 1 : 0.5};
    display: inline-block;
    width: 64px;
    height: 80px;
    margin: 8px 8px 8px 0;
    text-align: center;
    img{
        width: 64px;
        height: 64px;
        border-radius: 100px;
        margin: 0;
    }
    p{
        margin: 0 auto;
        font-size: 12px;
    }
`


function Receiver({receivers}) {
  const [receiver, setReceiver] = useState([]);
  console.log(receiver);
  const active = (user) => {
    console.log("user", user);
    if (receiver.includes(user)) {
      let newReceiver = [...receiver];
      newReceiver.splice(receiver.indexOf(user), 1);
      setReceiver([...newReceiver]);
    } else {
      setReceiver([user, ...receiver]);
    }
  };

  useEffect(() => {
    receivers({ receiver: receiver });
  }, [receiver]);

  const user1 = "user1";
  const user2 = "user2";
  const user3 = "user3";
  return (
    <Container>
      <MainText>
        받는 사람<span style={{ color: "red" }}>*</span>
      </MainText>
      <UserContainer>
        <UserBox onClick={() => active(user1)} rc={receiver} user={user1}>
          <img src={jjangu} alt="user" />
          <p>짱구</p>
        </UserBox>
        <UserBox onClick={() => active(user2)} rc={receiver} user={user2}>
          <img src={bong} alt="user" />
          <p>봉</p>
        </UserBox>
        <UserBox onClick={() => active(user3)} rc={receiver} user={user3}>
          <img src={userDefault} alt="user" />
          <p>아빠</p>
        </UserBox>
      </UserContainer>
    </Container>
  );
}

export default Receiver;