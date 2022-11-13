import React from "react";
import { useState } from "react";
import Header from "../../components/header";
import Button from "../../components/Button";
import Receiver from "../../components/voice/Record/Receiver"
import axios from "axios";
import { useNavigate } from "react-router";
import styled from "styled-components";


const Container = styled.div`
  height: calc(95vh - 120px);
  margin: 5% 0;
  /* overflow-y: scroll; */
  overflow-x: hidden;
`;

function VoiceRecord() {
    const navigate = useNavigate();
    const [allow, setAllow] = useState(true);
    const [active, setActive] = useState(true);


    const [info, setInfo] = useState({
        audio: "",
        second: 0,
        to_user_id: [],
    })

    const receivers = (data) => {
        if (data.receiver.length === 0) {
            setActive(false);
        } else if (info.audio === "" || info.second === 0) {
            setActive(false);
        } else { 
            setActive(true);
        }
        setInfo((pre) => {
            return {...pre, to_user_id :  data.receiver};
        })
    }

    
    return(
        <>
        <Header label="음성메시지" back="true"></Header>
        <Container>
            <Receiver receivers={receivers}></Receiver>
        </Container>
        </>
    )
}

export default VoiceRecord;