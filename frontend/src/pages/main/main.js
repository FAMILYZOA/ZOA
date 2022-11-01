import React, { useEffect, useState } from "react";
import Header from "../../components/main/Header";
import Emojis from "../../components/main/Emoji";
import Announcement from "../../components/main/Announcement";
import CheckList from "../../components/main/checklist/CheckList";
import { useAppSelector } from "../../app/hooks";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { selectUserId } from "../../features/user/userSlice";


function Main() {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.token.access);
  const family = useAppSelector((state) => state.family.id);
  const [scrum, setScrum] = useState([]);

  useEffect (()=> {
    if (token.length === 0) {
      navigate("/intro");
    }
  })

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://k7b103.p.ssafy.io/api/v1/scrums/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setScrum(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [family]);


  return <div>
    <Header></Header>
    <Emojis scrum = {scrum}></Emojis>
    <Announcement scrum = {scrum}></Announcement>
    <CheckList/>
  </div>;
}

export default Main;