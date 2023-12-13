
'use client'
import { connectDB } from '@/util/database'
import styles from './page.module.css'
import { ObjectId } from 'mongodb'
import Link from 'next/link'
import Delbtn from '@/components/Delbtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Modybtn from '@/components/Modybtn'
import Comment from '@/components/Comment'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import ModiComment from '@/components/ModiComment'


export default function Editcmt(props: any) {
  const query = useSearchParams()
  const cmtid = query?.get('cmtid')

  const session = useSession();

  const curuser = session.data?.user?.email

  const [result, setResult] = useState()
  const [feeling, setFeeling] = useState('');
  const [curmodycmt, setCurModyCmt] = useState(false)

  useEffect(() => {
    if (result) {
      setFeeling((result as any)?.feeling || ''); // 기본값이 null 또는 undefined일 때 빈 문자열로 설정
    }
  }, [result]);
  

  const params = {
    _id : props.params.id
  }

  useEffect(() => {
    axios.get('/api/edit',{params})
    .then((res)=>{
      setResult(res.data)
    })
  },[])

  const [lenTitle, setLenTitle] = useState((result as any)?.title)
  const [lenContent, setLenContent] = useState((result as any)?.content)

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
      <div className={styles.dateinner}>
        <p className={styles.datetitle}>이날의 날짜는</p>
        <p className={styles.articledate}> {(result as any)?.writedate}</p>
      </div>
      <div className={styles.first}>
        <p className={styles.addtitle}>이날의 제목</p>
        <p className={styles.articletitle}> {(result as any)?.title}</p>
      </div>
      <div className={styles.second}>
        <p className={styles.feelingtitle}>이날의 기분</p>
        <div className={styles.emojiinner}>
          <p className={styles.emoji}>{(result as any)?.feeling}</p>
        </div>
      </div>
      <div className={styles.third}>
        <p className={styles.weathertitle}>이날의 날씨는</p>
        <p className={styles.weather}>{chooseweather((result as any)?.weather)}</p>
      </div>
      <div className={styles.fourth}>
        <p className={styles.contenttitle}>이날은 이런 하루를 보내셨군요.</p>
        {
         (result as any)?.imgurl == '' ? null : <img className={styles.curimg} src={(result as any)?.imgurl}  />
        }
        <div className={styles.contentinner}>
          <p className={styles.content}>
          {(result as any)?.content}
          </p>
        </div>
      </div>
      {
        curuser == (result as any)?.writer?
        <div className={styles.modifyinner}>
          <Modybtn result = {result as any} curuser = {curuser} />
          <Delbtn _id={(result as any)?._id} curuser = {curuser} result = {result as any}/>
        </div>
        :
        null
      }
      <ModiComment _id = {props.params.id} cmtid={cmtid}/>
    
    </div>
  )
}