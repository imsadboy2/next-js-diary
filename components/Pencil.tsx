'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import styles from './Pencil.module.css'
import { useSession } from "next-auth/react";

export default function Pencil() {
  const session = useSession()
  const viewsize = window.innerWidth

  const [scrollY, setScrollY] = useState(0);

const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  const maxScroll = 288;
  const baseOpacity = 1;
  const calculatedOpacity = Math.max(baseOpacity - scrollY / maxScroll, 0);

  console.log(session)

  return(
    <Link href={`${session.data !== null || undefined ? '/write' : '/signin'} `}>
      <FaPencil 
      style={{opacity : calculatedOpacity}}
      className={`${styles.pencil} ${scrollY >= maxScroll ? styles.kill : ''}`}
      size={viewsize >= 1450 ? '35' : '25'}
       />
    </Link>
  )
}