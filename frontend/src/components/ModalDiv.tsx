import styled from 'styled-components'

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

export default ModalDiv;