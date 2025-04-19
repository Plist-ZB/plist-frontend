<br><br>

<div align="center"><img width="500" alt="plist-logo-group-h" src="https://github.com/user-attachments/assets/e3a0fb32-e339-40a8-909a-cd50eb74ab1d" /></div>

<br><br>

<div align="center">플리스트는 유튜브 플레이리스트를 공유하며<br>실시간으로 같은 음악을 듣고 채팅할 수 있는 소셜 음악 감상 플랫폼입니다.</div>

<br>

# 🔍 개요

> 제로베이스 협업 프로젝트<br>
> 개발 기간 : 2024.12 - 2025.03<br>
> Workspace : <a href="https://wistful-milk-580.notion.site/12-I-163ef82fa60280059ffbc98f782b0da4">Notion</a>
> <br>

# 🖥️ 배포 URL

> Frontend : https://plist.shop<br>
> Backend : https://api.plist.shop

<br>

# 👨‍👩‍👧‍👦 팀원

<table>
  <tr>
    <td align="center"><a href="https://github.com/JIHU96"><img src="https://avatars.githubusercontent.com/u/87410294?v=4" width="200px;"><br><sub><b>FE_노지훈</b></sub></a></td>
    <td align="center"><a href="https://github.com/songuna"><img src="https://avatars.githubusercontent.com/u/138658065?v=4" width="200px;"><br><sub><b>FE_송유나</b></sub></a></td>
    <td align="center"><a href="https://github.com/chulhyun96"><img src="https://avatars.githubusercontent.com/u/125968395?v=4" width="200px;"><br><sub><b>BE_박철현</b></sub></a></td>
    <td align="center"><a href="https://github.com/vgcgc"><img src="https://avatars.githubusercontent.com/u/71873426?v=4" width="200px;"><br><sub><b>BE_이은선</b></sub></a></td>
    <td align="center"><a href="https://github.com/HAKSUYOON"><img src="https://avatars.githubusercontent.com/u/175453399?v=4" width="200px;"><br><sub><b>BE_윤학수</b></sub></a></td>
  </tr>
</table>

<br>

# 🧩 주요 기능

### 1. 회원 관리

- 회원가입 및 소셜 로그인
- 프로필 관리 (닉네임, 프로필 사진)
- 내 플레이리스트, 이전 호스트 기록 확인

### 2. 플레이리스트 채널 목록

- 현재 LIVE 중인 플레이리스트 채널 목록 확인 (최신순, 참여자순 등으로 필터링)
- 원하는 플레이리스트 채널에 입장

### 3. 실시간 채널

- 회원 누구나 실시간 채널 생성이 되고 호스트로 지정이 됨
- 호스트는 유튜브 API를 이용해 원하는 음악을 검색하여 실시간 플레이리스트의 새로운 음악을 추가하거나 리스트에 대기 중인 음악 삭제 및 순서 조정

### 4. 실시간 플레이리스트 및 실시간 채팅

- 실시간 채널에 입장할 경우 현재 호스트의 재생 시점을 기준으로 입장한 사용자에게도 플레이리스트가 재생
- 호스트와 참여자는 채널 내의 채팅을 이용해 실시간으로 소통
- 참여자는 플레이리스트 목록 확인 및 음악 저장
- 참여자는 검색을 통해 원하는 추천곡을 선정하여 플레이리스트에 추가
- 참여자가 채널을 나갈 경우(뒤로가기), 현재까지의 플레이리스트 저장 여부를 결정

### 5. 내 플레이리스트

- 채널 내에서 사용자가 좋아요(찜)한 음악 확인
- 실시간 채널 외에 사용자가 검색을 통해 음악을 추가

<br>

# 🎞️ 화면 구성

<table>
  <tr>
    <td align="center">메인 페이지</td>
    <td align="center">채널 검색</td>
    <td align="center">카테고리 검색</td>
  </tr>
    <tr>  
    <td align="center"><img width="200" src="https://github.com/user-attachments/assets/c35beae7-e7e4-4b9c-9c92-76b1cebffb37" />
    <td align="center"><img width="200" src="https://github.com/user-attachments/assets/10b39cec-0b2c-43d2-a52d-a5e1a4048a32" />
    <td align="center"><img width="200" src="https://github.com/user-attachments/assets/c35beae7-e7e4-4b9c-9c92-76b1cebffb37" />
  </tr>
  <tr>
    <td align="center">로그인/회원가입</td>
    <td align="center">마이페이지 프로필 변경</td>
    <td align="center">내 호스트 이력</td>
  </tr>
  <tr>  
    <td align="center"><img width="200" src="https://github.com/user-attachments/assets/9e1a8b44-470e-4bca-a3f1-f7f553dd88b5" /></td>
    <td align="center"><img width="200" src="https://github.com/user-attachments/assets/20c8c0dc-6c4b-490b-81a5-65e77e8fd6ae" /></td>
    <td align="center"><img width="200" src="https://github.com/user-attachments/assets/6d38b736-7ddf-47c1-820f-cd7f4cdc9118" /></td>
  </tr>
  <tr>
    <td align="center">내 플레이리스트 추가</td>
    <td align="center">플레이리스트 음악 추가</td>
    <td align="center">플리방 나가기</td>
  </tr>
  <tr>  
    <td align="center"><img width="200" src="https://github.com/user-attachments/assets/ff7bbfe7-8a54-448b-9e7c-497d60de1c99" /></td>
    <td align="center"><img width="200" src="https://github.com/user-attachments/assets/2fe046fe-5822-4ebb-a494-7fc698604970" /></td>
    <td align="center"><img width="200" src="https://github.com/user-attachments/assets/02696c51-1b64-4586-9503-088524808172" /></td>
  </tr>
  <tr>
    <td align="center">플리방 생성</td>
    <td align="center" colspan="2">플리방 웹소켓</td>
  </tr>
  <tr>      
    <td align="center"><img width="200" src="https://github.com/user-attachments/assets/bc63a07f-e837-4e30-a2f2-55bae2b5f201" /></td>
    <td align="center" colspan="2"><img width="100%" src="https://github.com/user-attachments/assets/3b529b07-08f9-4399-9a8a-036d2e8397af" /></td>
  </tr>
</table>

<br>

# ⚙️ 기술 스택

### - Front-End

[![My Skills](https://skillicons.dev/icons?i=html,css,js,react,ts,vite,styledcomponents,tailwind,yarn)](https://skillicons.dev)
&nbsp;<img width="48px" height="48px" src="https://github.com/user-attachments/assets/524be433-5c89-4869-b19e-2de47d9c3513"/>

### - Back-End

<img width="48" alt="Frame 82 (1)" src="https://github.com/user-attachments/assets/be7950c2-ef99-4cb8-9997-79a0bd9d6217" />&nbsp;
[![My Skills](https://skillicons.dev/icons?i=java,gradle,mysql,hibernate,firebase,gcp,redis)](https://skillicons.dev)

### - Infra

[![My Skills](https://skillicons.dev/icons?i=docker,githubactions,nginx,ubuntu,aws)](https://skillicons.dev)

### - Collaboration

[![My Skills](https://skillicons.dev/icons?i=git,github,notion,discord,figma,postman)](https://skillicons.dev)

<br>

# 🔗 아키텍처

![image](https://github.com/user-attachments/assets/a3f24ab8-7a3f-4b3f-af4f-ddff7e127992)
<br>

# 📑 시작 가이드

### Requirements

해당 프로젝트를 로컬 환경에서 실행하기 위해서는 다음과 같은 환경이 필요합니다:

```
- Java 17 이상
- MySQL 8.0 이상
- Docker (선택 사항: Redis 및 기타 서비스 컨테이너 실행용)
- Git
- node 20.11 이상
- yarn 1.22
```

### Installation

- Frontend

```
$ git clone https://github.com/Plist-ZB/plist-frontend.git
$ cd plist-frontend
```

- Backend

```
$ git clone https://github.com/Plist-ZB/plist-backend.git
$ cd plist-backend
```
