'use client'

import { signIn, signOut } from "next-auth/react"
import styles from './Login.module.css'
import { FaArrowRightToBracket } from "react-icons/fa6"
import { useDispatch } from "react-redux"
import { changebackurl } from "@/src/store"

export default function Login() {
  const dispatch = useDispatch()
  return(
    <div>
      <button className={styles.login} onClick={() => { 
        dispatch(changebackurl(window.location.href))
        signIn()
         }} > 
        <FaArrowRightToBracket size='25'/>
      </button>
    </div>
  )
}