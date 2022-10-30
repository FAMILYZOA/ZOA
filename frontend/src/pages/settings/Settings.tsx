import styled from "styled-components";
import React, { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { TbLogout } from "react-icons/tb"

const SettingsHeader = styled.div`
  display: flex;
  height: 8vh;
  width: 100vw;
  font-size: 3vh;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
`
const SettingsBody = styled.div`
  position: relative;
`

const ProfileImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2.5vh 0 5vh;
`
const ProfileImgCover = styled.div`
  position: relative;
`

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
  background: linear-gradient(120.28deg, #FF787F 15.03%, #FEC786 87.76%);
  color: #fff;
`
const ProfileImg = styled.img`
  width: 20vh;
  height: 20vh;
  border-radius: 10vh;
`
const NameEmailDiv = styled.div`
  height: 2.5vh; // 나중에 폰트 사이즈 변수화 하여 연동 할 것
  position: relative;
  padding-bottom: 2vh;
  border-bottom: 1px solid #ff787f;
`
const UserName = styled.div`
  position: absolute;
  top: 0;
  left: 2.5vh;
  font-size: 2.5vh;
`
const UserEmail = styled.div`
  position: absolute;
  top: 0;
  right: 2.5vh;
`
const SettingMenu = styled.div`
  margin: 2vh 3vh;
  font-size: 2.5vh;
`
const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F9D7D3;
  height: 8vh;
`

const SettingItemTitle = styled.div`
`
const SettingItemContent = styled.div`
  color: #ff787f;
`
const SettingCopyright = styled.div`
  position: absolute;
  bottom: 9.25vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5vh;
`
const SettingLogoutIcon = styled.div`
  height: 4.5vh;
  width: 4.5vh;
  font-size: 4.5vh;
`

const Settings = () => {
  const [profile, setProfile] = useState<{phone: string; name: string; image: string;}>({
    phone: "",
    name: "신짱구",
    image: "https://user-images.githubusercontent.com/97648026/197681290-d733b42c-bc46-4af7-b149-96dd02150234.png",
  }) // 유저 프로필 정보
  const [version, setVersion] = useState<string>("1.0.0")
  const [fontSize, setFontSize] = useState<number>(2)
  const fontLetter = [
    "아주 작음",
    "작음",
    "보통",
    "큼",
    "아주 큼"
  ]

    return (
        <>
          <SettingsHeader>
            <div>설정</div>
          </SettingsHeader>
          <SettingsBody>
            <ProfileImgDiv>
              <ProfileImgCover>
                <div>
                  <ProfileImg src={profile.image}/>
                </div>
                <ProfileEditIcon>
                  <AiFillCamera />
                </ProfileEditIcon>
              </ProfileImgCover>
            </ProfileImgDiv>
            <NameEmailDiv>
              <UserName>{profile.name}</UserName>
              <UserEmail></UserEmail>
            </NameEmailDiv>
            <SettingMenu>
              <SettingItem>
                <SettingItemTitle>푸시알림</SettingItemTitle>
                <SettingItemContent></SettingItemContent>
              </SettingItem>
              <SettingItem>
                <SettingItemTitle>글자크기</SettingItemTitle>
                <SettingItemContent>{fontLetter[fontSize]}</SettingItemContent>
              </SettingItem>
              <SettingItem>
                <SettingItemTitle>버전정보</SettingItemTitle>
                <SettingItemContent>{version}</SettingItemContent>
              </SettingItem>
              <SettingItem>
                <SettingItemTitle>로그아웃</SettingItemTitle>
                <SettingItemContent>
                  <SettingLogoutIcon>
                    <TbLogout />
                  </SettingLogoutIcon>
                </SettingItemContent>
              </SettingItem>
            </SettingMenu>
          </SettingsBody>
          <SettingCopyright>
            <div>Copyright ⓒB103</div>
          </SettingCopyright>
        </>
    )
}

export default Settings;