'use client'
import { useState } from 'react'
import styles from './page.module.css'


export default function Write() {

  return (
    <div className={styles.inner}>
      <form action="" method='post'>
        <div className={styles.first}>
          <p className={styles.addtitle}>오늘 하루의 제목</p>
          <input name='title' autoFocus className={`${styles.titleinput} ${styles.publicinput}`}/>
        </div>
        <div className={styles.second}>
          <p className={styles.feelingtitle}>오늘 하루의 기분</p>
          <div className={styles.emojiinner}>
            <p className={styles.emoji}>🤬</p>
            <p className={styles.emoji}>😭</p>
            <p className={styles.emoji}>🤕</p>
            <p className={styles.emoji}>🫨</p>
            <p className={styles.emoji}>🤯</p>
            <p className={styles.emoji}>🥳</p>
            <p className={styles.emoji}>🥰</p>
            <p className={styles.emoji}>🤑</p>
          </div>
        </div>
        <div className={styles.third}>
          <p className={styles.weathertitle}>오늘 하루의 날씨는</p>
          <p className={styles.weather}>☀️</p>
        </div>
        <div className={styles.fourth}>
          <p className={styles.contenttitle}>오늘 길었던 하루를 정리합시다.</p>
          <textarea name='content' className={`${styles.content} ${styles.publicinput}`}/>
          <button className={styles.submitbtn}type='submit'>저장</button>
        </div>
      </form>
    </div>
  )
}
