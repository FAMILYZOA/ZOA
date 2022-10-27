import React, { useState } from "react";
import styled from "styled-components";
import user from "../../assets/test/jjanga.png"

const EContainer = styled.div`
  margin: 16px;
  height: 80px;
  width: 100vw-32;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  border-bottom: 1px solid #d9d9d9;
`;
const EmojiBox = styled.div`
    display: inline-block;
    position: static;
    width: 69px;
    height: 69px;
    margin: 0 8px 0 0;
`
const UserImg = styled.img`
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 30px;
`
const Emoji = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  width: 64px;
  border-radius: 100px;
  border: 3px solid transparent;
  font-size: 40px;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(45deg, #ff787f, #fec786);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const EmojiText = styled.p`
    border-radius: 100px;
    margin: auto;
`

function Emojis(){
    
    return (
      <EContainer>
        {/* 데이터 받아오면 EmojiBox를 .map해서 반복문처리 */}
        <EmojiBox>
          <Emoji>
            <EmojiText>😀</EmojiText>
          </Emoji>
          <UserImg src={user} alt="userimg"></UserImg>
        </EmojiBox>
        <EmojiBox>
          <Emoji>
            <EmojiText>😀</EmojiText>
          </Emoji>
          <UserImg src={user} alt="userimg"></UserImg>
        </EmojiBox>
        <EmojiBox>
          <Emoji>
            <EmojiText>😀</EmojiText>
          </Emoji>
          <UserImg src={user} alt="userimg"></UserImg>
        </EmojiBox>
        <EmojiBox>
          <Emoji>
            <EmojiText>😀</EmojiText>
          </Emoji>
          <UserImg src={user} alt="userimg"></UserImg>
        </EmojiBox>
        
      </EContainer>
    );
}

export default Emojis;