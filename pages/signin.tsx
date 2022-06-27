import type { NextPage } from 'next'
import {useCallback, useEffect, useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {getAuth, signIn} from '../src/getAuth'

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
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
      <input type="text" onChange={onChangeEmail}></input>
      <input type="password" onChange={onChangePassword}></input>
      <button onClick={login}>ログイン</button>
    </div>
  )
}

export default Signin
