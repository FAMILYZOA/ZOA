import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FaPlay, FaPause } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAppSelector } from "../../app/hooks";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const VoiceMessageDiv = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr;
  align-items: center;
`;
const VoiceSenderDiv = styled.div`
  width: 64px;
  height: 64px;
  margin-right: 16px;
`;
const VoiceSenderImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  object-fit: fill;
`;
const VoiceDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 40px;
  width: 100%;
  background-color: #fdaf97;
  border-radius: 20px;
`;
const VoiceIconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  margin: 4px 16px 4px 4px;
  border-radius: 16px;
  background-color: #fff;
  text-align: center;
  color: #fec786;
`;
const VoiceDeleteIcon = styled.div`
  display: flex;
  flex: 1;
  justify-content: end;
  align-items: center;
  height: 32px;
  width: 32px;
  margin: 4px 8px 4px auto;
  text-align: center;
  color: #fc7e58;
`;

const VoiceTimeDiv = styled.div`
  color: #fff;
`;
const VoiceTimeDifference = styled.div`
  position: absolute;
  font-size: 0.6rem;
  bottom: -16px;
  right: 16px;
  color: #444;
`;
const SenderName = styled.div`
  width: 64px;
  margin: 8px 0 16px;
  text-align: center;
  font-size: 0.7em;
`;

const ico_like = keyframes`
  0%{transform:scale(.2);}
  40%{transform:scale(1.2);}
  100%{transform:scale(1);}
`;
const ico_like_out = keyframes`
  0%{transform:scale(1.4);}
  100%{transform:scale(1);}
`;

const FavoriteIconDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 32px;
  text-align: center;
  color: #ff787f;
  /* animation: ${ico_like} 1s ; */
  margin: 0 auto;
`;

type VoiceMessageProps = {
  id: number;
  image: string;
  set_name: string;
  audio: string; // url
  created_at: string; // date
  name: string;
  type: boolean;
  index: number;
  second: number;
  getIndex: (index: number, type: boolean) => void;
  playingId: number;
  setPlayingId: (id: number) => void;
  getDelete: (id: number) => void;
};

const VoiceMessage = ({
  id,
  image,
  set_name,
  audio,
  created_at,
  name,
  type,
  index,
  getIndex,
  second,
  setPlayingId,
  playingId,
  getDelete,
}: VoiceMessageProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [voice] = useState(new Audio(audio));
  const [voicePlayingTime, setVoicePlayingTime] = useState<number>(
    voice.currentTime
  );
  const voiceDuration = second;
  const accessToken = useAppSelector((state) => state.token.access);

  const voicePlay = () => {
    setPlayingId(id);

    voice
      .play()
      .then((res) => {
        console.log("play");
      })
      .catch((err) => console.dir(err));
  };

  const voicePause = () => {
    if (playingId === id) {
      setPlayingId(-1);
    } else {
      voice.currentTime = 0;
    }
    voice.pause();
  };

  useEffect(() => {
    if (playingId !== id) {
      setIsPlaying(false);
    }
  }, [playingId]);

  useEffect(() => {
    isPlaying ? voicePlay() : voicePause();
  }, [isPlaying]);

  useEffect(() => {
    voice.addEventListener("ended", () => setIsPlaying(false));
    return () => {
      voice.removeEventListener("ended", () => {
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
  };

  const deleteVoice = () => {
    getDelete(id);
  };

  const timeDifference = (time: Date) => {
    const tempTime = new Date().getTime();
    const createTime = time.getTime();
    const timeDif = (tempTime - createTime) / 1000;

    if (timeDif > 12 * 30 * 24 * 3600) {
      return String(Math.floor(timeDif / (12 * 30 * 24 * 3600))) + "년 전";
    } else if (timeDif > 30 * 24 * 3600) {
      return String(Math.floor(timeDif / (30 * 24 * 3600))) + "개월 전";
    } else if (timeDif > 7 * 24 * 3600) {
      return String(Math.floor(timeDif / (7 * 24 * 3600))) + "주 전";
    } else if (timeDif > 24 * 3600) {
      return String(Math.floor(timeDif / (24 * 3600))) + "일 전";
    }
    // else if (timeDif > 3600) {
    //   return String(Math.floor(timeDif / (3600))) + '시간 전'
    // } else if (timeDif > 60) {
    //   return String(Math.floor(timeDif / (60))) + '분 전'
    // }
    else {
      return "오늘";
    }
  };
  const handleFavorite = () => {
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_BACK_HOST}/audio/${id}/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        status: !type,
      },
    })
      .then(() => {
        getIndex(index, type);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <VoiceMessageDiv>
        <VoiceSenderDiv>
          <VoiceSenderImg src={image} />
        </VoiceSenderDiv>
        <VoiceDiv>
          <VoiceIconDiv onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </VoiceIconDiv>
          <VoiceTimeDiv>
            {`${String(
              Math.floor(
                (voiceDuration < voicePlayingTime
                  ? 0
                  : voiceDuration - voicePlayingTime) / 60
              )
            )} : ${(
              "00" +
              String(
                Math.floor(
                  (voiceDuration < voicePlayingTime
                    ? 0
                    : voiceDuration - voicePlayingTime) % 60
                )
              )
            ).slice(-2)}` !== "NaN : aN"
              ? `${String(
                  Math.floor(
                    (voiceDuration < voicePlayingTime
                      ? 0
                      : voiceDuration - voicePlayingTime) / 60
                  )
                )} : ${(
                  "00" +
                  String(
                    Math.floor(
                      (voiceDuration < voicePlayingTime
                        ? 0
                        : voiceDuration - voicePlayingTime) % 60
                    )
                  )
                ).slice(-2)}`
              : "0 : 00"}
          </VoiceTimeDiv>
          <VoiceDeleteIcon onClick={deleteVoice}>
            <IoMdClose />
          </VoiceDeleteIcon>
          <VoiceTimeDifference>
            {timeDifference(new Date(created_at))}
          </VoiceTimeDifference>
        </VoiceDiv>
        <FavoriteIconDiv
          onClick={() => {
            handleFavorite();
          }}
        >
          {type ? (
            <AiFillHeart style={{ margin: "16px" }} />
          ) : (
            <AiOutlineHeart style={{ margin: "16px" }} />
          )}
        </FavoriteIconDiv>
      </VoiceMessageDiv>
      <SenderName>{set_name ? set_name : name}</SenderName>
    </>
  );
};

export default VoiceMessage;
