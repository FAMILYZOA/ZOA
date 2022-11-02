import styled from "styled-components";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ItemWrapper = styled.div`
  background-color: #eefbef;
`

const ProfileWrapper = styled.div`
  color: red;
`

const MemberProfile = styled.div`
  height: 7vh;
  width: 7vh;
  border-radius: 3.5vh;
  margin-right: 1.5vh;
`;
const MemberProfileImg = styled.img`
  height: 7vh;
  width: 7vh;
  border-radius: 3.5vh;
  object-fit: fill;
`;

const ScrumFamItem = ({id, emoji, name, yesterday, today, image}) => {

    const navigate = useNavigate();

    return(
        <> 
            {/* 프사, 이름, 이모티콘 자리 */}
            <div style={{display: "flex"}}>
                <ProfileWrapper>
                    <MemberProfile>
                        <MemberProfileImg src={image}/>
                    </MemberProfile>
                </ProfileWrapper>
                <div style={{margin: "3vh", fontWeight: "bold"}}>
                    {name}
                </div>
                <div style={{margin: "3vh 0 0 0"}}>
                    {emoji}
                </div>
                <div style={{color: "#ff787f", cursor: "pointer", margin: "3vh 0 0 40vw"}}>
                    {/* scrum/detail 생기면 navigate 주소 바꿔줄것 */}
                    <BsChevronRight
                    onClick={() => {
                        navigate(`/`)
                        }}
                    />
                </div>
            </div>
            <div style={{margin: "0vw 10vw 2vw 8vw"}}>
            <ItemWrapper>
                <div style={{margin: "1vh"}}>
                🙋‍♂️ {yesterday}
                </div>
                <div style={{margin: "1vh"}}>
                📢 {today}
                </div>
            </ItemWrapper>
            </div>
        </>
    )
};

export default ScrumFamItem;