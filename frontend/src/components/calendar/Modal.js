import styled from "styled-components";

const Modal = (props) => {
    const {setModalOpen, schedule, date} = props;
    console.log(date);
    // 모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    };
    console.log("일정", schedule);

    return (
        <>
            <ModalWrapper>
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
    left: 50%;
    background-color: white;
    border-radius: 16px;
`

const CloseButton = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
`

export default Modal;