
import styles from './page.module.css';
import './globals.css'
import Link from 'next/link';
import {connectDB} from '../util/database'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Login from '@/components/Login';
import Logout from '@/components/Logout';
import Pencil from '@/components/Pencil';



export default async function Home() {

  let session = await getServerSession(authOptions)

  let client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('post').find().toArray();
  let copy = [...result]
  let revers = copy.sort((a,b)=> b.srtfordate - a.srtfordate)
  let last = revers.slice(0,10)




  return (
    <div className={styles.articleinner}>
      <p className={styles.articletitle}>오늘의 이야기들</p>
      {
        last.map((e, i)=>{
          return(
            <Link key={i} href={`detail/${revers[i]._id}`}>
              <p className={styles.article}> {e.title.length > 30 ? e.title.slice(0,30) + ' ...' : e.title} </p>
            </Link>
          )
        })
      }
      {
        session == undefined || null ? <Login />  :   <Logout />
      }
      <Pencil/>
    </div>
  )
}
