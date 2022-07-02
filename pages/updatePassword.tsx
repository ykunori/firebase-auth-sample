import type { NextPage } from 'next'
import {useCallback, useState} from "react";
import {updatePassword} from "../src/getAuth";

const UpdateEmail: NextPage = () => {
  const [password, setPassword] = useState(null)

  const onChangePassword = useCallback((e: any) => {
    setPassword(e.target.value)
  }, [])


  const updatePasswordHandler = useCallback(async () => {
    console.log(116, password)
    if (!password) {
      return
    }

    await updatePassword(password);
  }, [password])

  return (
    <div>
      <h1>update password</h1>
      <input type="password" onChange={onChangePassword}></input>
      <button onClick={updatePasswordHandler}>パスワードを更新</button>

    </div>
  )
}

export default UpdateEmail
