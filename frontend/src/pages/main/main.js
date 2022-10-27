import React from "react";
import styled from "styled-components";
import Header from "../../components/main/Header";
import Emojis from "../../components/main/Emoji";
import Announcement from "../../components/main/Announcement";

const MainBox = styled.div`
    @media screen and (min-width: 720px) {
        width: 70vh;
        margin: auto;
    }
`

function Main() {
  return <MainBox>
    <Header></Header>
    <Emojis></Emojis>
    <Announcement></Announcement>
  </MainBox>;
}

export default Main;
