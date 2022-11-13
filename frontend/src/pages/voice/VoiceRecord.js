import React, { useCallback } from "react";
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

const VoiceRecDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0.9em;
`

const VoiceRecBtnDiv = styled.div`
  flex: 1;
`

const VoiceRecBtn = styled.div`
  position: relative;
  height: 11em;
  width: 11em;
  border-radius: 5.5em;
  border: 3px solid #fff;
  background: linear-gradient(133.61deg, #FF787F 15.58%, #FEC786 85.74%);
  box-sizing: border-box;
`


function VoiceRecord() {
    const navigate = useNavigate();
    const [allow, setAllow] = useState(true);
    const [active, setActive] = useState(true);
    const [analyser, setAnalyser] = useState();
    const [source, setSource] = useState();
    const [stream, setStream] = useState();
    const [onRec, setOnRec] = useState(true);
    const [audioUrl, setAudioUrl] = useState();
    const [media, setMedia] = useState();


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

    const onRecAudio = () => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createScriptProcessor(0, 1, 1);
      setAnalyser(analyser);

      const makeSound = (stream) => {
        const source = audioCtx.createMediaStreamSource(stream);
        setSource(source);
  
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
      }
  
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          setStream(stream);
          setMedia(mediaRecorder);
          makeSound(stream);
          analyser.onaudioprocess = function (e) {
            setOnRec(false);
          }
        })
    }

    const offRecAudio = () => {
      media.ondataavailable = function (e) {
        setAudioUrl(e.data);
        setOnRec(true);
      };

      stream.getAudioTracks().forEach((track) => {
        track.stop();
      });

      media.stop();

      analyser.disconnect();
      source.disconnect();
    };
    
    const onSubmitAudioFile = useCallback(() => { //결과 처리
      const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio"});
      console.log(sound);
    }, [audioUrl]);

    return(
        <>
        <Header label="음성메시지" back="true"></Header>
        <Container>
            <Receiver receivers={receivers}></Receiver>
            <VoiceRecDiv>
              <VoiceRecBtnDiv>
                <VoiceRecBtn onClick={onRec ? onRecAudio : offRecAudio}>

                </VoiceRecBtn>
              </VoiceRecBtnDiv>
            </VoiceRecDiv>
        </Container>
        </>
    )
}

export default VoiceRecord;