'use client'

import { connectDB } from '@/util/database'
import styles from './page.module.css'
import { ObjectId } from 'mongodb'
import Feeling from '@/components/Feeling'
import Delbtn from '@/components/Delbtn'
import { useEffect, useState, ChangeEvent } from 'react'
import axios from 'axios'

export default function Edit(props: any) {


  const [result, setResult] = useState()

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

  const handlelengthTitle = (e:ChangeEvent<HTMLInputElement>) => {
    const maxLength = 60;
    const inputValue = e.target.value;
    
    if (inputValue.length > maxLength) {
      alert(`제목의 길이는 60자를 넘어갈 수 없습니다.`)
      setLenTitle(inputValue.substring(0, maxLength))
    } else {
      setLenTitle(inputValue)
    }
  }
  const handlelengthContent = (e:ChangeEvent<HTMLTextAreaElement>) => {
    const maxLength = 800;
    const inputValue = e.target.value;
    
    if (inputValue.length > maxLength) {
      alert(`본문 내용은 800자를 넘어갈 수 없습니다.`)
      setLenContent(inputValue.substring(0, maxLength))
    } else {
      setLenContent(inputValue)
    }
  }
  

  return (
    <div className={styles.inner}>
      <form action="/api/edit" method='post'>
        <input name='_id' defaultValue={(result as any)?._id.toString()} style={{display: 'none'}}/>
        <div className={styles.dateinner}>
          <p className={styles.datetitle}>이날의 날짜는</p>
          <p className={styles.articledate}> {(result as any)?.writedate}</p>
        </div>
        <div className={styles.first}>
          <p className={styles.addtitle}>이날의 제목</p>
          <input onChange={handlelengthTitle} defaultValue={(result as any)?.title} name='title' className={`${styles.titleinput} ${styles.publicinput}`}/>
        </div>
        <div className={styles.second}>
          <p className={styles.feelingtitle}>이날의 기분</p>
          <select className={styles.choosefeel} id='feeling' name='feeling' defaultValue={(result as any)?.feeling}>
            <option value="🤬">🤬</option>
            <option value="😭">😭</option>
            <option value="🤕">🤕</option>
            <option value="🤯">🤯</option>
            <option value="🫣">🫣</option>
            <option value="🥳">🥳</option>
            <option value="🥰">🥰</option>
            <option value="🤩">🤩</option>
          </select>
          {/* <Feeling exfeel = {result?.feeling} articleId = {props.params.id}/> */}
        </div>
        <div className={styles.third}>
          <p className={styles.weathertitle}>이날의 날씨는</p>
          <p className={styles.weather}>{chooseweather((result as any)?.weather)}</p>
        </div>
        <div className={styles.fourth}>
          <p className={styles.contenttitle}>이날은 이런 하루를 보내셨군요.</p>
          <div className={styles.contentinner}>
          <textarea onChange={handlelengthContent} defaultValue={(result as any)?.content} name='content' className={`${styles.content} ${styles.publicinput}`}/>
          </div>
        </div>
        <div className={styles.modifyinner}>
          <button type='submit' className={styles.modifyp}>✎ 수정완료</button>
          <Delbtn _id={(result as any)?._id}/>
        </div>
        <div className={styles.addcommentinner}>
          <p className={styles.addcmtwriter}>댓글 작성자</p>
          <textarea className={styles.addcomment}></textarea>
        </div>
        <button className={styles.addcmtbtn}>작성</button>
        <div className={styles.exsitedcmt}>
          <p className={styles.excmtwriter}>댓글 작성자</p>
          <p className={styles.excomment}>
            cwegwfwqsqxwq
            cwegwfwqsqxwq
            cwegwfwqsqxwq
            cwegwfwqsqxwq
            cwegwfwqsqxwq
          </p>
        </div>
      </form>
    </div>
  )
}