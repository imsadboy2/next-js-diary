'use client'

import { signIn, signOut } from "next-auth/react"
import styles from './Login.module.css'
import { FaArrowRightToBracket } from "react-icons/fa6"

export default function Login() {
  return(
    <div>
      <button className={styles.login} onClick={() => { signIn() }} > 
        <FaArrowRightToBracket size='25'/>
      </button>
    </div>
  )
}