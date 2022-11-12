import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";


const CommentList = styled.div`
  height: calc(100vh - 530px);
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  -webkit-scrollbar {
    display: none;
  }
  margin-top: 16px;
`;
const CommentBox = styled.div`
  display: flex;
  margin-bottom: 8px;
`;
const ImgBox = styled.div`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50px;
  margin-right: 6px;
  img {
    width: 36px;
    height: 36px;
    border-radius: 50px;
    border: none;
    object-fit: fill;
  }
`;

const CommentContent = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: auto;
  min-height: 40px;
  border-radius: 10px;
  padding: 2% 2%;
  background-color: rgba(187, 241, 232, 0.25);
  font-size: 20px;
`;

const CommentInputBox = styled.div`
  display: flex;
  align-items: center;
`;
const CommentInputBack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  width: 85%;
  height: 44px;
  border: none;
  border-radius: 20px;
  padding: 0 2%;
  background-color: rgba(187, 241, 232, 0.25);
`;
const CommentInput = styled.input`
  width: 100%;
  height: 80%;
  background: none;
  border: none;
  font-size: 0.8em;
  outline: none;
  color: #444444;
`;

const CommnetBtn = styled.div`
  width: 12%;
  height: 40px;
  text-align: center;
  border: 1.5px solid #3db9a4;
  border-radius: 15px;
  background-color: none;
  color: #3db9a4;
  line-height: 40px;
  font-size: 0.7em;
  font-weight: bold;
`;

function Comment({ id, comments }) {
  const [content, setContent] = useState("");
  const [list, setList] = useState(comments);
  const onChange = (e) => {
    setContent(e.target.value);
  };

  const clickPost = () => {
    if (content.length !== 0) {
      const data = new FormData();
      data.append("content", content);
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACK_HOST}/scrums/comment/${id}/`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: data,
      }).then((res) => {
        setList(list.concat(res.data));
        setContent("");
      });
    }
  };

  useEffect(() => {
    setList(comments);
  }, [comments]);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      clickPost();
    }
  };

  return (
    <>
      <CommentInputBox>
        <CommentInputBack>
          <CommentInput
            type="text"
            maxLength={50}
            onChange={onChange}
            value={content}
            onKeyDown={onEnter}
            placeholder="반응을 남겨보세요."
          ></CommentInput>
        </CommentInputBack>
        <CommnetBtn onClick={clickPost}>등록</CommnetBtn>
      </CommentInputBox>
      <CommentList>
        {list ? (
          list
            .slice(0)
            .reverse()
            .map((item, index) => (
              <CommentBox key={index}>
                <ImgBox>
                  <img src={item.image} alt="" />
                </ImgBox>
                <CommentContent>{item.content}</CommentContent>
              </CommentBox>
            ))
        ) : (
          <></>
        )}
      </CommentList>
    </>
  );
}

export default Comment;
