import type { NextPage } from 'next'
import {useCallback} from "react";
import { signOut} from "../src/getAuth";

const Home: NextPage = () => {

  const onClickHandler = useCallback(async (e: any) => {
    const a = await signOut()
    console.log(a)
  }, [])

  return (
    <div>
      <h1>index</h1>
      <button onClick={onClickHandler}>サインアウト</button>
    </div>
  )
}

export default Home
