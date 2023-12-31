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



export default function Mypost(props: any) {
  const session = useSession()


  const usermail = decodeURIComponent(props.params.id)

  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: any) => {
    setCurrentPage(page)
  }

  const params = {
    id: usermail
  }

  useEffect(() => {
    async function fetchData() {
      const hoi = await axios.get("/api/mypost", { params }).then((r: any) => {
        let copy = [...r.data]
        let revers: any = copy.sort((a, b) => b.srtfordate - a.srtfordate)
        setData(revers)
      }).then()
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
      <p className={styles.articletitle}>나의 이야기들</p>
      <Pagination
        data={data}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
      <Search data={data} />
    </div>
  )
}
