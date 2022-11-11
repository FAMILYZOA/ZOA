import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Emoji } from "emoji-picker-react";

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

const ScrumFamItem = ({ id, emoji, name, yesterday, today, image, set_name }) => {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ProfileWrapper>
          <MemberProfile>
            <MemberProfileImg src={image} />
          </MemberProfile>
        </ProfileWrapper>
        {set_name ? 
        <div style={{ margin: "3%", fontWeight: "bold", fontSize: "0.8em" }}>
          {set_name} ({name})
        </div> :
        <div style={{ margin: "3%", fontWeight: "bold", fontSize: "0.8em" }}>
          {name}
        </div>
        }
        <div style={{ display: "flex", alignItems: "center" }}>
          <Emoji unified={emoji} size={20} />
        </div>
        <div
          style={{
            color: "#ff787f",
            cursor: "pointer",
            margin: "4px 0 0 40px",
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
          <div style={{ margin: "8px", fontSize: "0.8em" }}>🙋‍♂️ {yesterday}</div>
          <div style={{ margin: "8px", fontSize: "0.8em" }}>📢 {today}</div>
        </ItemWrapper>
      </div>
    </>
  );
};

export default ScrumFamItem;
