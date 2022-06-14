import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'

export default function Navbar() {
  const { user, username } = useContext(UserContext)
  const router = useRouter()

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log(username)
        router.reload
      })
      .catch((error) => {
        console.log(error)
      })
    // console.log('sign out')
    // auth.signOut(auth)
    // router.reload()
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button>FEED</button>
          </Link>
        </li>
        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
              <button onClick={signOut}>Sign Out</button>
            </li>
            <li className="push-left">
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <a>
                  <Image
                    src={user?.photoURL || '/hacker.png'}
                    alt="profile pic"
                    width={50}
                    height={50}
                  />
                </a>
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
