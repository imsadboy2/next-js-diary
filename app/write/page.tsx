'use client'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import axios from 'axios'
import Image from 'next/image'
import { useSession } from 'next-auth/react'


export default function Write() {
  
  const session = useSession();

  let lat:number = 0
  let lon:number = 0
  
  const [writer, setWriter] = useState('')
  const [lenTitle, setLenTitle] = useState('')
  const [lenContent, setLenContent] = useState('')
  const [weather, setWeather] = useState('')
  const [feeling, setFeeling] = useState('')

  const apiKey = 'b351af10b00131f919055611a5849d9c';
  const city = 'Seoul'
  const country = 'KR'
  // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
         lat = position.coords.latitude;
         lon = position.coords.longitude;
      },
      (error) => {
        lat = 36.5194;
        lon = 127.5050;
      }
    );
  } else {
    console.error("Geolocation이 지원되지 않습니다.");
  }
  
  useEffect(()=>{

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then((res) => {
      setWeather(res.data.weather[0].main)
    }).catch((e)=>{
      console.log(e)
    })


    if(session) {
      setWriter(session.data?.user?.email || "")
     }

  },[session])


  const handleEmojiClick = (emoji:string) => {
    if (feeling === emoji) {
      setFeeling('');
    } else {
      setFeeling(emoji);
    }
  };

  function chooseweather(weather:string){
    switch(weather) {
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

function empcon (e: any) {
  if(lenTitle == '' || lenContent == '' || feeling == ''){
    alert("제목, 내용, 기분은 비워두실수 없습니다.")
    e.preventDefault()
  }
}



const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
const day = currentDate.getDate();
const hours = currentDate.getHours();
const tempminutes = currentDate.getMinutes();
const minutes = tempminutes < 10 ? `0${tempminutes}`: tempminutes
const second = currentDate.getSeconds();
const millisecond = currentDate.getMilliseconds();

const writedate = (`${year}-${month}-${day} ${hours}:${minutes}`);
const srtfordate = (`${year}-${month}-${day} ${hours}:${minutes}:${second}:${millisecond}`);



  return (
    <div className={styles.inner}>
      <form action="/api/write" method='post' onSubmit={(e)=>{empcon(e)}}>
        <input name='feeling' value={feeling} onChange={(e) => setFeeling(e.target.value)} style={{display: 'none'}}/>
        <input name='weather' defaultValue={weather}  style={{display: 'none'}}/>
        <input name='writer' defaultValue={writer}  style={{display: 'none'}}/>
        <input name='writedate' defaultValue={writedate}  style={{display: 'none'}}/>
        <input name='srtfordate' defaultValue={new Date(srtfordate).getTime()}  style={{display: 'none'}}/>
        <div className={styles.first}>
          <p className={styles.addtitle}>오늘 하루의 제목</p>
          <input onChange={handlelengthTitle} value={lenTitle} name='title' autoFocus className={`${styles.titleinput} ${styles.publicinput}`}/>
        </div>
        <div className={styles.second}>
          <p className={styles.feelingtitle}>오늘 하루의 기분</p>
          <div className={styles.emojiinner}>
            <p
                className={`${styles.emoji} ${feeling === '🤬' ? styles.selected : ''}`}
                onClick={() => handleEmojiClick('🤬')}
              >
                🤬
              </p>
            <p
              className={`${styles.emoji} ${feeling === '😭' ? styles.selected : ''}`}
              onClick={() => handleEmojiClick('😭')}
            >
              😭
            </p>
            <p
              className={`${styles.emoji} ${feeling === '🤕' ? styles.selected : ''}`}
              onClick={() => handleEmojiClick('🤕')}
            >
              🤕
            </p>
            <p
              className={`${styles.emoji} ${feeling === '🤯' ? styles.selected : ''}`}
              onClick={() => handleEmojiClick('🤯')}
            >
              🤯
            </p>
            <p
              className={`${styles.emoji} ${feeling === '🫣' ? styles.selected : ''}`}
              onClick={() => handleEmojiClick('🫣')}
            >
              🫣
            </p>
            <p
              className={`${styles.emoji} ${feeling === '🥳' ? styles.selected : ''}`}
              onClick={() => handleEmojiClick('🥳')}
            >
              🥳
            </p>
            <p
              className={`${styles.emoji} ${feeling === '🥰' ? styles.selected : ''}`}
              onClick={() => handleEmojiClick('🥰')}
            >
              🥰
            </p>
            <p
              className={`${styles.emoji} ${feeling === '🤩' ? styles.selected : ''}`}
              onClick={() => handleEmojiClick('🤩')}
            >
              🤩
            </p>

          </div>
        </div>
        <div className={styles.third}>
          <p className={styles.weathertitle}>오늘의 날씨는</p>
          <p className={styles.weather}>{chooseweather(weather)}</p>
        </div>
        <div className={styles.fourth}>
          <p className={styles.contenttitle}>오늘 길었던 하루를 정리합시다.</p>
          <textarea onChange={handlelengthContent} value={lenContent} name='content' className={`${styles.content} ${styles.publicinput}`}/>
          <button className={styles.submitbtn} type='submit'>저장</button>
        </div>
      </form>
    </div>
  )
}
