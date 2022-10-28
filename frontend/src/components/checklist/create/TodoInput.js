import React, { useState } from "react";
import styled from "styled-components";


const Container = styled.div`
  margin: 5%;
`;

const MainText = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: start;
  margin-bottom: 16px;
`;

const InputBox = styled.div`
    height: 120px;
    border: none;
    border-radius: 10px;
    background-color: rgba(254,199,134,0.25);
`
const InputTag = styled.textarea`
    border: none;
    outline: none;
    background: none;
    margin: 10px 3%;
    width: 94%;
    height: 100px;
    font-size: 14px;
    resize:none;
`


function TodoInput(){
    const [todo, setTodo] = useState('');
    const onChange = (e) => {
        setTodo(e.target.value);
    };
    return (
      <Container>
        <MainText>
          할 일이 무엇인가요? <span style={{color:'red'}}>*</span>
        </MainText>
        <InputBox>
            <InputTag type="textarea" onChange={onChange} value={todo} placeholder="할 일을 입력해주세요."/>
        </InputBox>

      </Container>
    );
}

export default TodoInput;