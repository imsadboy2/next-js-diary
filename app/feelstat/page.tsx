import { connectDB } from '@/util/database'
import styles from './page.module.css'
import { ObjectId } from 'mongodb'
import Chart from '@/components/Chart'
import Link from 'next/link'
import { FaPencil } from 'react-icons/fa6'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Logout from '@/components/Logout'
import Login from '@/components/Login'




export default async function Feelstat() {
  let session = await getServerSession(authOptions)

  let db = (await connectDB).db('forum')
  let result = await db.collection('post').find().toArray()
  console.log(result)

  const feel = result.map((e, i) => { //모든게시물의 기분만 빼서 배열에 저장하고?
    return e.feeling
  })

  const cutarr = (arr: any[], target: string) => {
    return arr.reduce((count, element) => (element === target ? count + 1 : count), 0)
  } //각기분의 횟수를 셀수 있는 함수

  const anger = cutarr(feel, '🤬')
  const sad = cutarr(feel, '😭')
  const hurt = cutarr(feel, '🤕')
  const menbung = cutarr(feel, '🤯')
  const shy = cutarr(feel, '🫣')
  const celeb = cutarr(feel, '🥳')
  const love = cutarr(feel, '🥰')
  const wish = cutarr(feel, '🤩')

  console.log(anger, sad, hurt, menbung, shy, celeb, love, wish)

  const data = [
    {
      "id": "🤬",
      "label": "🤬 분노",
      "value": anger,
      "color": "hsl(89, 70%, 50%)"
    },
    {
      "id": "😭",
      "label": "😭 슬픔",
      "value": sad,
      "color": "hsl(8, 70%, 50%)"
    },
    {
      "id": "🤕",
      "label": "🤕 아픔",
      "value": hurt,
      "color": "hsl(358, 70%, 50%)"
    },
    {
      "id": "🤯",
      "label": "🤯 불안",
      "value": menbung,
      "color": "hsl(155, 70%, 50%)"
    },
    {
      "id": "🫣",
      "label": "🫣 창피함",
      "value": shy,
      "color": "hsl(235, 70%, 50%)"
    },
    {
      "id": "🥳",
      "label": "🥳 기쁨",
      "value": celeb,
      "color": "hsl(260, 70%, 50%)"
    },
    {
      "id": "🥰",
      "label": "🥰 사랑",
      "value": love,
      "color": "hsl(235, 70%, 50%)"
    },
    {
      "id": "🤩",
      "label": "🤩 소망",
      "value": wish,
      "color": "hsl(235, 70%, 50%)"
    },
  ]

  return (
    <div>
      <div className={styles.inner}>
        <Chart data={data} />
        {
          session ? <Logout /> : <Login />
        }
        <Link href={`${session ? '/write' : '/signin'}`}>
          <FaPencil className={styles.pencil} size="25" />
        </Link>
      </div>
    </div>
  )
}
