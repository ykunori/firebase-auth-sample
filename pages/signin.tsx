import type { NextPage } from 'next'
import {useCallback, useState} from "react";
import { signIn} from '../src/getAuth'

const Signin: NextPage = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const onChangeEmail = useCallback((e: any) => {
    setEmail(e.target.value)
  }, [])

  const onChangePassword = useCallback((e: any) => {
    setPassword(e.target.value)
  }, [])

  const login = useCallback(async (e: any) => {
    if (!email || !password) {
      return
    }

    await signIn(email, password)
  }, [email, password])

  return (
    <div>
      <h1>signin</h1>
      <input type="text" onChange={onChangeEmail}></input>
      <input type="password" onChange={onChangePassword}></input>
      <button onClick={login}>ログイン</button>
    </div>
  )
}

export default Signin
