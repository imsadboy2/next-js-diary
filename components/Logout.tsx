'use client'

import { signIn, signOut } from "next-auth/react"
import styles from './Logout.module.css'
import { FaArrowRightFromBracket, FaPersonWalkingDashedLineArrowRight} from "react-icons/fa6"
import { useEffect, useState } from "react";

export default function Logout() {
  const viewsize = typeof window !== 'undefined' ? window.innerWidth : 1440;
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
    <div>
      <button className={`${styles.logout} ${scrollY >= maxScroll ? styles.kill : ''}`} 
        style={{ opacity: calculatedOpacity }}
       onClick={() => { signOut({ redirect: true, callbackUrl: '/' }) }} > 
        <FaPersonWalkingDashedLineArrowRight 
        size={viewsize >= 1450 ? '35' : '25'}
        />
      </button>
    </div>
  )
}