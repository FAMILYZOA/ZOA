import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { VoiceMessage } from "../../components/voice";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

interface highLightProps {
  isLeft?: boolean;
}

interface modalBackProps {
  toggle?: boolean;
}

interface deleteProps {
  isDelete?: boolean;
}

const DeleteButton = styled.div<deleteProps>`
  position: fixed;
  bottom: 80px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 48px;
  border-radius: 24px;
  transition: border 0.3s, background-color 0.3s, color 0.3s, width 0.3s;
  ${({ isDelete }) => {
    if (isDelete) {
      return css`
        border: 2px solid #6fdecb;
        background-color: #fff;
        color: #6fdecb;
        width: 200px;
      `;
    } else {
      return css`
        background-color: #6fdecb;
        color: #fff;
        width: 48px;
      `;
    }
  }}
`

const ModalBack = styled.div<modalBackProps>`
  position: absolute;
  width: 100%;
  height: calc(100vh - 56px);
  z-index: 2;
  background-color: rgba(102, 102, 102, 0.5);
  animation: fadein 0.5s;
  -moz-animation: fadein 0.5s;
  -webkit-animation: fadein 0.5s;
  -o-animation: fadein 0.5s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalDiv = styled.div`
  position: absolute;
  padding: 20px;
  width: 70%;
  height: 22vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  border-radius: 12px;
  background-color: #fff;
  animation: fadein 0.5s;
  -moz-animation: fadein 0.5s;
  -webkit-animation: fadein 0.5s;
  -o-animation: fadein 0.5s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Modal24 = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
`;

const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ConfirmButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 35%;
  height: 2em;

  color: #fff;
  background-color: #ff787f;
  border-radius: 0.4em;
  margin-right: 0.4em;
`;

const CancelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 35%;
  height: 2.2em;

  box-sizing: border-box;

  color: #aaa;
  border: 2px solid #aaa;
  border-radius: 0.4em;
`;

const SelectViewDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 2.4em;
  background-color: #fff;
`;
const SelectViewItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  font-size: 0.9em;
`;
const SelectHighlight = styled.div<highLightProps>`
  width: 50%;
  height: 3px;
  position: absolute;
  background-color: #fe9b7c;
  bottom: 0;
  ${({ isLeft }) => {
    if (isLeft) {
      return css`
        left: 0;
      `;
    } else {
      return css`
        left: 50%;
      `;
    }
  }}
  transition: left 0.2s;
`;
const VoiceMessageDiv = styled.div`
  margin: 0.8em;
  height: calc(100vh - 180px);
  overflow-y: scroll;
`;
const HeaderBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  position: sticky;
  top: 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  z-index: 1;
`;
const IconBox = styled.div`
  margin: auto;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HeaderLabel = styled.div`
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  line-height: 56px;
`;

const Header = () => {
  const navigate = useNavigate();
  const moveToCreate = () => {
    navigate("/voice/record");
  };
  return (
    <HeaderBox>
      <IconBox onClick={moveToCreate}>
        <FiPlus size={"24"} />
      </IconBox>
      <HeaderLabel>{"음성메시지"}</HeaderLabel>
    </HeaderBox>
  );
};

const VoiceView = () => {
  const [unViewedMessage, setUnViewedMessage] = useState<
    {
      id: number;
      image: string;
      set_name: string;
      audio: string;
      created_at: string;
      name: string;
      second: number;
      status: boolean;
    }[]
  >([]);
  const [keptMessage, setKeptMessage] = useState<
    {
      id: number;
      image: string;
      set_name: string;
      audio: string;
      created_at: string;
      name: string;
      second: number;
      status: boolean;
    }[]
  >([]);
  const [isLeft, setIsLeft] = useState<boolean>(true);
  const [unViewLength, setUnViewLength] = useState<number>(0);
  const [keptLength, setKeptLength] = useState<number>(0);
  const accessToken = useAppSelector((state) => state.token.access);
  const [playingId, setPlayingId] = useState<number>(-1);
  const [deleteId, setDeleteId] = useState<number>(-1);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [deleteList, setDeleteList] = useState<number[]>([]);

  const getVoice = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACK_HOST}/audio/?type=0`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        setUnViewedMessage(res.data);
        setUnViewLength(res.data.length);
      })
      .catch((err) => {
        console.error(err);
      });
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACK_HOST}/audio/?type=1`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        setKeptMessage(res.data);
        setKeptLength(res.data.length);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getVoice();
  }, [isLeft]);

  const getIndex = (index: number, type: boolean) => {
    getVoice();
  };

  const addDeleteList = (id: number) => {
    const tempDeleteList = [...deleteList];
    tempDeleteList.push(id);
    setDeleteList(tempDeleteList);
  }

  const filterDeleteList = (id: number) => {
    const tempDeleteList = [...deleteList];
    let filteredTempList = tempDeleteList.filter((element) => element !== id)
    setDeleteList(filteredTempList);
  }

  const confirmDelete = () => {
    if (deleteList.length > 0) {
      console.log(deleteList)
      axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_BACK_HOST}/audio/delete/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          id: deleteList,
        }
      })
        .then(() => {
          setIsConfirmed(true);
          setTimeout(() => {
            getVoice();
            setIsModal(false);
            setIsConfirmed(false);
          }, 2000);
        })
    }
  }

  return (
    <>
      <Header />
      {isModal && <ModalBack onClick={() => setIsModal(false)} />}
      {isModal && (
        <ModalDiv>
          <ModalContent>
            <Modal24> {isConfirmed ? "삭제되었습니다." :"정말 삭제하시겠습니까?"} </Modal24>
            {!isConfirmed && (<ButtonDiv>
              <ConfirmButton onClick={confirmDelete}>확인</ConfirmButton>
              <CancelButton onClick={() => {
                setIsModal(false);
              }}>취소</CancelButton>
            </ButtonDiv>)}
          </ModalContent>
        </ModalDiv>
      )}
      <SelectViewDiv>
        <SelectViewItem
          onClick={() => {
            setIsLeft(true);
            getVoice();
          }}
        >{`받은 메시지(${unViewLength})`}</SelectViewItem>
        <SelectViewItem
          onClick={() => {
            setIsLeft(false);
            getVoice();
          }}
        >{`보관함 메시지(${keptLength})`}</SelectViewItem>
        <SelectHighlight isLeft={isLeft} />
      </SelectViewDiv>
      <VoiceMessageDiv>
        {isLeft ? (
          <>
            {unViewedMessage.map((message, index) => (
              <VoiceMessage
                id={message.id}
                image={message.image}
                set_name={message.set_name}
                audio={message.audio}
                created_at={message.created_at}
                key={message.id}
                name={message.name}
                type={message.status}
                index={index}
                getIndex={getIndex}
                second={message.second}
                playingId={playingId}
                setPlayingId={setPlayingId}
                isDelete={isDelete}
                addDeleteList={addDeleteList}
                filterDeleteList={filterDeleteList}
                deleteList={deleteList}
              />
            ))}
          </>
        ) : (
          <>
            {keptMessage.map((message, index) => (
              <VoiceMessage
                id={message.id}
                image={message.image}
                set_name={message.set_name}
                audio={message.audio}
                created_at={message.created_at}
                key={message.id}
                name={message.name}
                type={message.status}
                index={index}
                getIndex={getIndex}
                second={message.second}
                playingId={playingId}
                setPlayingId={setPlayingId}
                isDelete={isDelete}
                addDeleteList={addDeleteList}
                filterDeleteList={filterDeleteList}
                deleteList={deleteList}
              />
            ))}
          </>
        )}
      </VoiceMessageDiv>
      <DeleteButton 
        isDelete={isDelete}
        onClick={() => {
        if (deleteList.length > 0 && isDelete){
          setIsModal(true);
        }
        setIsDelete(!isDelete);
      }}>
        <RiDeleteBinLine size={24}/>
        {isDelete && <div style={{marginLeft: "8px"}}>
            {`삭제하기 (${deleteList.length})`}
          </div>}
      </DeleteButton>
    </>
  );
};

export default VoiceView;
