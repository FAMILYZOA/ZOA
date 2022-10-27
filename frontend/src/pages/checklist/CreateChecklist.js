import React from "react";
import styled from "styled-components";
import Header from "../../components/header";
import Receiver from "../../components/checklist/create/Receiver";



function CreateChecklist(){
    return(
        <div>
            <Header label="할 일 등록" back="true"></Header>
            <Receiver></Receiver>
            
            
        </div>
    )
}
export default CreateChecklist;