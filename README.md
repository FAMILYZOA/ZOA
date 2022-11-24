* # 📄 [README.md](http://README.md)

  # **ZOA (좋은아침)**

  ![https://user-images.githubusercontent.com/97648026/202893419-d52c9b64-ab18-4433-913e-673829bade79.png](https://user-images.githubusercontent.com/97648026/202893419-d52c9b64-ab18-4433-913e-673829bade79.png)

  ## **☀️ 서비스 소개**

  > :paintbrush: Figma ( [링크](https://www.figma.com/file/tYLK0m5qS5ZoQ9cSEIZhMI/%EC%9E%90%EC%9C%A8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=3%3A2&t=hZ5Niv7cLkONZYPy-1) ) / :cd: ERD ( [링크](./docs/B103_ERD.pdf) )  / :page_facing_up: 기능명세서 ( [링크](./docs/B103_기능명세서.pdf) )  / :file_folder: API명세서 ( [링크](./docs/B103_API명세서.pdf) )
  >
  > :notebook_with_decorative_cover: 시연 시나리오 ( [링크](./exec/자율프로젝트_대전1반_B103_시연시나리오.pdf) ) / :film_projector: 발표 자료 ( [링크](./docs/자율PJT_대전_1반_B103_발표자료.pdf) ) / :tv: UCC  ( [링크](https://www.youtube.com/watch?v=k71O_0NrBNw) ) / :arrow_forward: 배포 주소 ( [링크](https://familyzoa.com/intro) ) 
  
  ------
  
  - 한줄로 확인하는 가족 소통앱!
  
  - 매일 자신의 상태, 생각을 한줄로 남겨 가족들에게 안부를 전하세요! 오늘도 좋은 아침!
  
  - 글 한줄로 남기기엔 부족함이 많다면 음성메시지는 어떤가요?
  
  - 가족의 특별한 일정, 할 일을 등록하여 관리도 가능합니다!
  
    
  
  ## **☀️ 팀원 소개**
  
  ------
  
  ### **💻 Front-End**

  - 정아현(팀장)
    - 로그인 (소셜, 기본) / 할일 등록, 조회 / 캘린더 페이지 / 메인 페이지 / CSS 보완
  - 김대원
    - **Android, IOS 하이브리드 앱 제작, 배포** / 로그인 (소셜, 기본) / 설정
  - 김민정
    - 캘린더 페이지 / 메인 페이지 / 안녕 페이지 / 가족 관리 페이지
  - 박재현
    - 할일 등록, 조회 / 설정 페이지 / 음성 메시지 / 오류 수정 / CSS 애니메이션

  ### **💿 Back-End**

  - 김동완(부팀장)
    - 인증 / 가족 / 스크럼 / 음성메시지 / 인프라
  - 박호현
    - 체크리스트 / 캘린더 / 인프라
  
  ## **☀️ 주요기술스택 및 개발 환경**
  
  ------
  
  ### **💻 Front-End**
  
  - Visoual Studio Code: 1.70.0
  - Node.js: 18.12.1
  - React 18.2.0
  - TypeScript 4.8.4
  - 

  ### **💿 Back-End**
  
  - Python 3.9
  - Django 3.2.16
  - google-api-core 2.10.2
  - firebase-admin 6.0.1
  
  ### **🏬 Mobile**
  
  - React: 18. 2. 0
  - React-Native 0.70.0
    - React-Native-Image-Picker 4.10.0
  - Android
    - minimum SDK: 27
    - target SDK : 31
  - iOS
    - minimum Version: 12.4
    - target SDK: 15.4

  ### 📚 DB

  - MySQL: Ver 8.0.31
  - MySQL Workbench: 8.0.30
  
  ### 🏫 Server

  - Ubuntu: 20.04

  ### ETC

  - Amazon S3
  - FCM (Firebase Cloud Messaging)
  - Naver Cloud SMS
  - KAKAO Login
  
  ## **☀️ 아키텍처**
  
  ------
  
  ![ZOA_Architecture](https://user-images.githubusercontent.com/97648026/202909682-827170c6-ccc4-4181-b5e9-97763afde972.png)
  
  ![https://user-images.githubusercontent.com/97648026/202894988-80bbbec7-2aa1-4f29-ae88-73cd72ab8519.png](https://user-images.githubusercontent.com/97648026/202894988-80bbbec7-2aa1-4f29-ae88-73cd72ab8519.png)
  
  ## **☀️ 주요기능소개**
  
  ------
  
  > 자세한 사항은 여기에서 열람 가능합니다.
  
  ![인트로](https://user-images.githubusercontent.com/97648026/202909574-a37c2433-700f-41b5-bfd3-fe91050fd341.gif)
  
  ### 🔆 로그인
  
  - 소셜 로그인(카카오톡) / 자체 로그인 기능 제공
  
    - 자체 로그인의 경우, 전화번호 및 비밀번호를 통해 접속 가능
  
      ![로그인](https://user-images.githubusercontent.com/97648026/202909578-56220c68-9c86-48a7-b4f0-b2a4b95443c4.gif)
  
  ### 🔆 메인 페이지
  
  - 상단에서 가족의 오늘 상태를 아이콘으로 확인 가능
  
  - 주요 일정 표시
  
  - 가족 구성원이 가족에게 보내는 메시지 열람 가능
  
  - 오늘 본인에게 부여된 할 일 열람 및 체크 가능
  
    ![메인화면](https://user-images.githubusercontent.com/97648026/202909579-20a4a724-5855-4194-9249-51c48bc4dc45.gif)
  
  ### 🔆 캘린더
  
  - 가족들에게 공유되는 일정, 기념일 생성 및 조회 가능
  
    ![캘린더](https://user-images.githubusercontent.com/97648026/202909586-d65ff332-443c-4800-9498-046292470255.gif)
  
  ### 🔆 안녕
  
  - 매일 자신의 상태와 메시지를 간략하게 남기기 가능
  
  - 구성원이 남긴 경우, 열람 가능
  
    ![안녕](https://user-images.githubusercontent.com/97648026/202909590-0489002e-7118-47d3-a717-3dc45d167cc2.gif)
  
  ### 🔆 음성 메시지 생성
  
  - 음성 메시지 보낼 상대를 선택 후, 녹음된 음성 메시지를 보낼 수 있음
  
    ![음성메시지작성](https://user-images.githubusercontent.com/97648026/202909593-0c069628-0414-4735-b84c-4f976cc5a1d0.gif)
  
  ### 🔆 음성 메시지 조회
  
  - 음성 메시지를 조회, 삭제, 보관함에 보관 가능
  
  ![https://user-images.githubusercontent.com/97648026/202908413-ad21b103-f3d6-4a21-b0bd-b34984e7f0a8.gif](https://user-images.githubusercontent.com/97648026/202908413-ad21b103-f3d6-4a21-b0bd-b34984e7f0a8.gif)
  
  ### 🔆 설정 페이지
  
  - 프로필 이미지 설정
  - 닉네임 설정
  - 글로벌 폰트 설정
  - 로그아웃
  - 가족 탈퇴 가능
  
  ![https://user-images.githubusercontent.com/97648026/202906783-b2277092-4857-484b-a39c-65a834c92418.gif](https://user-images.githubusercontent.com/97648026/202906783-b2277092-4857-484b-a39c-65a834c92418.gif)
  
  🔆 할 일 등록
  
  - 가족 구성원들을 선택하여, 할 일 부여 가능
  
  ![https://user-images.githubusercontent.com/97648026/202906600-298f8659-21d1-4011-a0b4-4f1af0692a8a.gif](https://user-images.githubusercontent.com/97648026/202906600-298f8659-21d1-4011-a0b4-4f1af0692a8a.gif)
  
  ### 🔆 할 일 조회
  
  - 개인, 가족 구성원들의 할 일 목록 조회 가능
  - 해야 할 일을 체크 하여 완료
  - 완료 목록 중, 실수로 체크 한 경우, 되돌리기 가능
  
  ![https://user-images.githubusercontent.com/97648026/202905890-9fd55177-cfa9-47d9-9b07-c4c5fa31ebac.gif](https://user-images.githubusercontent.com/97648026/202905890-9fd55177-cfa9-47d9-9b07-c4c5fa31ebac.gif)
  
  - 무한 스크롤을 통해 리스트 추가 열람 가능
  
  ![https://user-images.githubusercontent.com/97648026/202905896-c9ebb63d-f41f-47a9-9c23-10c7c5cf4184.gif](https://user-images.githubusercontent.com/97648026/202905896-c9ebb63d-f41f-47a9-9c23-10c7c5cf4184.gif)
  
  ### 🔆 가족 관리
  
  - 가족 초대
    - 카카오 공유, 메시지 공유, 초대코드를 통한 초대 가능
  - 가족 호칭 설정
  
  ![https://user-images.githubusercontent.com/97648026/202905545-7884a891-9c12-4007-8178-86c2ffa6555e.gif](https://user-images.githubusercontent.com/97648026/202905545-7884a891-9c12-4007-8178-86c2ffa6555e.gif)
  
  ## **☀️ 회고**
  
  ------
  
  ### **❤️ 김대원**
  
  - 훌륭한 팀원들과 같이 프로젝트를 진행할 수 있어서 영광이었습니다.
  - 언제나 새로운 기술을 배우는 것은 즐겁습니다.
  - 이번 프로젝트를 하면서 React와 같은 프론트엔드 기술과 React Native를 통한 크로스플랫폼 앱에 관해 알게 됐습니다. 또한 하이브리드 앱을 구현하는 법을 배울 수 있었어서, 추후에 혼자서 앱을 만들 수 있겠다는 자신감이 생겼습니다.
  - 둘 다 앱 심사에 올린 것은 뿌듯하지만, 발표날까지 결과를 보지 못했다는 것이 아쉽습니다. 그리고 코드를 좀 더럽게 짠 것 같아서 아쉽습니다.
  - 싸피를 통하여 다양한 분야를 찍먹? 할 수 있는 계기가 되어서 뿌듯합니다.

  ### **💗 김동완**
  
  - 팀원들과 함께 노력하고 소통해서 원하는 목표들을 이룰 수 있었습니다.
  - 지난 프로젝트에서 아쉬웠던 API Test, Query 성능 향상 등 백엔드 개발의 능력을 길렀습니다.
  - 인프라 측면에서는 지금까지 배웠던 내용을 응용하여 CI/CD를 성공적으로 구축했습니다.
  - 앱 출시, 로그 분석, 추가 기능 개발 등 아직 더 해야할 것 해보고 싶은것이 많습니다. 끝난 후에도 열심히 더 노력해보겠습니다.
  
  ### **💙 김민정**
  
  - 하지만 기존에 알고 있던 지식을 더 단단하게 만드는게 이번 프로젝트 목표였는데(완벽하게 이뤘다고 할 순 없겠지만) 이전 프로젝트보다는 성장한 것 같아 뿌듯합니다.
  - 프로젝트를 진행할 때마다 *JS에 대한 깊은 이해+클린 코드 작성*의 필요성을 느낍니다.
  - 팀원들과 서로 묻고 답하며 *왜 이런 로직을 짰는가*에 대해 더 많이 고민해본 시간이었습니다.
  
  ### **🖤 박재현**
  
  -  React로 프론트역량을 늘릴 수 있는 계기가 되었습니다. 반복되는 구조를 줄이고자하는 시도를 많이 하지 않았고 어떻게하면 효율적으로 짤 수 있을까? 라는 고민을 많이 하지 않았던게 아쉬웠습니다. 몇번 안 쓸거 같았던 컴포넌트, 함수들이 다른 곳에서 사용될때가 많았던걸 생각하면 모듈화하여 호출하는걸 많이 고려했어야 하지 않았나 생각합니다.
     좋은 프로젝트 팀원들과 함께 할 수 있어서 좋았습니다! 다른 영역을 작업한 코드들을 보며 배울 점들이 정말 많았던 프로젝트였습니다.
  
  ### **💚 박호현**
  
  - 팀원들과 함께한 덕분에 프로젝트를 성공적으로 끝낼 수 있었습니다. 프로젝트를 진행하면서 부족한 부분을 팀원들에게 많이 배울 수 있었고, 이전 프로젝트들은 프로젝트의 완성을 목적으로 두고 진행하였다면 이번 프로젝트에서는 프로젝트의 완성도와 함께 ‘어떻게 하면 효율적이고 사용자 입장에서 사용하기 좋은 프로그램을 만들 수 있을까?’란 고민을 했었습니다. 덕분에 많이 성장할 수 있었습니다.
  
  ### **💜 정아현**
  
  * React 를 제대로 사용해 본 적이 없었는데, 이번 프로젝트에서 이해하면서 프로젝트를 진행할 수 있어 좋았습니다. 혼자하면 어려웠을 부분들도 팀원들과 상의하며 에러픽스를 할 수 있었고, 팀원들의 코드를 보며 다양한 로직에 대해 생각해 볼 수 있었습니다. 직전 프로젝트 두 가지 모두 모바일 웹으로 진행했었는데, 실제로 앱을 만들어 볼 수 있어 좋은 기회였습니다. 프로젝트 마감 후에도 버전 관리를 계속 하며 유저를 실제로 받아보는 경험을 해보고 싶습니다.
