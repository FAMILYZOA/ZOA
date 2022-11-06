import styled from "styled-components";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Emoji, EmojiStyle } from "emoji-picker-react";

const ItemWrapper = styled.div`
  background-color: #eefbef;
  padding: 4px 0;
`;

const ProfileWrapper = styled.div`
  color: red;
`;

const MemberProfile = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 3.5vh;
  margin-right: 8px;
`;
const MemberProfileImg = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 3.5vh;
  object-fit: fill;
`;

const ScrumFamItem = ({ id, emoji, name, yesterday, today, image }) => {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ProfileWrapper>
          <MemberProfile>
            <MemberProfileImg src={image} />
          </MemberProfile>
        </ProfileWrapper>
        <div style={{ margin: "3%", fontWeight: "bold", fontSize: "16px" }}>
          {name}
        </div>
        <div style={{ margin: "2% 0 0 0" }}>
          <Emoji unified={emoji} size={20} />
        </div>
        <div
          style={{
            color: "#ff787f",
            cursor: "pointer",
            margin: "3vh 0 0 40vw",
          }}
        >
          {/* <BsChevronRight
            onClick={() => {
              navigate(`/hello/${id}`);
            }}
          /> */}
        </div>
      </div>
      <div style={{ margin: "4px 0 4px 40px" }}>
        <ItemWrapper>
          <div style={{ margin: "8px", fontSize: "16px" }}>🙋‍♂️ {yesterday}</div>
          <div style={{ margin: "8px", fontSize: "16px" }}>📢 {today}</div>
        </ItemWrapper>
      </div>
    </>
  );
};

export default ScrumFamItem;
