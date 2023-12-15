"use client"
import styles from './page.module.css';
import { FaPencil } from "react-icons/fa6"
import Link from 'next/link';
import Login from '@/components/Login';
import Logout from '@/components/Logout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import { useDispatch, useSelector } from 'react-redux';



export default function Searchlist() {
  const dispatch = useDispatch()
  const session = useSession()
  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [cursearch, setCurSearch] = useState()
  const [allposts, setAllposts] = useState()

  const handlePageChange = (page: any) => {
    setCurrentPage(page)
  }

  const lastsearch = useSelector((state: any) => state.searchdata)//검색할 데이터..

  useEffect(() => {
    setData(lastsearch)//데이터에서 검색어로 거른 데이터...
  }, [data]) //종속성에 lastsearch까지 추가하면 실시간으로 렌더링되며 검색할 수 있으나, 내가 의도한 바는 아님 ㅇㅇ

  useEffect(() => {
    async function fetchData() {
      const hoi = await axios.get("/api/allpost").then((r: any) => {
        let copy = [...r.data]
        let revers: any = copy.sort((a, b) => b.srtfordate - a.srtfordate)
        setAllposts(revers)
      })
    }
    fetchData();

  }, [])


  return (
    <div className={styles.articleinner}>
      {
        session.data == undefined || null ? <Login />  :   <Logout />
      }
      <Link href={`${session ? '/write' : '/signin'}`}>
        <FaPencil className={styles.pencil} size="25" />
      </Link>
      <p className={styles.articletitle}>모든 이야기들</p>
      <Pagination
        data={data}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
      <Search
        data={allposts}
      />
    </div>
  )
}
