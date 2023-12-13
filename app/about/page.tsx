
import styles from './page.module.css';


export default async function About() {


  return (
    <div className={styles.articleinner}>
     <p className={styles.articletitle}>소개글</p>
     <p className={styles.content}>
      해당 페이지를 사용하시는데 간단한 안내말 입니다. <br></br> <br></br> 
      기본적으로 페이지를 이용하시려면 구굴,카카오, 네이버로 로그인을 해주셔야 합니다.<br></br>
      로그인을 하지않으실 경우 일부기능이 제한됩니다.<br></br><br></br> 
      게시글을 작성하실 때 제목, 기분, 내용은 비워두실 수 없습니다. <br></br>
      이미지 파일은 한개만 업로드 하실 수 있습니다.<br></br>
      날짜와 날씨는 자동으로 입력됩니다. 위치 정보 권한에 동의해주시면 더정확한 날씨를 입력받으실 수 있습니다.<br></br><br></br> 
      선택가능한 기분은 🤬 😭 🤕 🤯 😳 🥳 🥰 🤩 순서대로 분노, 슬픔, 아픔, 불안, 창피함, 기쁨, 사랑, 바람(소망) 입니다.<br></br><br></br>
      감사합니다.
     </p>


    </div>
  )
}
