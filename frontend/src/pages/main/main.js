import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/main/Header";
import Emojis from "../../components/main/Emoji";
import Announcement from "../../components/main/Announcement";
import { useAppSelector } from "../../app/hooks";
import axios from "axios";



function Main() {
  const token = useAppSelector((state) => state.token.access);
  const family = useAppSelector((state) => state.family.id);
  const [scrum, setScrum] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://k7b103.p.ssafy.io/api/v1/scrums/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setScrum(res.data);
    });
  }, [family]);

  return <div>
    <Header></Header>
    <Emojis scrum = {scrum}></Emojis>
    <Announcement scrum = {scrum}></Announcement>
  </div>;
}

export default Main;
