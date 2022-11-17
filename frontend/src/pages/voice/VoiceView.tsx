import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { VoiceMessage } from "../../components/voice";
import { FiPlus } from "react-icons/fi";

interface highLightProps {
  isLeft?: boolean;
}

const SelectViewDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 2.4em;
  background-color: #fff;
`;
const SelectViewItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  font-size: 0.9em;
`;
const SelectHighlight = styled.div<highLightProps>`
  width: 50%;
  height: 3px;
  position: absolute;
  background-color: #fe9b7c;
  bottom: 0;
  ${({ isLeft }) => {
    if (isLeft) {
      return css`
        left: 0;
      `;
    } else {
      return css`
        left: 50%;
      `;
    }
  }}
  transition: left 0.2s;
`;
const VoiceMessageDiv = styled.div`
  margin: 0.8em;
  height: calc(100vh - 180px);
  overflow-y: scroll;
`;
const HeaderBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  position: sticky;
  top: 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  z-index: 1;
`;
const IconBox = styled.div`
  margin: auto;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HeaderLabel = styled.div`
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  line-height: 56px;
`;

const Header = () => {
  const navigate = useNavigate();
  const moveToCreate = () => {
    navigate("/voice/record");
  };
  return (
    <HeaderBox>
      <IconBox onClick={moveToCreate}>
        <FiPlus size={"24"} />
      </IconBox>
      <HeaderLabel>{"음성메시지"}</HeaderLabel>
    </HeaderBox>
  );
};

const VoiceView = () => {
  const [unViewedMessage, setUnViewedMessage] = useState<
    {
      id: number;
      image: string;
      set_name: string;
      audio: string;
      created_at: string;
      name: string;
      second: number;
    }[]
  >([]);
  const [keptMessage, setKeptMessage] = useState<
    {
      id: number;
      image: string;
      set_name: string;
      audio: string;
      created_at: string;
      name: string;
      second: number;
    }[]
  >([]);
  const [isLeft, setIsLeft] = useState<boolean>(true);
  const [unViewLength, setUnViewLength] = useState<number>(0);
  const [keptLength, setKeptLength] = useState<number>(0);
  const accessToken = useAppSelector((state) => state.token.access);
  const [playingId, setPlayingId] = useState<number>(-1);

  const getVoice = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACK_HOST}/audio/?search=0`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        setUnViewedMessage(res.data);
        setUnViewLength(res.data.length);
      })
      .catch((err) => {
        console.error(err);
      });
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACK_HOST}/audio/?search=1`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        setKeptMessage(res.data);
        setKeptLength(res.data.length);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getVoice();
  }, [isLeft]);

  const getIndex = (index: number, type: boolean) => {
    if (!type) {
      const tempVoice = unViewedMessage;
      tempVoice.splice(index, 1);
      setUnViewedMessage([...tempVoice]);
      setUnViewLength(unViewLength - 1);
      setKeptLength(keptLength + 1);
    } else {
      const tempVoice = keptMessage;
      tempVoice.splice(index, 1);
      setKeptMessage([...tempVoice]);
      setKeptLength(keptLength - 1);
      setUnViewLength(unViewLength + 1);
    }
  };

  return (
    <>
      <Header />
      <SelectViewDiv>
        <SelectViewItem
          onClick={() => {
            setIsLeft(true);
            getVoice();
          }}
        >{`받은 메시지(${unViewLength})`}</SelectViewItem>
        <SelectViewItem
          onClick={() => {
            setIsLeft(false);
            getVoice();
          }}
        >{`보관함 메시지(${keptLength})`}</SelectViewItem>
        <SelectHighlight isLeft={isLeft} />
      </SelectViewDiv>
      <VoiceMessageDiv>
        {isLeft ? (
          <>
            {unViewedMessage.map((message, index) => (
              <VoiceMessage
                id={message.id}
                image={message.image}
                set_name={message.set_name}
                audio={message.audio}
                created_at={message.created_at}
                key={message.id}
                name={message.name}
                type={false}
                index={index}
                getIndex={getIndex}
                second={message.second}
                playingId={playingId}
                setPlayingId={setPlayingId}
              />
            ))}
          </>
        ) : (
          <>
            {keptMessage.map((message, index) => (
              <VoiceMessage
                id={message.id}
                image={message.image}
                set_name={message.set_name}
                audio={message.audio}
                created_at={message.created_at}
                key={message.id}
                name={message.name}
                type={true}
                index={index}
                getIndex={getIndex}
                second={message.second}
                playingId={playingId}
                setPlayingId={setPlayingId}
              />
            ))}
          </>
        )}
      </VoiceMessageDiv>
    </>
  );
};

export default VoiceView;
