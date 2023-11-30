
import styles from './page.module.css';
import './globals.css'
import { FaPencil, FaBars } from "react-icons/fa6"
import Link from 'next/link';
import {connectDB} from '../util/database'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Login from '@/components/Login';
import Logout from '@/components/Logout';



export default async function Home() {

  let session = await getServerSession(authOptions)

  let client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('post').find().toArray();
  let copy = [...result]
  let revers = copy.sort((a,b)=> b.srtfordate - a.srtfordate)


  return (
    <div className={styles.articleinner}>
      {
        session? <Logout/>  : <Login/>
      }
      <p className={styles.articletitle}>오늘의 이야기들</p>
      {
        revers.map((e, i)=>{
          return(
            <Link key={i} href={`detail/${revers[i]._id}`}>
              <p className={styles.article}> {e.title} </p>
            </Link>
          )
        })
      }
      <Link  href={`${session? '/write' : '/signin'}`}>
       <FaPencil className={styles.pencil} size="25" />
      </Link>
    </div>
  )
}
