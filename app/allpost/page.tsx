"use client"
import styles from './page.module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import Logout from '@/components/Logout';
import Login from '@/components/Login';
import Pencil from '@/components/Pencil';



export default function Allpost() {
  const session = useSession()
  
  const [isse,setIsse] = useState(session)
  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(1)


  const handlePageChange = (page: any) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    async function fetchData() {
      const hoi = await axios.get("/api/allpost").then((r: any) => {
        let copy = [...r.data]
        let revers: any = copy.sort((a, b) => b.srtfordate - a.srtfordate)
        setData(revers)
      }).then()
    }
    fetchData();

    setIsse(session)
  }, [isse])



  return (
    <div className={styles.articleinner}>
      {
        session.data == undefined || null ? <Login />  :   <Logout />
      }
      <Pencil/>
      <p className={styles.articletitle}>모든 이야기들</p>
      <Pagination
        data={data}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
      <Search data={data} />
    </div>
  )
}
