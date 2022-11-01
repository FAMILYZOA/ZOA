import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/main/Header";
import Emojis from "../../components/main/Emoji";
import Announcement from "../../components/main/Announcement";
<<<<<<< HEAD
import CheckList from "../../components/main/checklist/CheckList";
=======
import { useAppSelector } from "../../app/hooks";
import axios from "axios";

>>>>>>> 40c7c29ea7e9e1eb73d70a7b607f95b02f1a5295


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
<<<<<<< HEAD
    <Emojis></Emojis>
    <Announcement></Announcement>
    <CheckList/>
  </MainBox>;
=======
    <Emojis scrum = {scrum}></Emojis>
    <Announcement scrum = {scrum}></Announcement>
  </div>;
>>>>>>> 40c7c29ea7e9e1eb73d70a7b607f95b02f1a5295
}

export default Main;
