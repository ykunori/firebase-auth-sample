import type { NextPage } from 'next'
import {useCallback, useEffect, useState} from "react";
import {checkLogin, getAuth, signOut} from "../src/getAuth";

const Home: NextPage = () => {
  const [isLogin, setIsLogin] = useState(false)

  const onClickHandler = useCallback(async (e: any) => {
    const a = await signOut()
    console.log(a)
  }, [])

  useEffect(() => {
    (async  () => {

      const auth = getAuth();
      console.log(auth)
      const user = await checkLogin()
      setIsLogin(!!user)
    })()
  }, [])
  return (
    <div>
      <h1>index</h1>
      <p>
        {isLogin ? "ログイン" : '未ログイン'}
      </p>
      <button onClick={onClickHandler}>サインアウト</button>
    </div>
  )
}

export default Home
