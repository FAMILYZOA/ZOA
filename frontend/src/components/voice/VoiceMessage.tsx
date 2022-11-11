import React, { useState } from "react";
import styled from "styled-components"
import { FaPlay, FaPause } from "react-icons/fa"

const VoiceMessageDiv = styled.div`
  display: flex;
  align-items: center;
`
const VoiceSenderDiv = styled.div`
  width: 64px;
  height: 64px;
  margin-right: 16px;
`
const VoiceSenderImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  object-fit: fill;
`
const VoiceDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 40px;
  width: 168px;
  background-color: #fdaf97;
  border-radius: 20px;
`
const VoiceIconDiv = styled.div`
  height: 32px;
  width: 32px;
  margin: 4px 16px 4px 4px;
  border-radius: 16px;
  background-color: #fff;
  text-align: center;
  line-height: 36px;
  color: #FEC786;
`
const VoiceTimeDiv = styled.div`
  color: #fff;
`
const VoiceTimeDifference = styled.div`
  font-size: 0.6rem;
  bottom: -16px;
  right: 16px;
`
const SenderName = styled.div`
  width: 64px;
  margin: 8px 0 16px;
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