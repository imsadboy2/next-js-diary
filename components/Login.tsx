'use client'
import { signIn } from "next-auth/react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { changebackurl } from "@/src/store";
import { useEffect, useState } from "react";
import styles from './Login.module.css';

export default function Login() {
  const [scrollY, setScrollY] = useState(0);
  const dispatch = useDispatch();
  const viewsize = window.innerWidth

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  // scrollY 값에 따라 opacity 계산
  const maxScroll = 288;
  const baseOpacity = 1;
  const calculatedOpacity = Math.max(baseOpacity - scrollY / maxScroll, 0);

  return (
    <div>
      <button 
        className={`${styles.login} ${scrollY >= maxScroll ? styles.kill : ''}`} 
        style={{ opacity: calculatedOpacity }}
        onClick={() => { 
          dispatch(changebackurl(window.location.href));
          signIn();
        }}
      >
        <FaArrowRightToBracket
         size={viewsize >= 1450 ? '35' : '25'}
         />
      </button>
    </div>
  );
}
