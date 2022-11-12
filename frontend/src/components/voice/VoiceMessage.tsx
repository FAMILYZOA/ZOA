import React, { useState, useEffect } from "react";
import styled from "styled-components"
import { FaPlay, FaPause } from "react-icons/fa"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAppSelector } from "../../app/hooks";
import axios from "axios";

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
  position: absolute;
  font-size: 0.6rem;
  bottom: -16px;
  right: 16px;
  color: #444;
`
const SenderName = styled.div`
  width: 64px;
  margin: 8px 0 16px;
  text-align: center;
  font-size: 0.7em;
`
const FavoriteIconDiv = styled.div`
  width: 32px;
  height: 32px;
  margin-left: 20px;
  text-align: center;
  line-height: 36px;
  color: #FF787F;
`

type VoiceMessageProps = {
  id: number,
  image: string,
  set_name: string,
  audio: string, // url
  created_at: string, // date
  name: string,
  type: boolean,
  index: number,
  getIndex: (index: number, type: boolean) => void,
}

const VoiceMessage = ({ id, image, set_name, audio, created_at, name, type, index, getIndex }: VoiceMessageProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [voice] = useState(new Audio(audio));
  const [voicePlayingTime, setVoicePlayingTime] = useState<number>(voice.currentTime);
  const voiceDuration = voice.duration;
  const accessToken = useAppSelector(state => state.token.access);

  useEffect(() => {
      isPlaying ? voice.play() : voice.pause();
    },
    [isPlaying]
  );

  useEffect(() => {
    voice.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      voice.removeEventListener('ended', () => {
        setIsPlaying(false);
        setVoicePlayingTime(0);
      });
    };
  }, []);


  const togglePlay = () => {
    if (!isPlaying) {
      // 재생
      setIsPlaying(true);
      setInterval(() => {
        if (voice.duration !== voice.currentTime) {
          setVoicePlayingTime(voice.currentTime);
        } else {
          setVoicePlayingTime(0);
        }
      }, 50);
    } else {
      // 정지
      setIsPlaying(false);
    }
  }

  const timeDifference = (time: Date) => {
    const tempTime = new Date().getTime();
    const createTime = time.getTime();
    const timeDif = (tempTime - createTime) / 1000;

    if (timeDif > 12 * 30 * 24 * 3600) {
      return String(Math.floor(timeDif / (12 * 30 * 24 * 3600))) + '년 전'
    } else if (timeDif > 30 * 24 * 3600) {
      return String(Math.floor(timeDif / (30 * 24 * 3600))) + '개월 전'
    } else if (timeDif > 7 * 24 * 3600) {
      return String(Math.floor(timeDif / (7 * 24 * 3600))) + '주 전'
    } else if (timeDif > 24 * 3600) {
      return String(Math.floor(timeDif / (24 * 3600))) + '일 전'
    } 
    // else if (timeDif > 3600) {
    //   return String(Math.floor(timeDif / (3600))) + '시간 전'
    // } else if (timeDif > 60) {
    //   return String(Math.floor(timeDif / (60))) + '분 전'
    // } 
    else {
      return '오늘'
    }
  }

  const handleFavorite = () => {
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_BACK_HOST}/audio/${id}/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        status: !type,
      }
    })
      .then(() => {
        getIndex(index, type);
      })
      .catch((err) => {
        console.error(err);
      })
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
          <VoiceTimeDiv>{`${String(Math.floor((voiceDuration - voicePlayingTime)/60))} : ${ ("00" + String(Math.floor((voiceDuration - voicePlayingTime) % 60))).slice(-2)}` !== 'NaN : aN' ? `${String(Math.floor((voiceDuration - voicePlayingTime)/60))} : ${ ("00" + String(Math.floor((voiceDuration - voicePlayingTime) % 60))).slice(-2)}` : '0 : 00'}</VoiceTimeDiv>
          <VoiceTimeDifference>{timeDifference(new Date(created_at))}</VoiceTimeDifference>
        </VoiceDiv>
        <FavoriteIconDiv onClick={() => {handleFavorite()}}>
          {type ? <AiFillHeart /> : <AiOutlineHeart /> }
        </FavoriteIconDiv>
      </VoiceMessageDiv>
      <SenderName>{set_name ? set_name : name}</SenderName>
    </>
  )
}

export default VoiceMessage;