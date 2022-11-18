import React, { useCallback } from "react";
import { useState } from "react";
import Header from "../../components/header";
import Receiver from "../../components/voice/Record/Receiver";
import axios from "axios";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Icon } from "@mdi/react";
import { mdiMicrophonePlus } from "@mdi/js";
import { MdRecordVoiceOver } from "react-icons/md";
import { BsMicFill } from "react-icons/bs";
import { useAppSelector } from "../../app/hooks";

const Container = styled.div`
  height: calc(95vh - 120px);
  margin: 5% 0;
  /* overflow-y: scroll; */
  overflow-x: hidden;
`;

const ModalBack = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 56px);
  z-index: 4;
  background-color: rgba(102, 102, 102, 0.5);
  animation: fadein 0.5s;
  -moz-animation: fadein 0.5s;
  -webkit-animation: fadein 0.5s;
  -o-animation: fadein 0.5s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalDiv = styled.div`
  position: absolute;
  padding: 20px;
  width: 70%;
  height: 22vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  border-radius: 12px;
  background-color: #fff;
  animation: fadein 0.5s;
  -moz-animation: fadein 0.5s;
  -webkit-animation: fadein 0.5s;
  -o-animation: fadein 0.5s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Modal24 = styled.div`
  font-weight: 600;
`;

const VoiceRecDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.9em;
`;

const VoiceRecBtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  position: relative;
  margin: 32px auto;
`;

const VoiceRecBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 11em;
  width: 11em;
  border-radius: 5.5em;
  border: 3px solid #fff;
  background: linear-gradient(133.61deg, #ff787f 15.58%, #fec786 85.74%);
  box-sizing: border-box;
  text-align: center;
  z-index: 3;
  opacity: ${(props) => (props.isRecord === true ? 1 : 0.5)};
  transition: opacity 0.5s;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px auto;
`;

const Btn = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  justify-content: center;
  align-items: center;
  width: 90vw;
  @media screen and (min-width: 720px) {
    width: 576px;
  }
  height: 64px;
  margin: auto;
  background: linear-gradient(45deg, #fec786, #fe9b7c);
  border: none;
  border-radius: 20px;
  font-size: 1em;
  color: #444;
  opacity: ${(props) => (props.active === false ? 0.5 : 1)};
  transition: opacity 0.2s;
`;

const BtnIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const BtnAnimation = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  width: 11em;
  height: 11em;
  border-radius: 5.5em;
  border: 3px solid #fe9b7c;
  z-index: 1;
  animation: running-item 1s ease-in 0s infinite;
  @keyframes running-item {
    from {
      opacity: 1;
      width: 11em;
      height: 11em;
      border-radius: 5.5em;
    }
    to {
      opacity: 0;
      width: 14em;
      height: 14em;
      border-radius: 7em;
    }
  }
  @-moz-keyframes running-item {
    from {
      opacity: 1;
      width: 11em;
      height: 11em;
      border-radius: 5.5em;
    }
    to {
      opacity: 0;
      width: 14em;
      height: 14em;
      border-radius: 7em;
    }
  }
  @-webkit-keyframes running-item {
    from {
      opacity: 1;
      width: 11em;
      height: 11em;
      border-radius: 5.5em;
    }
    to {
      opacity: 0;
      width: 14em;
      height: 14em;
      border-radius: 7em;
    }
  }
  @-o-keyframes running-item {
    from {
      opacity: 1;
      width: 11em;
      height: 11em;
      border-radius: 5.5em;
    }
    to {
      opacity: 0;
      width: 14em;
      height: 14em;
      border-radius: 7em;
    }
  }
`;

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
  const [isRecord, setIsRecord] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [isModal, setIsModal] = useState(false);
  const accessToken = useAppSelector((state) => state.token.access);
  const userName = useAppSelector((state) => state.user.name);

  const [info, setInfo] = useState({
    audio: "",
    second: 0,
    to_user_id: [],
  });

  const receivers = (data) => {
    if (data.receiver.length === 0) {
      setActive(false);
    } else {
      setActive(true);
    }
    setInfo((pre) => {
      return { ...pre, to_user_id: data.receiver };
    });
  };

  const onRecAudio = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    const makeSound = (stream) => {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);

      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    };

    console.log(navigator);

    navigator.mediaDevices
      .enumerateDevices()
      .then((res) => console.dir(res))
      .catch((err) => console.dir(err));

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        setIsRecord(true);
        setStream(stream);
        setMedia(mediaRecorder);
        makeSound(stream);
        setStartTime(new Date().getTime());
        analyser.onaudioprocess = function (e) {
          setOnRec(false);
        };
      })
      .catch((err) => {
        // notReadableError 발생 -> 실기기 테스트 필요
        console.dir(err);
      });
  };

  const offRecAudio = () => {
    setIsRecord(false);
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
    setEndTime(new Date().getTime());
  };

  const onSubmitAudioFile = useCallback(() => {
    const sound = new File(
      [audioUrl],
      `${userName}-${String(new Date().getTime())}.mp3`,
      {
        lastModified: new Date().getTime(),
        type: "audio/mpeg",
      }
    );
    console.log(sound);
    const data = new FormData();
    data.append("audio", sound);
    data.append("second", Math.floor((endTime - startTime) / 1000));
    data.append("to_user_id", info.to_user_id);
    console.log(URL.createObjectURL(sound));
    console.log(Math.floor((endTime - startTime) / 1000));
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACK_HOST}/audio/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    })
      .then(() => {
        setAudioUrl();
        setIsRecord(false);
        setIsModal(true);
        setTimeout(() => {
          setIsModal(false);
          navigate("/voice");
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [audioUrl]);

  return (
    <>
      <Header label="음성메시지" back="true"></Header>
      {isModal && <ModalBack onClick={() => setIsModal(false)} />}
      {isModal && (
        <ModalDiv>
          <ModalContent onClick={() => setIsModal(false)}>
            <div>
              <Modal24>음성메시지가 전송되었습니다!</Modal24>
            </div>
          </ModalContent>
        </ModalDiv>
      )}
      <Container>
        <Receiver receivers={receivers}></Receiver>
        <VoiceRecDiv>
          <VoiceRecBtnDiv>
            <VoiceRecBtn
              onClick={onRec ? onRecAudio : offRecAudio}
              isRecord={isRecord}
              url={audioUrl}
            >
              <BsMicFill size={"7em"} color="#fff" />
              {/* <Icon path={mdiMicrophonePlus} size={"8em"} color="#fff" /> */}
            </VoiceRecBtn>
            {isRecord && <BtnAnimation />}
          </VoiceRecBtnDiv>
          <BtnBox>
            <Btn
              onClick={onSubmitAudioFile}
              disable={!audioUrl || !!isRecord || !active}
              active={!!audioUrl && !isRecord && active}
            >
              <BtnIcon>
                <Icon path={mdiMicrophonePlus} size={"2em"} color="#FF787F" />
              </BtnIcon>
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {"음성메시지 보내기"}
              </div>
            </Btn>
          </BtnBox>
        </VoiceRecDiv>
      </Container>
    </>
  );
}

export default VoiceRecord;
