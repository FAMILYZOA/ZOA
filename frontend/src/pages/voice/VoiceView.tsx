import React, { useState } from "react";
import styled, { css } from "styled-components";

interface highLightProps {
  isLeft?: boolean;
}

const SelectViewDiv = styled.div`
  display: flex;
  position: relative;
  height: 2.4em;
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
  background: linear-gradient(45deg, #fec786, #ff787f);
`
const UnviewedVoices = () => {
  
}

const VoiceView = () => {
  const [unViewedMessage, setUnViewedMessage] = useState<{id: string}[]>([]);
  const [keptMessage, setKeptMessage] = useState<{id: string}[]>([]);
  const [isLeft, setIsLeft] = useState<boolean>(true);

  return (
    <>
      <SelectViewDiv>
        <SelectViewItem onClick={() => (setIsLeft(true))}>{`미확인 메시지(${unViewedMessage.length})`}</SelectViewItem>
        <SelectViewItem onClick={() => (setIsLeft(false))}>{`보관함 메시지(${keptMessage.length})`}</SelectViewItem>
        <SelectHighlight isLeft={isLeft}/>
      </SelectViewDiv>
      <VoiceMessageDiv>
      {
        isLeft ? (<></>) : (<></>)
      }
      </VoiceMessageDiv>
    </>
  )
}

export default VoiceView;