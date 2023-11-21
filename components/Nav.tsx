import React from "react"
import styles from './Nav.module.css';
import {Inter} from 'next/font/google'
import Link from "next/link";


export default function Nav () {
  return(
    <div className={styles.inner}>
       <Link href='/'>
         <p className={styles.firstword} >하루끝.</p>
       </Link>
    </div>
  )
}