import type { NextPage } from 'next'
import {useCallback, useState} from "react";
import {signUp} from "../src/getAuth";

const Signup: NextPage = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const onChangeEmail = useCallback((e: any) => {
    setEmail(e.target.value)
  }, [])

  const onChangePassword = useCallback((e: any) => {
    setPassword(e.target.value)
  }, [])


  const signupHandler = useCallback(async () => {
    console.log(116, email, password)
    if (!email || !password) {
      return
    }

    await signUp(email, password);
  }, [email, password])

  return (
    <div>
      <h1>signup</h1>
      <input type="text" onChange={onChangeEmail}></input>
      <input type="password" onChange={onChangePassword}></input>
      <button onClick={signupHandler}>登録</button>

    </div>
  )
}

export default Signup
