"use client"
import axios, { AxiosRequestConfig } from 'axios'
import styles from './Delbtn.module.css'
import { useRouter } from 'next/navigation';

export default function Delbtn(props:any) {
  let router = useRouter()

  // const requestConfig: AxiosRequestConfig = {
  //   data: {
  //     _id: props._id
  //   },

  // };

  return(
    <div>
     <button onClick={(e)=>{
      e.preventDefault()
      // axios.delete('/api/delete',requestConfig)
      fetch('/api/delete',{
        method:'DELETE',
        body: props._id
      }).then((result)=>{
        router.push('/')
      }).then(()=>{
        router.refresh()
      })
     }} className={styles.modifyp}>삭제 ⌫</button>
    </div>
  )
}


