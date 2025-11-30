# 🎸 Bremen — 밴드 모집 커뮤니티 (Frontend)

## 📌 프로젝트 소개

**Bremen은 밴드원을 찾는 사람들과, 밴드를 찾는 사람들을 연결하는 커뮤니티 서비스입니다.**  
사용자는 지역·장르·악기 조건으로 밴드를 탐색하고, 프로필을 관리하며, 게시글을 작성해 밴드원을 모집할 수 있습니다.

본 프로젝트의 주요 목표는 다음과 같습니다.

- 바닐라 JavaScript로 SPA 및 VDOM 구현 
- 바닐라 JS기반 프로젝트를 **React 기반 구조로 리팩토링** (예정) 
- Spring Security + JWT 기반 **Access/Refresh Token 인증/인가 연동**

---

## 🗓 개발 정보

- 개인 프로젝트  
- 개발 기간: **2025.11.03 ~ 2025..**  
- **Frontend:** 바닐라 Javascript

---

# 🛠 기술 스택

## Frontend

- JavaScript / TypeScript   

---

# 📱 화면 구성

| 화면 | 설명 |
|------|------|
| 게시글 목록 | 서비스 소개 / 게시글 카드 목록 |
| 게시글 상세 | 게시글 정보 및 내용 / 댓글 / 좋아요 |
| 로그인·회원가입 | JWT 인증 |
| 프로필 수정 | 이미지 업로드/삭제 / 닉네임 수정 |
| 비밀번호 변경 | |

---

# 💡 주요 기능  
## 회원 가입 및 로그인 기능

- 이메일, 닉네임 중복검사
- 각 입력 유효성 검사
- 프로필 이미지 업로드

## 📝 게시글 기능

- 게시글 작성 / 수정 / 삭제 
- 이미지 업로드  

## 👤 프로필 관리

- 프로필 이미지 업로드 / 삭제  
- 닉네임 및 비밀번호 변경    

---

# 영상
### 회원가입 및 로그인
https://github.com/user-attachments/assets/972caae0-ac55-48fc-90aa-5ef90d94fdbe

### 게시글 작성 및 수정
https://github.com/user-attachments/assets/b85aa95a-eea2-4257-89f7-15a051a07170

### 댓글 작성,수정,삭제 및 게시글 삭제
https://github.com/user-attachments/assets/8342e31f-1b0b-4af9-b2f1-152dbe32e47c

### 사용자 정보 수정 및 로그아웃
https://github.com/user-attachments/assets/ed7cf05c-234b-4515-bb2d-cc26f17d8144

---

# 🏗 아키텍처

## 📁 디렉토리 구조

```
COMMUNITY/
└── src/
    ├── components/
    │   ├── Filter/
    │   │   ├── Filter.js
    │   │   └── Filter.css
    │   ├── Header/
    │   │   ├── Header.js
    │   │   └── Header.css
    │   ├── Input/
    │   │   ├── Input.js
    │   │   └── Input.css
    │   ├── Modal/
    │   │   ├── Modal.js
    │   │   └── Modal.css
    │   ├── PostCard/
    │   │   ├── PostCard.js
    │   │   └── PostCard.css
    │   ├── ProfileImage/
    │   │   ├── ProfileImage.js
    │   │   └── ProfileImage.css
    │   └── Toast/
    │       ├── Toast.js
    │       └── Toast.css
    │
    ├── core/
    │   ├── apiFetch.js
    │   ├── Component.js
    │   ├── createElement.js
    │   ├── diff.js
    │   ├── domToVNode.js
    │   ├── html.js
    │   └── Router.js
    │
    ├── pages/
    │   ├── EditPassword/
    │   │   ├── EditPassword.js
    │   │   └── EditPassword.css
    │   ├── EditPost/
    │   │   ├── EditPost.js
    │   │   └── EditPost.css
    │   ├── EditProfile/
    │   │   ├── EditProfile.js
    │   │   └── EditProfile.css
    │   ├── Login/
    │   │   ├── Login.js
    │   │   └── Login.css
    │   ├── PostDetail/
    │   │   ├── PostDetail.js
    │   │   └── PostDetail.css
    │   ├── Posts/
    │   │   ├── Posts.js
    │   │   └── Posts.css
    │   └── Signup/
    │       ├── Signup.js
    │       └── Signup.css
    │
    ├── utils/
    │   └── validators.js
    │
    ├── App.js
    ├── index.js
    ├── index.html
    ├── reset.css
    └── style.css
```
---
# 🧩 문제 해결 & 트러블슈팅

| 문제 | 해결 내용 |
|------|-----------|
| CORS | Origin, Credential, Header 충돌 해결 |
| 이미지 업로드 | multipart/form-data 처리 및 이미지 미리보기/삭제 UI 개선 |

---

# 📚 추가 문서

- 개발 회고: 
- 트러블슈팅: 

