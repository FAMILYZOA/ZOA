import React, { useRef, useState } from "react";
import styled from "styled-components";
import plus from "../../../assets/plus.png"
import {BsTrashFill} from "react-icons/bs"

const Container = styled.div`
    margin: 5%;
`
const MainText = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: start;
  margin-bottom: 16px;
`;

const Photo = styled.div`
    margin: 4px auto 8px;
    /* width: 33%; */
    height: 20vh;
    img{
        height: 20vh;
    }
`
const DelBtn = styled.div`
    margin: 0 8px;
`


function AddPhoto(){
    //미리보기용
    const [file, setFile] = useState(plus);
    const saveFile = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const deleteFile = () => {
        URL.revokeObjectURL(file);
        setFile(plus);
    }
    const photoInput = useRef();
    const handleClick = () => {
        photoInput.current.click();
    }
    return (
      <Container>
        <div style={{display: "flex", justifyContent:'space-between', width:'100%', alignItems:'center'}}>
            <MainText>사진등록</MainText>
            {file !== plus ? <DelBtn onClick={deleteFile}>
                <BsTrashFill size={24} style={{ color: "#707070", margin:'0' }} />
            </DelBtn>
            : <div/>
            }
            
        </div>
        <Photo>
          <img src={file} alt="" onClick={handleClick} />
          <input
            type="file"
            name="imgUpload"
            accept="image/*"
            onChange={saveFile}
            style={{ display: "none" }}
            ref={photoInput}
          />
        </Photo>
      </Container>
    );
}

export default AddPhoto;