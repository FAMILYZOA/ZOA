import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";


const Container = styled.div`
    margin: 5%;
    border-bottom: 1px solid #d9d9d9;

`
const MainText = styled.div`
    font-size: 0.8rem;
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
    opacity: ${(props) => props.rc.includes(props.id) ? 1 : 0.5};
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
        font-size: 0.6rem;
    }
`


function Receiver({receivers}) {
  const [familyId, setId] = useState("");
  const [family, setFamily] = useState([]);
  useEffect(()=> {
    axios({
      method: "GET",
      url: `https://k7b103.p.ssafy.io/api/v1/accounts/profile/`,
      headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}
    }).then((res) => {
      setId(res.data.family_id)
    })
  }, [])

  useEffect(()=> {
    if (familyId.length !== 0) {
      axios({
        method: "GET",
        url: `https://k7b103.p.ssafy.io/api/v1/family/${familyId}/`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }).then((res) => {
        setFamily(res.data.users);
        setFamily(
          res.data.users.map((item) => (
            item ? {...item, active:false} : family
          ))
        )
      });
    }
  }, [familyId])

  useEffect(()=>{
    console.log(family);
  },[family])

  
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