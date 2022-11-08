import React, { useState } from "react";
import styled from "styled-components"
import { FaPlay, FaPause } from "react-icons/fa"

const VoiceMessageDiv = styled.div`
  display: flex;
`
const VoiceSenderDiv = styled.div`
  width: 17.5vmin;
  height: 17.5vmin;
  margin-right: 4.5vmin;
`
const VoiceSenderImg = styled.img`
  width: 17.5vmin;
  height: 17.5vmin;
  border-radius: 9vmin;
  object-fit: fill;
`
const VoiceDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 11vmin;
  width: 46.5vmin;
  background-color: #fdaf97;
  border-radius: 5.5vmin;
`
const VoiceIconDiv = styled.div`
  height: 9vmin;
  width: 9vmin;
  margin: 1vmin 4.5vmin 1vmin 1vmin;
  border-radius: 4.5vmin;
  background-color: #fff;
  text-align: center;
  line-height: 9vmin;
`
const VoiceTimeDiv = styled.div`
  color: #fff;
`
const VoiceTimeDifference = styled.div`
  font-size: 0.6rem;
  bottom: -4.5vmin;
  right: 4.5vmin;
`
const SenderName = styled.div`
  width: 17.5vmin;
  margin: 2.25vmin 0 4.5vmin;
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