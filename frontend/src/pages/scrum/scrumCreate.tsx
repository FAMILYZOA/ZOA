import { AxiosError, AxiosResponse } from "axios";
import EmojiPicker, {
  Emoji,
  EmojiStyle,
  EmojiClickData,
} from "emoji-picker-react";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
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
  margin: 32px auto 32px;
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
  font-size: 1.5em;
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
  margin: 24px 0;
`;

const EmojiOuterStyle = styled.div`
  margin: 8px;
`;

const DescStyle = styled.div`
  display: flex;
  margin: 4px 1em 0;
  align-items: center;
`;

const DescTextStyle = styled.p`
  margin: 8px 8px;
`;

const RegistStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 32px auto;
`;

const RegistBtnStyle = styled.button`
  width: 90vw;
  height: 2.4em;

  background: linear-gradient(92.88deg, #fe9b7c 15.53%, #fec786 92.45%);

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 1.2em;
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
  // ????????? ?????? ??????
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

  return (
    <DateSelectorStyle>
      <DateStyle>{dateFormat(date)}</DateStyle>
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
      {/*????????? ?????? ?????? ??????????????? ?????? ??????*/}
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
      <div>????????? ???????</div>
      <EmojiOuterStyle onClick={props.emojiClick}>
        <Emoji
          unified={props.selectedEmoji}
          emojiStyle={EmojiStyle.APPLE}
          size={80}
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
          searchDisabled={true}
          width={"99%"}
          height={"99%"}
        />
      </Modal>
    </EmojiSelectorStyle>
  );
};

const YesterdayWork = (props: InputProps) => {
  return (
    <div style={{ margin: "16px 0" }}>
      <DescStyle>
        <Emoji unified="1f644" emojiStyle={EmojiStyle.APPLE} size={24} />
        <DescTextStyle>?????? ??? ??????????</DescTextStyle>
      </DescStyle>
      <TextBox
        isEmoji={true}
        value={props.value}
        setter={props.setter}
        emojiCode={"1f60e"}
        preview={"?????? ??? ???"}
        maxLength={25}
      ></TextBox>
    </div>
  );
};

const Today = (props: InputProps) => {
  return (
    <div style={{ margin: "16px 0" }}>
      <DescStyle>
        <Emoji unified="1f64b" emojiStyle={EmojiStyle.APPLE} size={24} />
        <DescTextStyle>??????????????? ??? ??????!</DescTextStyle>
      </DescStyle>
      <TextBox
        isEmoji={true}
        value={props.value}
        setter={props.setter}
        emojiCode={"1f4e2"}
        preview={"???????????? ??? ??????"}
        maxLength={25}
      ></TextBox>
    </div>
  );
};

const RegistBtn = (props: registBtnPRops) => {
  // ????????? ?????? ?????? ????????? ?????? ??????
  const [isRegist, toggleResigt] = useState<boolean>(true);
  const access: string = useAppSelector((state) => state.token.access);
  const refresh: string = useAppSelector((state) => state.token.refresh);
  //const userID = useAppSelector((state) => state.user.id);
  //const userName = useAppSelector((state) => state.family.users.filter(user => user.id === userID)[0].set_name);
  const familyId = useAppSelector(state => state.family.id);
  const userName = useAppSelector((state) => state.user.name);

  useEffect(() => {
    if (!props.emoji || !props.yesterday || !props.today) {
      toggleResigt(true);
    } else {
      toggleResigt(false);
    }
  }, [props.emoji, props.yesterday, props.today]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (familyId < 0) {
      navigate("/");
    }
  }, [])

  const regist = () => {
    // 0. token ??????
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
            navigate("/hello/", { replace: true });

            // ??????????????? ????????? ?????? ?????? ?????????
            const messageData = new FormData();
            // [??????] ___ ?????? '??????'??? ?????????????????????. ?????? ???????????? ??????????????????!
            const messageBody = `[??????] ${userName}?????? ????????? ?????????????????????. ?????? ???????????? ??????????????????`;
            messageData.append("body", messageBody);
            customAxios
              .post("/event/FCM/send/", messageData, config)
              .then((res: AxiosResponse) => {
                console.log(res);
              })
              .catch((err: AxiosError) => {
                console.log(err);
              });
          }
        })
        .catch(async (err) => {
          console.log(err);
          
          switch (err.response.status) {
            case 400:
              alert("???????????? ????????? ????????? ?????? ???????????????.");
              break;
            case 401:
              const code = err.response.data.code;
              if (code === "token_not_valid") {
                const tokens = await AuthRefresh(refresh);
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
              break;
          }
        });
    } else {
      alert("???????????? ????????? ???????????????.");
    }
  };

  return (
    <RegistStyle>
      {/* ?????? disable ????????? ??? css??? ???????????? ?????? */}
      <RegistBtnStyle
        onClick={
          props.emoji && props.yesterday && props.today
            ? regist
            : () => {
                alert(
                  "?????????, ?????? ????????? ??? ?????? ???????????? ??? ?????? ????????????."
                );
              }
        }
        disabled={isRegist}
      >
        ????????????
      </RegistBtnStyle>
    </RegistStyle>
  );
};

const ScrumCreate = () => {
  return (
    <div style={{ paddingBottom: "64px" }}>
      <Header label="??????" back={true}></Header>
      <div>
        <DateSelector></DateSelector>
        <ScrumCreateBody></ScrumCreateBody>
      </div>
    </div>
  );
};

export default ScrumCreate;
