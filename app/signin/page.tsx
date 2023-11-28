"use client";
import React, { useRef, useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import styles from './page.module.css'
import Image from 'next/image'

export default function Login() {

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className={styles.inner}>
        
        <div className={styles.btninner}>
          <button
            className={styles.btn}
            onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })}
          >
            구글 로그인 
            <img
            className={styles.logo}
            alt="google"
            src="../googlelogo.png"
            width={50}
            height={50}
            />
          </button>
        </div>
        <button
          className={styles.btn}
          onClick={() => signIn("kakao", { redirect: true, callbackUrl: "/" })}
        >
          카카오 로그인
          <img
            className={styles.logo}
            alt="google"
            src="../kakaologo.png"
            width={50}
            height={50}
            />
        </button>


        <button
          className={styles.btn}
          onClick={() => signIn("naver", { redirect: true, callbackUrl: "/" })}
        >
          네이버 로그인 
          <img
            className={styles.logo}
            alt="google"
            src="../naverlogo.png"
            width={50}
            height={50}
            />
        </button>
    </div>
  );
}
