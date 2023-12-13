import { connectDB } from '@/util/database'
import styles from './page.module.css'
import { ObjectId } from 'mongodb'
import Link from 'next/link'
import Delbtn from '@/components/Delbtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Modybtn from '@/components/Modybtn'
import Comment from '@/components/Comment'
import Logout from '@/components/Logout'
import Login from '@/components/Login'
import { FaPencil } from 'react-icons/fa6'
import Pencil from '@/components/Pencil'

export default async function Detail(props: any) {
  const session = await getServerSession(authOptions)

  const curuser = session?.user?.email

  let db = (await connectDB).db('forum')
  let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })



  function chooseweather(weather: string) {
    switch (weather) {
      case 'Thunderstorm':
        return '⛈️'
        break;
      case 'Drizzle':
        return '☔️'
        break;
      case 'Rain':
        return '🌧️'
        break;
      case 'Snow':
        return '🌨️'
        break;
      case 'Atmosphere':
        return '🌫️'
        break;
      case 'Clear':
        return '☀️'
        break;
      case 'Clouds':
        return '☁️'
        break;
    }
  }

  return (
    <div className={styles.inner}>
      {
        session == undefined || null ? <Login />  :   <Logout />
      }
      <Pencil/>
      <div className={styles.dateinner}>
        <p className={styles.datetitle}>이날의 날짜는</p>
        <p className={styles.articledate}> {result?.writedate}</p>
      </div>
      <div className={styles.first}>
        <p className={styles.addtitle}>이날의 제목</p>
        <p className={styles.articletitle}> {result?.title}</p>
      </div>
      <div className={styles.second}>
        <p className={styles.feelingtitle}>이날의 기분</p>
        <div className={styles.emojiinner}>
          <p className={styles.emoji}>{result?.feeling}</p>
        </div>
      </div>
      <div className={styles.third}>
        <p className={styles.weathertitle}>이날의 날씨는</p>
        <p className={styles.weather}>{chooseweather(result?.weather)}</p>
      </div>
      <div className={styles.fourth}>
        <p className={styles.contenttitle}>이날은 이런 하루를 보내셨군요.</p>
        {
          result?.imgurl == '' ? null : <img className={styles.curimg} src={result?.imgurl}  />
        }
        <div className={styles.contentinner}>
          <p className={styles.content}>
            {result?.content}
          </p>
        </div>
      </div>
      {
        curuser == result?.writer ?
          <div className={styles.modifyinner}>
            <Modybtn result={result as any} curuser={curuser} />
            <Delbtn _id={(result as any)?._id} curuser={curuser} result={result as any} />
          </div>
          :
          null
      }
      <Comment _id={result?._id.toString()} />


    </div>
  )
}