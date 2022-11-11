import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { VoiceMessage } from "../../components/voice"

interface highLightProps {
  isLeft?: boolean;
}

const SelectViewDiv = styled.div`
  display: flex;
  position: relative;
  height: 2.4em;
  background-color: #fff;
`
const SelectViewItem = styled.div`
  text-align: center;
  line-height: 2.4em;
  flex: 1;
`
const SelectHighlight = styled.div<highLightProps>`
  width: 50vw;
  height: 3px;
  position: absolute;
  background-color: #FE9B7C;
  bottom: 0;
  ${({ isLeft }) => {
    if (isLeft) {
      return css`
        left: 0;
      `;
    } else {
      return css`
        left: 50%;
      `
    }
  }}
  transition: left 0.2s;
`
const VoiceMessageDiv = styled.div`
  margin: 0.8em;
`
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
`;
const HeaderLabel = styled.div`
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  line-height: 56px;
`;

const UnviewedVoices = () => {
  
}

const Header = () => {
  const navigate = useNavigate();
  const moveToCreate = () => {
    navigate("/voice/create");
  };
  return (
    <HeaderBox>
      <IconBox onClick={moveToCreate}>
        <FaPlus size={"24"} />
      </IconBox>
      <HeaderLabel>{"음성메시지"}</HeaderLabel>
    </HeaderBox>
  )
}

const VoiceView = () => {
  const [unViewedMessage, setUnViewedMessage] = useState<{
    id: number, 
    image: string, 
    set_name: string, 
    audio: string, 
    created_at: string
  }[]>([]);
  const [keptMessage, setKeptMessage] = useState<{
    id: number, 
    image: string, 
    set_name: string, 
    audio: string, 
    created_at: string
  }[]>([]);
  const [isLeft, setIsLeft] = useState<boolean>(true);
  const accessToken = useAppSelector(state => state.token.access)

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACK_HOST}/audio/?search=0`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setUnViewedMessage(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
  },[])

  return (
    <>
      <Header />
      <SelectViewDiv>
        <SelectViewItem onClick={() => (setIsLeft(true))}>{`미확인 메시지(${unViewedMessage.length})`}</SelectViewItem>
        <SelectViewItem onClick={() => (setIsLeft(false))}>{`보관함 메시지(${keptMessage.length})`}</SelectViewItem>
        <SelectHighlight isLeft={isLeft}/>
      </SelectViewDiv>
      <VoiceMessageDiv>
      {
        isLeft ? (<>
          {unViewedMessage.map((message) => (
            <VoiceMessage 
              id={message.id}
              image={message.image}
              set_name={message.set_name}
              audio={message.audio}
              created_at={message.created_at}
            />
          ))}
        </>) : (<>
          {keptMessage.map((message) => (
            <VoiceMessage 
              id={message.id}
              image={message.image}
              set_name={message.set_name}
              audio={message.audio}
              created_at={message.created_at}
            />
          ))}
        </>)
      }
      </VoiceMessageDiv>
    </>
  )
}

export default VoiceView;