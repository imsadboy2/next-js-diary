import { changesearchdata } from "@/src/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './Search.module.css'
import Link from "next/link";

export default function Search({ data }:any) {
  const dispatch = useDispatch()
  const lastsearch =  useSelector((state:any)=> state.searchdata)
  const [searchTerm, setSerchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const handleSearch = (e:any) => {
    const term = e.target.value;
    setSerchTerm(term)


    const result = data.filter((item:any) => {
      return (
        item.title.includes(term) || item.content.includes(term)
      )
    })
    setSearchResult(result)
    dispatch(changesearchdata(result))
  }

  return (
    <div className={styles.searchinner}>
      <input
        type="text"
        placeholder="찾으실 내용,제목의 일부를 입력하세요"
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchbar}
      />
    <Link  href={'/searchlist/'+searchTerm}>
      <p  className={styles.searbtn} >검색</p>
    </Link>
    </div>
  )


}
