import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { FaRegSmile, FaRegUser } from 'react-icons/fa';

const Container = styled.div`
  height: 64px;
  width: 100vw;
  @media screen and (min-width: 720px) {
    width: 70vh;
  }
  position: fixed;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px 20px 0 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: ${(props) => (props.active === true ? "none" : "grid") };
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
`;

const SelectBox = styled.div`
  width: 60%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border: none;
  border-radius: 30px;
  background: linear-gradient(45deg, #ff787f, #fec786);
  color: white;
`;

const UnSelectBox = styled.div`
  width: 60%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border: none;
  border-radius: 30px;
  background: none;
  color: white;
`;

function Navbar() {
    const location = useLocation();
    const [active, setActive] = useState(false);
    useEffect(()=> {
       if (
         location.pathname === "/intro" ||
         location.pathname === "/kakaoSignup" ||
         location.pathname === "/register" ||
         location.pathname === "/kakaoLoading" ||
         location.pathname === "/family/manage" ||
         location.pathname === "/family/create" ||
         location.pathname === "/family/edit" ||
         location.pathname === "/login" ||
         location.pathname === "/register"
       ) {
         setActive(true);
       } else{
        setActive(false);
       }
    }, [location])


    return (
        <div>

        <Container active={active}>
            <Link to="/">
            {location.pathname === "/" ? (
                <SelectBox>
                <AiOutlineHome size={28} color={"white"} />
                </SelectBox>
            ) : (
                <UnSelectBox>
                <AiOutlineHome size={28} color={"#BEBEBE"} />
                </UnSelectBox>
            )}
            </Link>
            <Link to="/hello">
            {location.pathname.includes("/zoa" )? (
                <SelectBox>
                <FaRegSmile size={28} color={"white"} />
                </SelectBox>
            ) : (
                <UnSelectBox>
                <FaRegSmile size={28} color={"#BEBEBE"} />
                </UnSelectBox>
            )}
            </Link>
            <Link to="/settings">
            {location.pathname.includes ("/settings") ? (
                <SelectBox>
                <FaRegUser size={28} color={"white"} />
                </SelectBox>
            ) : (
                <UnSelectBox>
                <FaRegUser size={28} color={"#BEBEBE"} />
                </UnSelectBox>
            )}
            </Link>
        </Container>
        </div>
    );
}

export default Navbar;