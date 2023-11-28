"use client"
import axios, { AxiosRequestConfig } from 'axios'
import styles from './Delbtn.module.css'
import { useRouter } from 'next/navigation';

export default function Delbtn(props:any) {
  let router = useRouter()

  return(
    <div>
     <button onClick={(e)=>{
      if(props.curuser == props.result.writer) {
        e.preventDefault()

        fetch('/api/delete',{
          method:'DELETE',
          body: props._id
        }).then((result)=>{
          router.push('/')
        }).then(()=>{
          router.refresh()
        })
      } else {
        e.preventDefault()
        alert("글 수정, 삭제는 본인만이 가능합니다.")
      }





     }} className={styles.modifyp}>삭제 ⌫</button>
    </div>
  )
}


