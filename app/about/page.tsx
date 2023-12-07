
import styles from './page.module.css';


export default async function About() {


  return (
    <div className={styles.articleinner}>
     <p className={styles.articletitle}>소개글</p>
     <p className={styles.content}>
      해당 페이지를 사용하시는데 간단한 안내말 입니다. <br></br>
      기본적으로 페이지를 이용하시려면 구굴,카카오, 네이버로 로그인을 해주셔야 합니다.<br></br>
      로그인을 하지 않으시면 다른 기능들을 이용하실 순 없으며, 오직 게시글을 보실수만 있습니다.<br></br>
      게시글을 작성하실 때 반드시 입력해주셔야 하는 부분은 제목, 기분, 내용 입니다. <br></br>
      선택사항으로 간단한 이미지파일을 하나 같이 업로드 하실 수 있습니다.<br></br>
      날짜와 날씨는 자동으로 입력됩니다.<br></br>
      메뉴의 마이페이지에서 작성하신 일기와 간단한 정보들을 보실 수 있습니다.<br></br>
      기본적으로 모든게시글의 작성자는 익명으로 표시되지 않습니다.<br></br>
      하지만 댓글을 작성하실땐 본인의 이메일이 표시됩니다.<br></br>
      게시글과, 댓글은 모두 수정하실 수 있으나, 삭제 후에는 복구하실 수 없습니다.
     </p>


    </div>
  )
}
