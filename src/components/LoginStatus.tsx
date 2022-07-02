import {useEffect, useState} from "react";
import {checkLogin, getAuth} from "../getAuth";

export const LoginStatus = () => {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    (async  () => {

      const auth = getAuth();
      const checkLogined = await checkLogin()
      setIsLogin(!!checkLogined)
    })()
  }, [])

  return (
    <div>
      <p>
        {isLogin ? "ログイン" : '未ログイン'}
      </p>
    </div>
  )

}