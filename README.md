## 프로젝트 소개

배운 내용들을 토대로 처음으로 만들어 보는 프로젝트 입니다.
기본적으로는 게시판의 형태를 띄고있습니다.
일기를 주제로 잡았고 기본적인 crud에 제가 추가해보고 싶은 기능들을 추가해보았습니다.

## 사용기술

next.js : react 기조로 하는 프레임워크로 서버리스 함수를 사용하여 백엔드 쪽을 대체하였습니다.

typescript : 현재 이글을 작성하는 시점엔 사용했다고 볼 수 없습니다. 처음 사용해보니 문제가 많이 생겨 any를 너무 남발하기도 하였고 이해를 못하고 해결하기에 급급했습니다. 추후 계속 수정해야할 부분

axios : js의 fetch를 사용해도 충분하긴 했지만, json을 자동파싱해 준다든가, 여러이점이 있다고 하여 사용해보았습니다.

mongodb : 도큐먼트 형식으로 객체처럼 사용할 수 있어서 저같은 초보자에게 좋은 db고 강의 수강하던중 사용해본 경험이 있어 이 프로젝트에서도 사용하게 되었습니다.

redux-toolkit : 간단한 상태관리를 제외한 좀 더 복잡한 상태 관리를 위해 사용하였습니다.

nivo : 간단한 차트를 만들기 위해 사용하였습니다.

firebase : 프로젝트내에서 이미지 파일기능을 위해 storage 기능이 필요하여 사용하였습니다.

next-auth : 로그인 기능을 구현하기 위해 사용하였습니다.

## 구조

메인페이지, 글 작성 페이지, 로그인 페이지, 검색 결과 페이지,

내가 작성한 글 페이지, 마이 페이지, 기분별 현황 페이지, 댓글 수정 페이지, 

게시글 수정 페이지, 상세페이지, 전체글 페이지, 어바웃 페이지

이렇게 12 페이지로 구성되어 있습니다.

### 메인페이지
<img width="1000" alt="스크린샷 2023-12-13 오후 8 24 38" src="https://github.com/imsadboy2/next-js-diary/assets/127585508/83ed20b1-1a3a-44dc-b81b-73ad46c1a5a4">

* 루트(메인)페이지 입니다. 메뉴바, 로그인 or 로그아웃 버튼, 글작성 버튼이 존재합니다.
* 서버 컴포넌트로 구성되어 있고, 서버리스 함수를 통해 디비에서 작성되어 있느 게시글을 가져와 최신글 10개를 노출 시킵니다.
* 제목이 30글자가 넘어갈경우 30글자 뒤에 문자들은 ...으로 표기 됩니다.
* 로그인(세션) 여부에 따라 로그인, 로그아웃 버튼이 노출되며, 글작성 버튼 또한 로그인 되어있을 경우 글작성 페이지로, 그렇지 않을 경우 로그인 페이지로 이동합니다.

### 글 작성 페이지
<img width="1000" alt="스크린샷 2023-12-13 오후 8 34 34" src="https://github.com/imsadboy2/next-js-diary/assets/127585508/bf3c00f6-61f0-43bb-b3d4-32e2c1a694c6">

* 글 작성 페이지 입니다. 제목, 기분, 날씨, 본문, 이미지 를 입력할 수 있습니다. 
* 제목은 60자, 본문은 800자를 넘길 수 없습니다.
* 제목, 기분, 본문은 필수로 입력되어야하고 그렇지 않을 경우, 데이터를 전송시키지 않습니다.
* 날짜, 날씨는 api 통신을 통해 자동으로 입력되고 노출됩니다. 다만 위치 정보 권한에 동의를 할 경우 접속위치 기준으로 좀 더 정확한 날씨를 입력받을 수 있고, 그렇지 않은 경우 한국 위도 경도 기준으로 가장 정중앙에 날씨가 입력됩니다.
* 이미지 파일은 1개만 업로드 가능합니다.

### 로그인 페이지
<img width="1000" alt="스크린샷 2023-12-14 오전 9 22 38" src="https://github.com/imsadboy2/next-js-diary/assets/127585508/dbb38ce6-f682-43f6-8b1f-928f5ab6abf2">

* 로그인 페이지 입니다.
* next-auth 를 사용하여 구현하였으며 구글, 카카오, 네이버 로 로그인 할 수 있습니다. 하지만 네이버는 따로 권한 신청이 필요하여 아직 사용할 수 없습니다. 구글 과 카카오는 정상이용 가능합니다.

### 전체 글보기 && 검색 결과 페이지

|전체 글보기|검색 결과 페이지|내가 작성한 글 페이지|
|---|---|---|
|<img width="1000" alt="스크린샷 2023-12-14 오전 9 31 33" src="https://github.com/imsadboy2/next-js-diary/assets/127585508/5be51ddb-7f16-4736-9f46-4d1fe699c739">|<img width="1000" alt="스크린샷 2023-12-14 오전 9 31 55" src="https://github.com/imsadboy2/next-js-diary/assets/127585508/e931e3b4-9b7e-48ee-85c9-bd7a74c4e820">|<img width="1000" alt="스크린샷 2023-12-14 오전 10 08 02" src="https://github.com/imsadboy2/next-js-diary/assets/127585508/48f626e2-1fd9-40a9-bd62-be07aa2808bf">|
* 전체 글보기 페이지는 현재 db에 존재하는 모든 게시글을 한 페이지당 10개씩으로 나누어 노출 시킵니다.
* 검색 결과 페이지는 전체 글 페이지 하단에 검색창에서 찾고자하는 단어로 검색하면 제목, 본문 내용에 그 찾고자 하는 단어 있는 게시글들만 따로 추려내어 노출시킵니다.
* 마이페이지를 이용해서 내가 작성한 글만 모두 볼수 있습니다.

### 마이 페이지
<img width="1000" alt="스크린샷 2023-12-14 오전 10 01 07" src="https://github.com/imsadboy2/next-js-diary/assets/127585508/5bb4e9c8-92f4-47df-9759-f13a0a333e2d">

* 마이페이지에선 자신의 이메일, 작성한 총 일기수, 총 일기들의 기분갯수와 그에 따른 문구가 노출됩니다. 또한 총 일기 갯수의 숫자를 클릭하면 자신이 작성한 모든글을 볼수 있는 페이지로 이동합니다.

### 기분별 일기 현황 페이지
<img width="1000" alt="스크린샷 2023-12-14 오전 10 13 20" src="https://github.com/imsadboy2/next-js-diary/assets/127585508/7f85714d-9cd8-4b15-a07a-3d00dc929eb7">
* 기분별 일기 현황 페이지는 현재 존재하는 모든 게시글들의 기분중 어떤 기분이 가장 많은지를 원그래프로 확인 할 수 있습니다.

### 어바웃 페이지
<img width="1440" alt="스크린샷 2023-12-14 오전 10 19 54" src="https://github.com/imsadboy2/next-js-diary/assets/127585508/c37c821d-c995-445c-9aae-74d4070775c3">


* 간단한 웹 소개 페이지 입니다.

 
