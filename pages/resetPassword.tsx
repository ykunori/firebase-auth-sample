import type { NextPage } from 'next'
import {useCallback, useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import {resetPassword, updateEmail} from "../src/getAuth";

const UpdateEmail: NextPage = () => {
  const [email, setEmail] = useState(null)

  const onChangeEmail = useCallback((e: any) => {
    setEmail(e.target.value)
  }, [])


  const resetPasswordHandler = useCallback(async () => {
    console.log(116, email)
    if (!email) {
      return
    }

    await resetPassword(email);
  }, [email])

  return (
    <div>
      <h1>reset password</h1>
      <input type="text" onChange={onChangeEmail}></input>
      <button onClick={resetPasswordHandler}>パスワードをリセットする</button>

    </div>
  )
}

export default UpdateEmail
