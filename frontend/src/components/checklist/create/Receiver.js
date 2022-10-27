import React, {useState} from "react";
import styled from "styled-components";
import userImg from "../../../assets/jjangu.png"


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

`

const UserBox = styled.div`
    opacity: ${(props) => props.active == "active" ? 0.5 : 0};
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


function Receiver () {
    const [receiver, setReceiver] = useState([]);
    console.log(receiver);
    const active = (user) => {
        console.log('user', user);
        if (receiver.includes(user)) {
          let newReceiver = [...receiver];
          newReceiver.splice(receiver.indexOf(user), 1);
          setReceiver([...newReceiver]);
        } else {
          setReceiver([user, ...receiver]);
        }
    }

    const user1 = "user1";
    const user2 = "user2"; 
    const user3 = "user3"; 
    return (
      <Container>
        <MainText>
          받는 사람<span color="red">*</span>
        </MainText>
        <UserContainer>
          <UserBox onClick={() => active(user1)}>
            <img src={userImg} alt="user" />
            <p>짱구</p>
          </UserBox>
          <UserBox onClick={() => active(user2)}>
            <img src={userImg} alt="user" />
            <p>짱구</p>
          </UserBox>
          <UserBox onClick={() => active(user3)}>
            <img src={userImg} alt="user" />
            <p>짱구</p>
          </UserBox>
        </UserContainer>
      </Container>
    );
}

export default Receiver;