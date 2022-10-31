import React from "react";
import styled from "styled-components";
import { BrowserView, MobileView } from "react-device-detect";

const Container = styled.div`
  margin: 5%;
  border-bottom: 1px solid #d9d9d9;
`

const EContainer = styled.div`
  display: flex;
  margin: 16px 8px;
  width: 90%-32px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  @media screen and (min-width: 520px) {
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
  }
`;
const MContainer = styled.div`
  display: flex;
  margin: 16px 8px;
  width: 90%-32px;
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
`
const UserImg = styled.img`
    position: absolute;
    top:0px;
    width: 24px;
    height: 24px;
    border-radius: 30px;
`
const Emoji = styled.div`
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



function Emojis({scrum}){
    return (
      <Container>
        <BrowserView>
          <EContainer>
            {scrum.map((item, index) => (
              <EmojiBox key={index}>
                <Emoji>
                  <EmojiText>{item.emoji}</EmojiText>
                </Emoji>
                <UserImg src={item.image} alt="userimg"></UserImg>
              </EmojiBox>
            ))}
          </EContainer>
        </BrowserView>
        <MobileView>
          <MContainer>
            {scrum.map((item, index) => (
              <EmojiBox key={index}>
                <Emoji>
                  <EmojiText>{item.emoji}</EmojiText>
                </Emoji>
                <UserImg src={item.image} alt="userimg"></UserImg>
              </EmojiBox>
            ))}
          </MContainer>
        </MobileView>
      </Container>
    );
}

export default Emojis;