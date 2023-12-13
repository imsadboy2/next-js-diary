"use client"
import axios, { AxiosRequestConfig } from 'axios'
import styles from './Modybtn.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Modybtn(props:any) {

  return(
    <Link href={`/edit/${props.result?._id}`}>
      <button onClick={(e) =>{
        if(props.curuser == props.result.writer) {
          null
        } else {
          e.preventDefault()
          alert("수정과 삭제는 본인만이 가능합니다.")
        }
      }} className={styles.modifyp}>✎ 수정</button>
    </Link>
  )
}


