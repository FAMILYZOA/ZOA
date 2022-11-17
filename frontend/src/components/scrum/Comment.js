import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { customAxios, AuthRefresh } from "../../api/customAxios";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "../../features/token/tokenSlice";
import { confirmAlert } from "react-confirm-alert";
import "./react-confirm-alert.css";


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

const Blank = styled.div`
  opacity: 0;
  height: 56px;
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
  const myId = useAppSelector((state)=>state.user.id);
  const token = useAppSelector((state)=> state.token.access);
  const [content, setContent] = useState("");
  const [list, setList] = useState(comments);
  const userName = useAppSelector((state) => state.user.name);
  const access_token = useAppSelector((state) => state.token.access);
  const refresh_token = useAppSelector((state) => state.token.refresh);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
          Authorization: `Bearer ${token}`,
        },
        data: data,
      }).then((res) => {
        setList(list.concat(res.data));
        setContent("");
        const messageData = new FormData();
        const config = {
          headers: { Authorization: `Bearer ${access_token}` },
        };
        console.log(res);
        // [안녕] ___ 님이 '안녕'을 작성하셨습니다. 지금 들어가서 확인해보세요!
        const messageBody = `[댓글] ${userName}님이 댓글을 작성하셨습니다. 지금 들어가서 확인해보세요`;
        messageData.append("writer",res.data.writer);
        messageData.append("body", messageBody);
        console.log(res);
        customAxios
          .post("/event/FCM/send/", messageData, config)
          .then((res) => {
            console.log(res);
          })
          .catch(async (err) => {
            switch (err.response.status) {
              case 401:
                const code = err.response.data.code;
                if (code === "token_not_valid") {
                  const tokens = await AuthRefresh(refresh_token);
                  if (tokens) {
                    dispatch(setAccessToken(tokens.access));
                    dispatch(setRefreshToken(tokens.refresh));
                  } else {
                    dispatch(setAccessToken(""));
                    dispatch(setRefreshToken(""));
  
                    navigate("/login", { replace: true });
                  }
                }
                break;
              default:
                break;
            }
          });
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

  const clickDelete = ({commentId, userId}) => {
    if(userId === myId){
      confirmAlert({
        title: '정말로 댓글을 삭제하시겠습니까?',
        buttons : [
            {label: '네',
            onClick: () => {
              deleteComment(commentId)
            }},
            {
              label: '아니오',
            }
        ]
      })
    } else {
      alert('본인이 작성한 댓글만 수정, 삭제가 가능합니다.')
    }
  }

  const deleteComment = (commentId) => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_BACK_HOST}/scrums/${commentId}/comment/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res)=> {
      if (res.status === 204) {
        const newList = list.filter((item)=> item.id !== commentId);
        setList(newList);
        alert('댓글이 성공적으로 삭제되었습니다.')
      }
    })
  }

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
                <CommentBox key={index} onClick={() => clickDelete({commentId: item.id, userId: item.user_id})}>
                  <ImgBox>
                    <img src={item.image} alt="" />
                  </ImgBox>
                  <CommentContent>{item.content}</CommentContent>
                </CommentBox>
            ))
        ) : (
          <></>
        )}
        <Blank></Blank>
      </CommentList>
    </>
  );
}

export default Comment;
