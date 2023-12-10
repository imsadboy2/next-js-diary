'use client'
import { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import styles from './Sidemenu.module.css';
import Link from 'next/link';
import { SessionProvider, useSession } from 'next-auth/react';

export default function Sidemenu() {
  const [mainbars, setMainbars] = useState(false);
  const menuRef = useRef<any>(null);
  const session = useSession();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleClickOutside = (e:MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMainbars(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mainbars]);

  const handlemypage = (e:any) => {
    if(session.data == undefined || null) {
      e.preventDefault()
      alert('로그인 후에 마이페이지를 이용하실 수 있습니다.')
    }
  }



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

  return (
    <div className={styles.menuinner}>
      <div className={`${styles.mainmenu} ${mainbars ? styles.open : ''} `} ref={menuRef}>
        <p className={styles.menutitle}>- MENU -</p>
        <ul className={styles.inmenu}>
          <Link href={'/mypage/'+ session.data?.user?.email}>
            <li 
            onClick={(e) => {
              handlemypage(e)
              setMainbars(!mainbars)
            } }
            className={styles.menulist}>My Page</li>
          </Link>
         <Link href={'/allpost'}>
          <li 
          onClick={() => setMainbars(!mainbars)}
          className={styles.menulist}>전체 글보기</li>
          </Link>
          <Link href={'/feelstat'}>
            <li 
            onClick={() => setMainbars(!mainbars)}
            className={styles.menulist}>기분별 일기 현황</li>
          </Link>
          <Link href={'/about'}>
            <li 
            onClick={() => setMainbars(!mainbars)}
            className={styles.menulist}>about</li>
          </Link>
        </ul>
      </div>
      <FaBars
        onClick={() => setMainbars(!mainbars)}
        style={{ opacity: calculatedOpacity }}
        className={`${styles.bars} ${mainbars ? styles.open : ''} ${scrollY >= maxScroll ? styles.kill : ''}`}
        size='25'
      />
    </div>
  );
}
