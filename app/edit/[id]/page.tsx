'use client'

import styles from './page.module.css'
import Delbtn from '@/components/Delbtn'
import { useEffect, useState, ChangeEvent } from 'react'
import axios from 'axios'
import Imgupload from '@/components/Imgupload'
import { useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'

export default function Edit(props: any) {
  const previmgurl = useSelector((state:any)=> state.imgurl)
  

  const session = useSession();

  const curuser = session.data?.user?.email

  const [result, setResult] = useState<any>()

  
  const [feeling, setFeeling] = useState('');

  useEffect(() => {
    if (result) {
      setFeeling((result as any)?.feeling || '');
      setLenTitle((result as any)?.title|| '')
      setLenContent((result as any)?.content|| '') // 기본값이 null 또는 undefined일 때 빈 문자열로 설정
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

  const [lenTitle, setLenTitle] = useState('')
  const [lenContent, setLenContent] = useState('')

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
        <input name='imgurl' defaultValue={
          previmgurl == '' ? (result as any)?.imgurl : previmgurl
        } style={{display: 'none'}}/>
        <div className={styles.dateinner}>
          <p className={styles.datetitle}>이날의 날짜는</p>
          <p className={styles.articledate}> {(result as any)?.writedate}</p>
        </div>
        <div className={styles.first}>
          <p className={styles.addtitle}>이날의 제목</p>
          <input onChange={handlelengthTitle} value={lenTitle} name='title' className={`${styles.titleinput} ${styles.publicinput}`}/>
        </div>
        <div className={styles.second}>
          <p className={styles.feelingtitle}>이날의 기분</p>
          <select className={styles.choosefeel} id='feeling' name='feeling' value={feeling} onChange={(e) => setFeeling(e.target.value)}>
            <option value="🤬">🤬</option>
            <option value="😭">😭</option>
            <option value="🤕">🤕</option>
            <option value="🤯">🤯</option>
            <option value="😳">😳</option>
            <option value="🥳">🥳</option>
            <option value="🥰">🥰</option>
            <option value="🤩">🤩</option>
          </select>
        </div>
        <div className={styles.third}>
          <p className={styles.weathertitle}>이날의 날씨는</p>
          <p className={styles.weather}>{chooseweather((result as any)?.weather)}</p>
        </div>
        <div className={styles.fourth}>
          <p className={styles.contenttitle}>이날은 이런 하루를 보내셨군요.</p>
          {
          result?.imgurl == ''? null : <img className={styles.curimg} src={result?.imgurl} />
        }
          <div className={styles.contentinner}>
          <textarea onChange={handlelengthContent} value={lenContent} name='content' className={`${styles.content} ${styles.publicinput}`}/>
          </div>
        </div>

        <div className={styles.modifyinner}>
          <button type='submit' className={styles.modifyp}>✎ 수정완료</button>
          <Delbtn _id={(result as any)?._id} curuser={curuser} result={result as any} />
        </div>
      </form>
      <div style={{marginRight : 16}}>
      <Imgupload previmgurl = {result?.imgurl}/>
      </div>
    </div>
  )
}