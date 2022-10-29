import { NONAME } from "dns";
import EmojiPicker, {
  Emoji,
  EmojiStyle,
  EmojiClickData,
} from "emoji-picker-react";
import * as React from "react";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Modal from "react-modal";
import styled from "styled-components";
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
  font-size: 28px;
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
  margin: 6vw;
`;

const DescStyle = styled.div`
  display: flex;
  margin-left: 5vw;
  margin-right: 5vw;
`;

const DescTextStyle = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 10px;
  font-size: 24px;
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
  font-size: 24px;
  line-height: 100%;
  /* or 24px */

  letter-spacing: -0.01em;

  color: #ffffff;

  border-radius: 20px;
  border: none;
`;

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

const EmojiSelector = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("1f600");
  const [isModal, toggleModal] = useState<boolean>(false);

  const modalStyle = {
    content: {
      padding: 0,
      border: "none",
      top: "40%",
    },
  };

  const emojiClick = () => {
    toggleModal(true);
  };

  const emojiSelect = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.unified);
    toggleModal(false);
  };

  return (
    <EmojiSelectorStyle>
      <div>오늘의 나는?</div>
      <EmojiOuterStyle onClick={emojiClick}>
        <Emoji
          unified={selectedEmoji}
          emojiStyle={EmojiStyle.APPLE}
          size={84}
        />
      </EmojiOuterStyle>
      <Modal
        isOpen={isModal}
        style={modalStyle}
        ariaHideApp={false}
        onRequestClose={() => {
          toggleModal(false);
        }}
      >
        <EmojiPicker
          onEmojiClick={emojiSelect}
          skinTonesDisabled={true}
          width={"99%"}
          height={"99%"}
        />
      </Modal>
    </EmojiSelectorStyle>
  );
};

const YesterdayWork = () => {
  return (
    <div>
      <DescStyle>
        <Emoji unified="1f644" emojiStyle={EmojiStyle.APPLE} size={24} />
        <DescTextStyle>어제 뭐 했더라?</DescTextStyle>
      </DescStyle>
      <TextBox
        isEmoji={true}
        emojiCode={"1f60e"}
        textValue={"어제 한 일"}
      ></TextBox>
    </div>
  );
};

const FamilyTalk = () => {
  return (
    <div>
      <DescStyle>
        <Emoji unified="1f64b" emojiStyle={EmojiStyle.APPLE} size={24} />
        <DescTextStyle>가족들에게 한 마디!</DescTextStyle>
      </DescStyle>
      <TextBox
        isEmoji={true}
        emojiCode={"1f4e2"}
        textValue={"가족에게 한 마디"}
      ></TextBox>
    </div>
  );
};

const RegistBtn = () => {
  return (
    <RegistStyle>
      <RegistBtnStyle>완료</RegistBtnStyle>
    </RegistStyle>
  );
};

const ScrumCreate = () => {
  return (
    <div>
      <Header label="데일리스크럼" back={true} />
      <div>
        <DateSelector />
        <EmojiSelector />
        <YesterdayWork />
        <FamilyTalk />
        {/*추후에 따로 만든 컴포넌트로 대체 예정*/}
        <RegistBtn />
      </div>
      <div>푸터 자리</div>
    </div>
  );
};

export default ScrumCreate;
