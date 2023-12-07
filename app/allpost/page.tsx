"use client"
import styles from './page.module.css';
import { FaPencil, FaBars } from "react-icons/fa6"
import Link from 'next/link';
import { connectDB } from '../../util/database'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import ReactPaginate from 'react-paginate';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import Logout from '@/components/Logout';
import Login from '@/components/Login';



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

  console.log(session)

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
      <Search data={data} />
    </div>
  )
}
