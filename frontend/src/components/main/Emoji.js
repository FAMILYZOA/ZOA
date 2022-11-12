import React, { useState } from "react";
import styled from "styled-components";
import { BrowserView, MobileView } from "react-device-detect";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  margin: 5%;
  border-bottom: 1px solid #d9d9d9;
`;

const EContainer = styled.div`
  display: flex;
  margin: 16px 8px;
  height: 72px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  &::-webkit-scrollbar {
    width: auto;
    height: 5px;
    border-radius: 3px;
    background-color: #ffcdbe;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff787f;
    height: 3px;
    border-radius: 3px;
  }
`;
const MContainer = styled.div`
  display: flex;
  margin: 16px 8px;
  height: 72px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
`;
const EmojiBox = styled.div`
  display: inline-block;
  position: relative;
  width: 69px;
  height: 69px;
  margin: 0 8px 0 0;
`;
const UserImg = styled.img`
  position: absolute;
  top: 0px;
  width: 24px;
  height: 24px;
  border-radius: 30px;
`;
const EmojiWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  width: 64px;
  border-radius: 100px;
  border: 3px solid transparent;
  font-size: 2em;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(45deg, #ff787f, #fec786);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const EmojiText = styled.p`
  border-radius: 100px;
  margin: auto;
`;

const Contents = styled.div`
  margin: 16px 0px;
  display: flex;
  align-items: center;
`;
const Text = styled.div`
  margin: auto 4px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
`;

function Emojis({ scrum }) {
  const navigate = useNavigate();
  const moveToDetail = (props) => {
    navigate("/hello/detail", {
      state: {
        image: props.image,
        id: props.id,
        user_id: props.user_id,
        name: props.name,
        set_name: props.set_name,
        selectday: props.selectday
      },
    });
  };
  const date = new Date();
  const day =
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1).toString()).slice(-2) +
    "-" +
    ("00" + date.getDate().toString()).slice(-2);
  return (
    <Container>
      <BrowserView>
        <EContainer>
          {scrum.length === 0 ? (
            <Contents>
              <Text>🙂'안녕'에서 오늘의 나를 알려주세요! </Text>
            </Contents>
          ) : (
            <>
              {scrum.map((item, index) => (
                <EmojiBox
                  key={index}
                  onClick={() =>
                    moveToDetail({
                      image: item.image,
                      id: item.id,
                      user_id: item.user_id,
                      name: item.name,
                      set_name: item.set_name,
                      selectday: day,
                    })
                  }
                >
                  <EmojiWrapper>
                    <Emoji unified={item.emoji} />
                  </EmojiWrapper>
                  <UserImg src={item.image} alt="userimg"></UserImg>
                </EmojiBox>
              ))}
            </>
          )}
        </EContainer>
      </BrowserView>

      <MobileView>
        <MContainer>
          {scrum.length === 0 ? (
            <Contents>
              <Text>🙂'안녕'에서 오늘의 나를 알려주세요! </Text>
            </Contents>
          ) : (
            <>
              {scrum.map((item, index) => (
                <EmojiBox
                  key={index}
                  onClick={() =>
                    moveToDetail({
                      image: item.image,
                      id: item.id,
                      user_id: item.user_id,
                      name: item.name,
                      set_name: item.set_name,
                      selectday: day,
                    })
                  }
                >
                  <EmojiWrapper>
                    <Emoji unified={item.emoji} />
                  </EmojiWrapper>
                  <UserImg src={item.image} alt="userimg"></UserImg>
                </EmojiBox>
              ))}
            </>
          )}
        </MContainer>
      </MobileView>
    </Container>
  );
}

export default Emojis;
