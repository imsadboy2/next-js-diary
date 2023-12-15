import { connectDB } from '@/util/database'
import styles from './page.module.css'
import Link from 'next/link'
import Logout from '@/components/Logout'
import Login from '@/components/Login'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Pencil from '@/components/Pencil'


export default async function Mypage(props: any) {
  const usermail = decodeURIComponent(props.params.email)

  let session = await getServerSession(authOptions)

  let db = (await connectDB).db('forum')
  let result = await db.collection('post').find({ writer: usermail }).toArray()


  const feel = result.map((e, i) => {
    return e.feeling
  })
  const cutarr = (arr: any[], target: string) => {
    return arr.reduce((count, element) => (element === target ? count + 1 : count), 0)
  }


  function grefeel(arr: any) {
    const initfeel: any = {}

    arr.forEach(function (e: string) {
      initfeel[e] = (initfeel[e] || 0) + 1
    })

    let mostfeel; // 가장 많은 빈도수의 기분
    let curmax = 0; //현재 최고의 빈도수

    for (const key in initfeel) {
      if (initfeel[key] > curmax) {
        curmax = initfeel[key]
        mostfeel = key
      }
    }
    return mostfeel
  }

  const setgrefeel = grefeel(feel)


  const feelcomment = () => {
    switch (setgrefeel) {
      case '🤬':
        return ('당신 일기 감정의 대부분은 "분노" 입니다.')
        break;
      case '😭':
        return ('당신 일기 감정의 대부분은 "슬픔" 입니다.')
        break;
      case '🤕':
        return ('당신 일기 감정의 대부분은 "아픔" 입니다.')
        break;
      case '🤯':
        return ('당신 일기 감정의 대부분은 "불안" 입니다.')
        break;
      case '😳':
        return ('당신 일기 감정의 대부분은 "창피" 입니다.')
        break;
      case '🥳':
        return ('당신 일기 감정의 대부분은 "기쁨" 입니다.')
        break;
      case '🥰':
        return ('당신 일기 감정의 대부분은 "사랑" 입니다.')
        break;
      case '🤩':
        return ('당신 일기 감정의 대부분은 "바람" 입니다.')
        break;
    }

  }

  const detailfeelcmt = () => {
    switch (setgrefeel) {
      case '':
        return <p className={styles.detailfeelcmt} ></p>
        break;
      case '🤬':
        return <p className={styles.detailfeelcmt} >분노에 관한 명언은 <br /><br />&quot;노여움은 가끔 도덕과 용기의 무기가 된다.&quot;<br />-아리스토텔레스-<br />
          <br />&quot;원한은 원한으로 갚는다고 풀어지지 않으리니 원한은 버릴때에만 풀리리라.&quot;<br />-석가모니-</p>
        break;
      case '😭':
        return <p className={styles.detailfeelcmt} >슬픔에 관한 명언은 <br /><br />&quot;슬픔은 찰나의 고뇌이며, 슬픔에 빠지면 인생을 망친다.&quot;<br />-벤자민 디즈레일리-<br />
          <br />&quot;웃어라 온 세상이 너와 함께 웃을 것이다. 울어라. 너혼자 울 것이다.&quot;<br />-엘라 윌콕스-</p>
        break;
      case '🤕':
        return <p className={styles.detailfeelcmt} >아픔에 관한 명언은 <br /><br />&quot;나를 죽이지 못하는 고통은, 나를 더 강하게 해줄 뿐이다.&quot;<br />-프리드리히 니체-<br />
          <br />&quot;고통이 남기고 간 뒷맛을 보아라, 고난이 지나가면 반드시 단맛이 스며든다.&quot;<br />-톨스토이-</p>
        break;
      case '🤯':
        return <p className={styles.detailfeelcmt} >불안에 관한 명언은 <br /><br />&quot;불안은 미래에 대한 믿음을 훔치고, 현재의 기쁨을 훼손한다.&quot;<br />-레오 버스카글리어-<br />
          <br />&quot;우리가 많은 것을 통제하지 못할 때, 우리는 자기 자신을 통제할 수 있다..&quot;<br />-에픽테토스-</p>
        break;
      case '😳':
        return <p className={styles.detailfeelcmt} >창피함에 관한 명언은 <br /><br />&quot;창피함을 견디는 사람은 어떠한 상황에서도 더 나은 선택을 할 수 있게 만든다.&quot;<br />-제스 C 스콧-<br />
          <br />&quot;창피함은 결코 실패가 아니라, 배움의 기회이다.&quot;<br />-알렉산더 포프-</p>
        break;
      case '🥳':
        return <p className={styles.detailfeelcmt} >기쁨에 관한 명언은 <br /><br />&quot;당신이 경험하는 모든 순간에 기쁨을 더하라.&quot;<br />-디팩 초프라-<br />
          <br />&quot;기쁨은 다른 사람들과 나눌 때 두배가 된다.&quot;<br />-알베르트 슈바이처-</p>
        break;
      case '🥰':
        return <p className={styles.detailfeelcmt} >사랑에 관한 명언은 <br /><br />&quot;사랑은 나를 두배로 만든다. 나를 낮추거나, 나를 높이거나&quot;<br />-할런 밀러-<br />
          <br />&quot;사랑은 마음에서 시작되어 미소로 끝난다.&quot;<br />-마더 테레사-</p>
        break;
      case '🤩':
        return <p className={styles.detailfeelcmt} >바람에 관한 명언은 <br /><br />&quot;삶은 욕망과 행동의 연속이다.&quot;<br />-마하트마 간디-<br />
          <br />&quot;기대와 희망은 어두운 길에서 빛을 제공합니다.&quot;<br />-마틴 루터킹-</p>
        break;
    }

  }


  return (
    <div className={styles.inner}>
      {
        session == undefined || null ? <Login />  :   <Logout />
      }
      <Pencil/>
      <p className={styles.ptitle}>당신의 이메일</p>
      <p className={styles.uemail}>
        {usermail}
      </p>
      <p className={styles.cnttitle}>지금까지 작성한 일기는 총
        <Link href={'/mypost/' + usermail}>
          <span className={styles.myarticle}>{" " + result.length + " "}</span>
        </Link>
        장이에요.</p>

      <p className={styles.ptitle}>보통 어떤 감정이실 때가 가장 많았을까요?</p>
      <div className={styles.feelinner}>
        <p className={styles.feelingcnt}>🤬 {cutarr(feel, '🤬')}</p>
        <p className={styles.feelingcnt}>😭 {cutarr(feel, '😭')}</p>
        <p className={styles.feelingcnt}>🤕 {cutarr(feel, '🤕')}</p>
        <p className={styles.feelingcnt}>🤯 {cutarr(feel, '🤯')}</p>
        <p className={styles.feelingcnt}>😳 {cutarr(feel, '😳')}</p>
        <p className={styles.feelingcnt}>🥳 {cutarr(feel, '🥳')}</p>
        <p className={styles.feelingcnt}>🥰 {cutarr(feel, '🥰')}</p>
        <p className={styles.feelingcnt}>🤩 {cutarr(feel, '🤩')}</p>
      </div>
      <p className={styles.ptitle}>{feelcomment()}</p>
      {detailfeelcmt()}
    </div>
  )
}
