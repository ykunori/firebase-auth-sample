import Link from 'next/link';

export const Header = () => {
  return (
    <div>
      <p>menu</p>
      <ul>
        <li>
          <Link href="/">/</Link>
        </li>
        <li>
          <Link href="/signin">signin</Link>
        </li>
        <li>
          <Link href="/signup">signup</Link>
        </li>
        <li>
          <Link href="/updateEmail">updateEmail</Link>
        </li>
         <li>
          <Link href="/updatePassword">updatePassword</Link>
        </li>
        <li>
          <Link href="/resetPassword">resetPassword</Link>
        </li>
      </ul>
    </div>

  )

}