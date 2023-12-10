'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import styles from './Pencil.module.css'
import { useSession } from "next-auth/react";

export default function Pencil() {
  const session = useSession()

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
  return(
    <Link href={`${session.data ? '/write' : '/signin'} `}>
      <FaPencil 
      style={{opacity : calculatedOpacity}}
      className={`${styles.pencil} ${scrollY >= maxScroll ? styles.kill : ''}`}
       size="25" />
    </Link>
  )
}