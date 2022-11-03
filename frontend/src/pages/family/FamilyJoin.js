import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import Header from "../../components/header";

const Container = styled.div`
    margin: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Info = styled.div`
    margin: auto;
    font-size: 20px;
`
const ImgBox = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`
const Image = styled.img`
    width: 54px;
    height: 54px;
    border: none;
    border-radius: 100px;
`
const BtnBox = styled.div`
`
const Btn = styled.div`
  margin: 16px auto;
  width: 168px;
  height: 72px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(45deg, #fec786, #ff787f);
  color: white;
  font-size: 20px;
  opacity: ${props => props.active === true ? 1 : 0.5};
`;


function FamilyJoin() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams ]= useSearchParams();
    const familyId = searchParams.get('familyId');
    console.log(familyId);
    const access = useAppSelector((state) => state.token.access);
    const [sign, setSign] = useState(false);
    const [family, setFamily] = useState();

    const clickYes = () => {
        axios({
          method: "POST",
          url: `https://k7b103.p.ssafy.io/api/v1/family/sign/${familyId}/`,
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
    }

    

    useEffect(()=> {
        if (access.length === 0) {
          localStorage.setItem("family_id", familyId);
          navigate("/intro");
        } else {
            axios({
              method: "GET",
              url: `https://k7b103.p.ssafy.io/api/v1/family/${familyId}/`,
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }).then((res) => {
                console.log(res);
                setFamily(res.data)
            })
          setSign(true);
        }
    }, [])


    return(
        <div>
            <Header label="가족 가입" back={false}></Header>
            <Container>
                <div>
                    <Info><span>{family.name}</span> 에 <br />가입하시겠습니까?</Info>
                    <ImgBox>
                        {family.users.map((item, index) => (
                            <Image key={index} src={item.image}></Image>
                        ))}
                    </ImgBox>
                    <BtnBox>
                        <Btn active={true}>네</Btn>
                        <Btn active={false}>아니오</Btn>
                    </BtnBox>
                </div>
            </Container>

        </div>

    )
}

export default FamilyJoin;