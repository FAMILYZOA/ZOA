import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/header";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import PageOne from "../../components/resister/PageOne";
import PageTwo from "../../components/resister/PageTwo";

const Container = styled.div`
  margin: 10% 5%;
`;



function Resister() {
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        phone : "",
        password: "",
        name: "",
        birth :"",
    })
    const [next, setNext] = useState(false)
    const oneInfo = (data) => {
        setInfo((pre) => {return {...pre, phone:data.phone, name:data.name}})
    }
    const twoInfo = (data) => {
        setInfo((pre) => {return {...pre, password:data.password, birth:data.birth}})
    }
    useEffect(()=> {
        if (info.phone.length === 11 && info.name.length > 0) {
            setNext(true);
            if (info.birth.length === 10) {
                console.log('here?')
                const data = new FormData();
                data.append("phone", info.phone);
                data.append("password", info.password);
                data.append("name", info.name);
                data.append("birth", info.birth);
                axios({
                  method: "POST",
                  url: `https://k7b103.p.ssafy.io/api/v1/accounts/signup/`,
                  data: data,
                })
                .then((res) => {
                    if(res.status === 201) {
                        navigate('/login');
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        } 
    }, [info])
    return (
      <div>
        <Header label="회원가입" back="true"></Header>
        <Container>
          {next === false ? (
            <PageOne oneInfo={oneInfo}></PageOne>
          ) : (
            <PageTwo twoInfo={twoInfo}></PageTwo>
          )}
        </Container>
      </div>
    );
}

export default Resister;