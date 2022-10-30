import { Emoji } from "emoji-picker-react";
import styled from "styled-components";

type BoxProps = {
  children?: React.ReactNode;
  isEmoji: boolean;
  emojiCode?: string | undefined;
  preview: string;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
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
  resize: none;
`;
const TextAreaInnerStyle = styled.textarea`
  width: 75vw;
  height: 13vh;
  background-color: transparent;
  font-size: 20px;
  margin-left: 5px;
  border: none;
  resize: none;
`;

const TextBox = (props: BoxProps) => {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setter(e.currentTarget.value);
  };
  return (
    <TextBoxStyle>
      {props.isEmoji && props.emojiCode ? (
        <TextAreaEmojiStyle>
          <Emoji unified={props.emojiCode} />
          <TextAreaInnerStyle
            value={props.value}
            placeholder={props.preview}
            onChange={onChange}
          />
        </TextAreaEmojiStyle>
      ) : (
        <TextAreaEmojiStyle>
          <TextAreaStyle
            value={props.value}
            placeholder={props.preview}
            onChange={onChange}
          />
        </TextAreaEmojiStyle>
      )}
    </TextBoxStyle>
  );
};

export default TextBox;
