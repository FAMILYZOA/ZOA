import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/header";
import Receiver from "../../components/checklist/create/Receiver";
import TodoInput from "../../components/checklist/create/TodoInput";
import AddPhoto from "../../components/checklist/create/AddPhoto";
import Button from "../../components/Button";



function CreateChecklist(){
    
    const [info, setInfo] = useState({
        to_users_id: [],
        text: "",
        photo: "",
    })

    const receivers = (data) => {
        setInfo((pre)=> {return {...pre, to_users_id:data.receiver}});
    }
    const todo = (data) => {
        setInfo((pre) => {
          return { ...pre, text: data.todo };
        });
    }
    const getPhoto = (data) => {
        setInfo((pre) => {
          return { ...pre, photo: data.photo };
        });
    }
    
    
    const event = () => {
        console.log('등록');
    }
    

    return(
        <div>
            <Header label="할 일 등록" back="true"></Header>
            <Receiver receivers = {receivers}></Receiver>
            <TodoInput todo= {todo}></TodoInput>
            <AddPhoto getPhoto={getPhoto}></AddPhoto> 
            <Button label='등록하기' click={event} active={true} ></Button>
            
        </div>
    )
}
export default CreateChecklist;