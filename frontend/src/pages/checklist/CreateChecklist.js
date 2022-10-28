import React from "react";
import Header from "../../components/header";
import Receiver from "../../components/checklist/create/Receiver";
import TodoInput from "../../components/checklist/create/TodoInput";
import AddPhoto from "../../components/checklist/create/AddPhoto";
import Button from "../../components/Button";



function CreateChecklist(){
    const event = () => {
        console.log('등록');
    }


    return(
        <div>
            <Header label="할 일 등록" back="true"></Header>
            <Receiver></Receiver>
            <TodoInput></TodoInput>
            <AddPhoto></AddPhoto> 
            <Button label='등록하기' click={event} active={true} ></Button>
            
        </div>
    )
}
export default CreateChecklist;