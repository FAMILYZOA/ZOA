import React, {useState} from "react";
import styled from "styled-components";

const Modal = (props) => {
    const {setModalOpen, schedule, date} = props;
    const [curDate, setCurDate] = useState(new Date());
    const year = curDate.getFullYear();
    const month = curDate.getMonth() + 1;

    // 모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <ModalWrapper>
                {year}.{month}.{date}
                <CloseButton onClick={closeModal}>x</CloseButton>
            </ModalWrapper>
        </>
    )
};

const ModalWrapper = styled.div`
    width: 300px;
    height: 200px;
    z-iindex: 999;
    position: absolute;
    top: 50%;
    left: 25%;
    background-color: white;
    border-radius: 16px;
`

const CloseButton = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
`

export default Modal;