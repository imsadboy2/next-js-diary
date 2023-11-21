'use client'
import styles from './Sidemenu.module.css';
import { FaPencil, FaBars } from "react-icons/fa6"
import { useState } from 'react';
import Link from 'next/link';


export default function Sidemenu() {
  const [mainbars,setMainbars] = useState(false);
  return (
    <div className={styles.articleinner}>
      <div className={`${styles.mainmenu} ${mainbars? styles.open : ''}`}>
        <ul className={styles.inmenu}>
          <li className={styles.menulist}>My Page</li>
          <li className={styles.menulist}>My Page</li>
        </ul>
      </div>
      <FaBars onClick={() => {setMainbars(!mainbars)}} className={`${styles.bars} ${mainbars? styles.open : ''}`} size='25'/>
    </div>
  )
}
