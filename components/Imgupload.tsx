'use client'
import { ChangeEvent, useState } from 'react';
import { storage } from '../util/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux';
import { changeimgurl } from '@/src/store';
import styles from './Imgupload.module.css'

export default function Imgupload(props:any) {
  const [imageUrl, setImageUrl] = useState('')
  let imgurl = useSelector((state:any)=> state.imgurl)
  const dispatch = useDispatch()
  const date = new Date().getTime()



  const onChangeUpload = (e: ChangeEvent<HTMLInputElement>) => {

      if (e.target.files === null) {
        return
      }


      const imageRef = ref(storage, `images/${date}${e.target.files[0].name}`)
      uploadBytes(imageRef, e.target.files[0])
          .then((snapshot) => {
              getDownloadURL(snapshot.ref)
                  .then((url: string) => {
                      setImageUrl(url) 
                      dispatch(changeimgurl(url)) //글작성할 때 필요
                  });
          });
  };
  return (
    <div className={styles.imginner}>
     <input className={styles.imginput} type='file' onChange={onChangeUpload} />
     <img className={styles.curimg} src={`${imageUrl}`} width={100}/>
    </div>
  )
}

    
