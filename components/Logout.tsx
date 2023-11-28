'use client'

import { signIn, signOut } from "next-auth/react"
import styles from './Login.module.css'
import { FaArrowRightFromBracket, FaPersonWalkingDashedLineArrowRight} from "react-icons/fa6"

export default function Logout() {
  return(
    <div>
      <button className={styles.login} onClick={() => { signOut() }} > 
        <FaPersonWalkingDashedLineArrowRight size='25'/>
      </button>
    </div>
  )
}