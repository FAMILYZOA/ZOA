import { Emoji } from "emoji-picker-react";
import React, { useState } from "react";
import styled from "styled-components";

type BoxProps = {
  children?: React.ReactNode;
  isEmoji: boolean;
  emojiCode?: string | undefined;
  textValue: string;
};

const TextBoxStyle = styled.div`
  height: 16vh;
  margin-left: 5vw;
  margin-right: 5vw;

  background-color: #fff1e1;

  border-radius: 10px;
`;

const TextAreaEmojiStyle = styled.div`
  display: flex;
  padding: 10px;
`;
const TextAreaStyle = styled.textarea`
  width: 86vw;
  height: 13vh;
  background-color: transparent;
  font-size: 20px;
  margin-left: 5px;
  border: none;
`;
const TextAreaInnerStyle = styled.textarea`
  width: 75vw;
  height: 13vh;
  background-color: transparent;
  font-size: 20px;
  margin-left: 5px;
  border: none;
`;

const TextBox = (props: BoxProps) => {
  const [value, setValue] = useState<string>("");

  const handleValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };
  return (
    <TextBoxStyle>
      {props.isEmoji && props.emojiCode ? (
        <TextAreaEmojiStyle>
          <Emoji unified={props.emojiCode} />
          <TextAreaInnerStyle
            value={value}
            placeholder={props.textValue}
            onChange={handleValue}
          />
        </TextAreaEmojiStyle>
      ) : (
        <TextAreaEmojiStyle>
          <TextAreaStyle
            value={value}
            placeholder={props.textValue}
            onChange={handleValue}
          />
        </TextAreaEmojiStyle>
      )}
    </TextBoxStyle>
  );
};

export default TextBox;
