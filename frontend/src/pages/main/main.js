import React, { useEffect, useState } from "react";
import Header from "../../components/main/Header";
import Emojis from "../../components/main/Emoji";
import Announcement from "../../components/main/Announcement";
import CheckList from "../../components/main/checklist/CheckList";
import { useAppSelector } from "../../app/hooks";
import axios from "axios";


function Main() {
  const token = useAppSelector((state) => state.token.access);
  const userId = useAppSelector((state) => state.user.id)
  const family = useAppSelector((state) => state.family.id);
  const [scrum, setScrum] = useState([]);
  const [checklist, setCL] = useState([]);

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

  useEffect(()=> {
    axios({
      method: "GET",
      url: `https://k7b103.p.ssafy.io/api/v1/checklist/${userId}/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res)=> {
      setCL(res.data);
    }).catch((err)=> console.log(err))
  },[userId])

  return <div>
    <Header></Header>
    <Emojis scrum = {scrum}></Emojis>
    <Announcement scrum = {scrum}></Announcement>
    <CheckList list = {checklist}/>
  </div>;
}

export default Main;
