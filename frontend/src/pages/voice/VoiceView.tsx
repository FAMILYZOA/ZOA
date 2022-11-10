import React, { useState } from "react";
import styled, { css } from "styled-components";

interface highLightProps {
  isLeft?: boolean;
}

const SelectViewDiv = styled.div`
  display: flex;
  position: relative;
  height: 13.25vmin;
`
const SelectViewItem = styled.div`
  text-align: center;
  line-height: 13.25vmin;
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
        object-position: left bottom;
      `;
    } else {
      return css`
        object-position: right bottom;
      `
    }
  }}
  transition: object-position 0.5s;
`
const VoiceMessageDiv = styled.div`
  margin: 4.5vmin;
`

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
    </>
  )
}

export default VoiceView;