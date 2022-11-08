import { AxiosError, AxiosResponse } from "axios";
import EmojiPicker, {
  Emoji,
  EmojiStyle,
  EmojiClickData,
} from "emoji-picker-react";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthRefresh, customAxios } from "../../api/customAxios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setAccessToken,
  setRefreshToken,
} from "../../features/token/tokenSlice";
import Header from "../../components/header";
import TextBox from "../../components/textBox";

const DateSelectorStyle = styled.div`
  margin-top: 4vh;
  margin-bottom: 3vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const DateStyle = styled.p`
  margin-top: 0;
  margin-bottom: 0;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 100%;
  /* or 20px */

  letter-spacing: -0.01em;

  color: #ff787f;
`;

const EmojiSelectorStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const EmojiOuterStyle = styled.div`
  margin: 8px;
`;

const DescStyle = styled.div`
  display: flex;
  margin: 4px 5% 0;
  align-items: center;
`;

const DescTextStyle = styled.p`
  margin: 8px 8px;
`;

const RegistStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
  margin-bottom: 10px;
`;

const RegistBtnStyle = styled.button`
  width: 90vw;
  height: 8vh;

  background: linear-gradient(92.88deg, #fe9b7c 15.53%, #fec786 92.45%);

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 100%;
  /* or 24px */

  letter-spacing: -0.01em;

  color: #ffffff;

  border-radius: 20px;
  border: none;
`;

type EmojiProps = {
  selectedEmoji: string;
  setSelectedEmoji: any;
  isModal: boolean;
  toggleModal: any;
  emojiClick: any;
  emojiSelect: any;
};

type InputProps = {
  value: string;
  // 자료형 변환 예정
  setter: any;
};

type registBtnPRops = {
  emoji: string;
  yesterday: string;
  today: string;
};

const DateSelector = () => {
  const [date, setDate] = useState<Date>(new Date());

  const dateFormat = (date: Date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return `${year}.${month + 1}.${day}`;
  };

  const dayBefore = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)));
  };
  const dayAfter = () => {
    if (date < new Date()) {
      setDate(new Date(date.setDate(date.getDate() + 1)));
    }
  };
  return (
    <DateSelectorStyle>
      <IoIosArrowBack fontSize={28} color={"#666666"} onClick={dayBefore} />
      <DateStyle>{dateFormat(date)}</DateStyle>
      <IoIosArrowForward fontSize={28} color={"#666666"} onClick={dayAfter} />
    </DateSelectorStyle>
  );
};

const ScrumCreateBody = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("1f600");
  const [isModal, toggleModal] = useState<boolean>(false);
  const [yesterdayValue, setYesterdayValue] = useState<string>("");
  const [todayValue, setTodayValue] = useState<string>("");

  const emojiClick = () => {
    toggleModal(true);
  };

  const emojiSelect = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.unified);
    toggleModal(false);
  };

  return (
    <div>
      <EmojiSelector
        selectedEmoji={selectedEmoji}
        setSelectedEmoji={setSelectedEmoji}
        isModal={isModal}
        toggleModal={toggleModal}
        emojiClick={emojiClick}
        emojiSelect={emojiSelect}
      />
      <YesterdayWork value={yesterdayValue} setter={setYesterdayValue} />
      <Today value={todayValue} setter={setTodayValue} />
      {/*추후에 따로 만든 컴포넌트로 대체 예정*/}
      <RegistBtn
        emoji={selectedEmoji}
        yesterday={yesterdayValue}
        today={todayValue}
      />
    </div>
  );
};

const EmojiSelector = (props: EmojiProps) => {
  const modalStyle = {
    content: {
      padding: 0,
      border: "none",
      top: "40%",
    },
  };

  return (
    <EmojiSelectorStyle>
      <div>오늘의 나는?</div>
      <EmojiOuterStyle onClick={props.emojiClick}>
        <Emoji
          unified={props.selectedEmoji}
          emojiStyle={EmojiStyle.APPLE}
          size={72}
        />
      </EmojiOuterStyle>
      <Modal
        isOpen={props.isModal}
        style={modalStyle}
        ariaHideApp={false}
        onRequestClose={() => {
          props.toggleModal(false);
        }}
      >
        <EmojiPicker
          onEmojiClick={props.emojiSelect}
          skinTonesDisabled={true}
          width={"99%"}
          height={"99%"}
        />
      </Modal>
    </EmojiSelectorStyle>
  );
};

const YesterdayWork = (props: InputProps) => {
  return (
    <div>
      <DescStyle>
        <Emoji unified="1f644" emojiStyle={EmojiStyle.APPLE} size={24} />
        <DescTextStyle>어제 뭐 했더라?</DescTextStyle>
      </DescStyle>
      <TextBox
        isEmoji={true}
        value={props.value}
        setter={props.setter}
        emojiCode={"1f60e"}
        preview={"어제 한 일"}
      ></TextBox>
    </div>
  );
};

const Today = (props: InputProps) => {
  return (
    <div>
      <DescStyle>
        <Emoji unified="1f64b" emojiStyle={EmojiStyle.APPLE} size={24} />
        <DescTextStyle>가족들에게 한 마디!</DescTextStyle>
      </DescStyle>
      <TextBox
        isEmoji={true}
        value={props.value}
        setter={props.setter}
        emojiCode={"1f4e2"}
        preview={"가족에게 한 마디"}
      ></TextBox>
    </div>
  );
};

const RegistBtn = (props: registBtnPRops) => {
  // 나중에 저장 방식 바뀌면 수정 예정
  const [isRegist, toggleResigt] = useState<boolean>(true);
  const access: string = useAppSelector((state) => state.token.access);
  const refresh: string = useAppSelector((state) => state.token.refresh);
  useEffect(() => {
    if (!props.emoji || !props.yesterday || !props.today) {
      toggleResigt(true);
    } else {
      toggleResigt(false);
    }
  }, [props.emoji, props.yesterday, props.today]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const regist = () => {
    // 0. token 파싱
    const accessToken = `Bearer ${access}`;
    const config = {
      headers: { Authorization: accessToken },
    };
    if (access) {
      const scrumData = new FormData();
      scrumData.append("emoji", props.emoji);
      scrumData.append("yesterday", props.yesterday);
      scrumData.append("today", props.today);
      customAxios
        .post("scrums/", scrumData, config)
        .then((res: AxiosResponse) => {
          if (res.status === 201) {
            // 스크럽 등록 성공
            alert("스크럼 등록 성공");
            // 현재는 메인 화면으로 돌아감, 추후에 머지 되면 스크럼 목록 화면으로 돌아갈 예정
            navigate("/hello/", { replace: true });
          }
        })
        .catch(async (err) => {
          switch (err.response.status) {
            case 400:
              alert("스크럼은 하루에 한개만 작성 가능합니다.");
              break;
            case 401:
              const code = err.response.data.code;
              if (code === "token_not_valid") {
                const tokens = await AuthRefresh(refresh);
                console.log(tokens);
                if (tokens) {
                  dispatch(setAccessToken(tokens.access));
                  dispatch(setRefreshToken(tokens.refresh));
                } else {
                  dispatch(setAccessToken(""));
                  dispatch(setRefreshToken(""));

                  navigate("/login", { replace: true });
                }
              }
              break;
            default:
              console.log(err);
              break;
          }
        });
    } else {
      alert("잘못된 접근! token이 없습니다!");
    }
  };

  return (
    <RegistStyle>
      {/* 현재 disable 상태일 떄 css가 변화하지 않음 */}
      <RegistBtnStyle onClick={regist} disabled={isRegist}>
        완료
      </RegistBtnStyle>
    </RegistStyle>
  );
};

const ScrumCreate = () => {
  return (
    <div>
      <Header label="안녕" back={true}></Header>
      <div>
        <DateSelector></DateSelector>
        <ScrumCreateBody></ScrumCreateBody>
      </div>
    </div>
  );
};

export default ScrumCreate;
