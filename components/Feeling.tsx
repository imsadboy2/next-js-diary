'use client'
import { useEffect, useState } from 'react'
import styles from './Feeling.module.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { changeFeel } from '@/src/store'

export default function Feeling(props:any) {

  let dispatch = useDispatch()
  let feeel = useSelector((state)=>state)

  const [feeling, setFeeling] = useState(props.exfeel)

  const handleEmojiClick = (emoji:string) => {
    if (feeling === emoji) {
      setFeeling('');
    } else {
      setFeeling(emoji);
    }
    dispatch(changeFeel(emoji))
  };

  return (
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
  )
}
