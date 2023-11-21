'use client'
import styles from './page.module.css';
import './globals.css'
import { FaPencil, FaBars } from "react-icons/fa6"
import { useState } from 'react';
import Link from 'next/link';



export default function Home() {
  const [mainbars,setMainbars] = useState(false);
  return (
    <div className={styles.articleinner}>
      <p className={styles.articletitle}>오늘의 이야기들</p>
      <p className={styles.article}>sdqqdwdqdw-ㅁㄴㅇㄹ호ㅓㅏㅣ</p>
      <p className={styles.article}>1234567890-ㅁㄴㅇㄹ호ㅓㅏㅣ</p>
      <p className={styles.article}>1234567890-ㅁㄴㅇㄹ호ㅓㅏㅣ</p>
      <p className={styles.article}>1234567890-ㅁㄴㅇㄹ호ㅓㅏㅣ</p>
      <p className={styles.article}>1234567890-ㅁㄴㅇㄹ호ㅓㅏㅣ</p>
      <p className={styles.article}>1234567890-ㅁㄴㅇㄹ호ㅓㅏㅣ</p>
      <p className={styles.article}>1234567890-ㅁㄴㅇㄹ호ㅓㅏㅣ</p>
      <p className={styles.article}>1234567890-ㅁㄴㅇㄹ호ㅓㅏㅣ</p>
      <p className={styles.article}>1234567890-ㅁㄴㅇㄹ호ㅓㅏㅣ</p>
      <p className={styles.article}>1234567890-ㅁㄴㅇㄹ호ㅓㅏㅣ</p>
      <Link href='/write'>
      <FaPencil className={styles.pencil} size="25" />
      </Link>
    </div>
  )
}
