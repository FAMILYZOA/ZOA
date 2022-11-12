import { Emoji } from "emoji-picker-react";
import styled from "styled-components";

type BoxProps = {
  children?: React.ReactNode;
  isEmoji: boolean;
  emojiCode?: string | undefined;
  preview: string;
  value: string;
  maxLength: number;
  setter: React.Dispatch<React.SetStateAction<string>>;
};

const TextBoxStyle = styled.div`
  height: 4em;
  margin: 0 5%;
  background-color: #fff1e1;
  border-radius: 10px;
`;

const TextAreaEmojiStyle = styled.div`
  display: flex;
  padding: 10px;
`;
const TextAreaStyle = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: transparent;
  margin-left: 5px;
  border: none;
  resize: none;
`;
const TextAreaInnerStyle = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: transparent;
  font-size: 1em;
  margin-left: 5px;
  border: none;
  resize: none;
  font-family: 'Pretendard' ;
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
            maxLength={props.maxLength}
          />
        </TextAreaEmojiStyle>
      ) : (
        <TextAreaEmojiStyle>
          <TextAreaStyle
            value={props.value}
            placeholder={props.preview}
            onChange={onChange}
            maxLength={props.maxLength}
          />
        </TextAreaEmojiStyle>
      )}
    </TextBoxStyle>
  );
};

export default TextBox;
