'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import styles from './ModiComment.module.css'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function ModiComment(props: any) {
  const router = useRouter()

  const session = useSession();

  const [comment, setComment] = useState('')
  const [loadcmt, setLoadcmt] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const [modifycmt, setModifycmt] = useState('')

  useEffect(() => {
    fetch('/api/comment?id=' + props._id)
      .then(r => r.json())
      .then((result) => {
        setLoadcmt(result)
        const temp = result.find((i: { _id: any; }) => i._id == props.cmtid)
        setModifycmt(temp?.content)
      })

  }, [shouldRefresh])

  const exhandlelengthContent = (e:ChangeEvent<HTMLTextAreaElement>) => {
    const maxLength = 300;
    const inputValue = e.target.value;
    
    if (inputValue.length > maxLength) {
      alert(`댓글은 300자를 넘어갈 수 없습니다.`)
      setComment(inputValue.substring(0, maxLength))
    } else {
      setComment(inputValue)
    }
  }
  const newhandlelengthContent = (e:ChangeEvent<HTMLTextAreaElement>) => {
    const maxLength = 300;
    const inputValue = e.target.value;
    
    if (inputValue.length > maxLength) {
      alert(`댓글은 300자를 넘어갈 수 없습니다.`)
      setModifycmt(inputValue.substring(0, maxLength))
    } else {
      setModifycmt(inputValue)
    }
  }

  return (
    <div>
      {
        session.data !== null ?
          <div>
            <div className={styles.addcommentinner}>
              <p className={styles.addcmtwriter}>{session.data?.user?.email}</p>
              <textarea
                value={comment}
                onChange={exhandlelengthContent}
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
                {
                  e._id == props.cmtid?
                   <textarea 
                   value={modifycmt}
                   onChange={newhandlelengthContent} 
                   className={styles.newcmt}></textarea>
                   :               
                  <p className={styles.excomment}>
                   {e.content}
                   </p>
                }

                  <button
                    className={`${styles.modicmt} ${styles.newmodicmt}`}
                    style={{display: `${
                    e._id == props.cmtid? 'block' : 'none'
                      }`}}
                    onClick={(ev)=>{
                      modifycmt !== '' ?
                      fetch('/api/comment',
                      { method: 'PUT', body: JSON.stringify({ modifycmt: modifycmt, _id: e._id }) })
                      .then(()=>{
                        alert('댓글이 수정되었습니다.')
                      }).then(()=>{
                        router.push(`/detail/${props._id}`)
                      })
                      :
                      alert('빈 댓글 내용은 작성하실 수 없습니다.')
                    }
                  }
                  >✎ 수정완료</button>
                <button
                  style={{display: `${
                    e._id == props.cmtid? 'block' : 'none'
                }`}}
                  className={styles.delcmt}
                  onClick={()=>{
                    fetch('/api/comment',
                    { method: 'DELETE', body: JSON.stringify({ _id: e._id })}
                  ).then(()=>{
                    setShouldRefresh(!shouldRefresh);
                    alert('댓글이 삭제되었습니다.')
                    router.push(`/detail/${props._id}`)
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

