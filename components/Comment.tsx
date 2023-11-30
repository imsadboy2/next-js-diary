'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import styles from './Comment.module.css'
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Comment(props: any) {
  const router = useRouter()

  const session = useSession();

  const [comment, setComment] = useState('')
  const [loadcmt, setLoadcmt] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  interface CommentType {
    author: string;
    content: string;
  }

  useEffect(() => {
    fetch('/api/comment?id=' + props._id)
      .then(r => r.json())
      .then((result) => {
        setLoadcmt(result)
      })
  }, [shouldRefresh])

  const reqmodycmt = {
    comment: comment,
    _id: props._id
  }
  
  const handlelengthContent = (e:ChangeEvent<HTMLTextAreaElement>) => {
    const maxLength = 300;
    const inputValue = e.target.value;
    
    if (inputValue.length > maxLength) {
      alert(`댓글은 300자를 넘어갈 수 없습니다.`)
      setComment(inputValue.substring(0, maxLength))
    } else {
      setComment(inputValue)
    }
  }


  console.log(comment)
  console.log(comment !== '')
  return (
    <div>
      {
        session.data !== null ?
          <div>
            <div className={styles.addcommentinner}>
              <p className={styles.addcmtwriter}>{session.data?.user?.email}</p>
              <textarea
                value={comment}
                onChange={handlelengthContent}
                className={styles.addcomment}></textarea>

            </div>

            <button
              onClick={(e) => {
                comment !== ''?
                fetch('/api/comment',
                  { method: 'POST', body: JSON.stringify({ comment: comment, _id: props._id }) }
                ).then(()=>{
                  setShouldRefresh(!shouldRefresh);
                  setComment('')
                  setTimeout(()=>{
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  },100)
                })
                :
                alert('빈 댓글 내용은 작성하실 수 없습니다.')

              }
              }
              className={styles.addcmtbtn}>작성</button>
          </div>
          : null
      }

      {
        loadcmt.length > 0 ?
          loadcmt.map((e: any, i: any) => {
            return (
              <div key={i} className={styles.exsitedcmt}>
                <p className={styles.excmtwriter}>{e.author}</p>
                <p className={styles.excomment}>{e.content}</p>
                <Link style={{display: `${
                    session.data?.user?.email == e.author? 'block' : 'none'
                  }`}} 
                    href={{pathname:`/editcmt/${props._id}`,
                      query:{
                        cmtid: e._id
                      }
                  }}>
                  <button
                    className={styles.modicmt}
                    style={{display: `${
                    session.data?.user?.email == e.author? 'block' : 'none'
                  }`}}
                  >✎ 수정</button>
                </Link>

                <button
                  style={{display: `${
                  session.data?.user?.email == e.author? 'block' : 'none'
                }`}}
                  className={styles.delcmt}
                  onClick={()=>{
                    fetch('/api/comment',
                    { method: 'DELETE', body: JSON.stringify({ _id: e._id })}
                  ).then(()=>{
                    setShouldRefresh(!shouldRefresh);
                    alert('댓글이 삭제되었습니다.')
                  })
                  }}
                  >삭제 ⌫</button>
              </div>
            )
          })
          : null
      }

      

    </div>
  )
}

