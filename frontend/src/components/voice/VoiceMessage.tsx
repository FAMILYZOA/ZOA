import React, { useState } from "react";
import styled from "styled-components"
import { FaPlay, FaPause } from "react-icons/fa"

const VoiceMessageDiv = styled.div`
  display: flex;
`
const VoiceSenderDiv = styled.div`
  width: 8vh;
  height: 8vh;
  margin-right: 2vh;
`
const VoiceSenderImg = styled.img`
  width: 8vh;
  height: 8vh;
  border-radius: 4vh;
  object-fit: fill;
`
const VoiceDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 21vh;
  background-color: #fdaf97;
  border-radius: 2.5vh;
`
const VoiceIconDiv = styled.div`
  height: 4vh;
  width: 4vh;
  margin: 0.5vh 2vh 0.5vh 0.5vh;
  border-radius: 2vh;
  background-color: #fff;
  text-align: center;
  line-height: 4vh;
`
const VoiceTimeDiv = styled.div`
  color: #fff;
`
const VoiceTimeDifference = styled.div`
  font-size: 1.5vh;
  bottom: -2vh;
  right: 2vh;
`
const SenderName = styled.div`
  width: 8vh;
  margin: 1vh 0 2vh;
  text-align: center;
`
type VoiceMessageProps = {
  id: number,
  image: string,
  set_name: string,
  audio: string, // url
  created_at: string, // date
}

const VoiceMessage = ({ id, image, set_name, audio, created_at }: VoiceMessageProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const togglePlay = () => {
    if (isPlaying) {
      // 재생
      setIsPlaying(false);
    } else {
      // 정지
      setIsPlaying(true);
    }
  }

  return (
    <>
      <VoiceMessageDiv>
        <VoiceSenderDiv>
          <VoiceSenderImg src={image}/>
        </VoiceSenderDiv>
        <VoiceDiv>
          <VoiceIconDiv onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay /> }
          </VoiceIconDiv>
          <VoiceTimeDiv></VoiceTimeDiv>
          <VoiceTimeDifference></VoiceTimeDifference>
        </VoiceDiv>
      </VoiceMessageDiv>
      <SenderName>{set_name}</SenderName>
    </>
  )
}

export default VoiceMessage;