import type { NextPage } from 'next'
import {useCallback, useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import {updateEmail} from "../src/getAuth";

const UpdateEmail: NextPage = () => {
  const [email, setEmail] = useState(null)

  const onChangeEmail = useCallback((e: any) => {
    setEmail(e.target.value)
  }, [])


  const updateEmailHandler = useCallback(async () => {
    console.log(116, email)
    if (!email) {
      return
    }

    await updateEmail(email);
  }, [email])
  const auth = getAuth()
  console.log(auth.currentUser?.email, auth.currentUser?.emailVerified)

  return (
    <div>
      <h1>update email</h1>
      <input type="text" onChange={onChangeEmail}></input>
      <button onClick={updateEmailHandler}>メール更新する</button>

    </div>
  )
}

export default UpdateEmail
