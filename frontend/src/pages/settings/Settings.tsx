import styled from "styled-components";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import FontModal from "../../components/setting/FontModal";
import LogoutModal from "../../components/setting/LogoutModal";
import ImageModal from "../../components/setting/ImageModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setUserName,
} from "../../features/user/userSlice";
import { setPush } from "../../features/setting/settingSlice"
import axios from "axios";

const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";

const SettingsHeader = styled.div`
  display: flex;
  height: 8vh;
  width: 100vw;
  font-size: 3vh;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
`;
const SettingsBody = styled.div`
  position: relative;
`;

const ProfileImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2.5vh 0 5vh;
`;
const ProfileImgCover = styled.div`
  position: relative;
`;

const ProfileEditIcon = styled.div`
  position: absolute;
  font-size: 3vh;
  border-radius: 2.25vh;
  text-align: center;
  line-height: 5vh;
  bottom: 1vh;
  right: 1vh;
  height: 4.5vh;
  width: 4.5vh;
  background: linear-gradient(120.28deg, #ff787f 15.03%, #fec786 87.76%);
  color: #fff;
`;
const ProfileImg = styled.img`
  width: 20vh;
  height: 20vh;
  border-radius: 10vh;
`;
const NameEmailDiv = styled.div`
  height: 2.5vh; // 나중에 폰트 사이즈 변수화 하여 연동 할 것
  position: relative;
  padding-bottom: 2vh;
  border-bottom: 1px solid #ff787f;
`;
const UserName = styled.div`
  position: absolute;
  top: 0;
  left: 3vh;
  display: flex;
`;
const UserNameEdit = styled.div`
  margin-left: 1vh;
  color: #ff787f;
`;

const UserEmail = styled.div`
  position: absolute;
  top: 0;
  right: 2.5vh;
`;
const SettingMenu = styled.div`
  margin: 2vh 3vh;
`;
const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f9d7d3;
  height: 8vh;
`;

const SettingItemTitle = styled.div``;
const SettingItemContent = styled.div`
  color: #ff787f;
`;
const SettingCopyright = styled.div`
  position: absolute;
  bottom: 9.25vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SettingLogoutIcon = styled.div`
  height: 4.5vh;
  width: 4.5vh;
  font-size: 4.5vh;
`;
const NameEditInput = styled.input`
  border-left-width: 0;
  　border-right-width: 0;
  　border-top-width: 0;
  　border-bottom: 1;
  width: 30vw;
  height: 2.5vh;
  background-color: transparent;
  border-color: #ffd5d7;
  outline: 0;
  font-size: 2.5vh;
  font-family: "Pretendard-Regular";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
const theme = createTheme({
  palette: {
    neutral: {
      main: '#FF787F',
      contrastText: '#fad7d4',
    },
  },
});
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Switch' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}



const Settings = () => {
  const [profile, setProfile] = useState<{
    phone: string;
    name: string;
    image: string;
  }>({
    phone: "",
    name: "신짱구",
    image:
      "https://user-images.githubusercontent.com/97648026/197681290-d733b42c-bc46-4af7-b149-96dd02150234.png",
  }); // 유저 프로필 정보
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);
  const [version, setVersion] = useState<string>("1.0.0");
  const fontSize = useAppSelector((state) => state.setting.fontSize);
  const [isImageModal, toggleImageModal] = useState<boolean>(false);
  const [isFontModal, toggleFontModal] = useState<boolean>(false);
  const [isLogoutModal, toggleLogoutModal] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>("");
  const fontLetter = ["작게", "보통", "크게"];

  const accessToken = useAppSelector((state) => state.token.access);
  const userName = useAppSelector((state) => state.user.name);
  const userImage = useAppSelector((state) => state.user.image);
  const userKakao = useAppSelector((state) => state.user.kakaoId);
  const isPush = useAppSelector((state) => state.setting.push);

  const dispatch = useAppDispatch();

  const handleNameEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPush(e.target.checked));
  };
  const onEditName = () => {
    setToggleEdit(true);
  };
  const offEditName = () => {
    if (editName !== "") {
      const data = new FormData();
      data.append("name", editName);
      axios({
        method: "PUT",
        url: `${process.env.REACT_APP_BACK_HOST}/accounts/profile/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      })
        .then((res) => {
          console.log("Profile Name submitted");
          dispatch(setUserName(res.data.name));
          setToggleEdit(false);
        })
        .catch((err) => {
          console.error(err);
          setToggleEdit(false);
        });
    }
  };

  return (
    <>
      <SettingsHeader>
        <div>설정</div>
      </SettingsHeader>
      <SettingsBody>
        <ProfileImgDiv>
          <ProfileImgCover>
            <div>
              <ProfileImg src={userImage} />
            </div>
            <ProfileEditIcon onClick={() => toggleImageModal(true)}>
              <AiFillCamera />
            </ProfileEditIcon>
          </ProfileImgCover>
        </ProfileImgDiv>
        <NameEmailDiv>
          <UserName>
            {!toggleEdit ? (
              <>
                <div>{userName}</div>
                <UserNameEdit onClick={onEditName}>
                  <FiEdit />
                </UserNameEdit>
              </>
            ) : (
              <>
                <div>
                  <NameEditInput
                    placeholder={userName}
                    onChange={handleNameEdit}
                  />
                </div>
                <UserNameEdit onClick={offEditName}>
                  <FaCheck />
                </UserNameEdit>
              </>
            )}
          </UserName>
          <UserEmail>{userKakao < 0 ? null : userKakao}</UserEmail>
        </NameEmailDiv>
        <SettingMenu>
          <SettingItem>
            <SettingItemTitle>푸시알림</SettingItemTitle>
            <SettingItemContent>
              <ThemeProvider theme={theme}>
                <Switch 
                  checked={isPush}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                  color="neutral"
                />
              </ThemeProvider>
            </SettingItemContent>
          </SettingItem>
          <SettingItem onClick={() => toggleFontModal(true)}>
            <SettingItemTitle>글자크기</SettingItemTitle>
            <SettingItemContent>{fontLetter[fontSize]}</SettingItemContent>
          </SettingItem>
          <SettingItem>
            <SettingItemTitle>버전정보</SettingItemTitle>
            <SettingItemContent>{version}</SettingItemContent>
          </SettingItem>
          <SettingItem onClick={() => toggleLogoutModal(true)}>
            <SettingItemTitle>로그아웃</SettingItemTitle>
            <SettingItemContent>
              <SettingLogoutIcon>
                <TbLogout />
              </SettingLogoutIcon>
            </SettingItemContent>
          </SettingItem>
        </SettingMenu>
      </SettingsBody>
      {isImageModal ? (
        <ImageModal
          currentImage={userImage}
          isOpen={isImageModal}
          toggle={toggleImageModal}
        />
      ) : (
        <div></div>
      )}
      {isFontModal ? (
        <FontModal isOpen={isFontModal} toggle={toggleFontModal} />
      ) : (
        <div></div>
      )}
      {isLogoutModal ? (
        <LogoutModal isOpen={isLogoutModal} toggle={toggleLogoutModal} />
      ) : (
        <div></div>
      )}
      <SettingCopyright>
        <div>Copyright ⓒB103</div>
      </SettingCopyright>
    </>
  );
};

export default Settings;