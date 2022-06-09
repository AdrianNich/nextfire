import { auth, googleAuthProvider } from '../lib/firebase'
import Image from 'next/image'

export default function Enter(props) {
  const user = null
  const username = null
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  )
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider)
  }
  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <Image src={'/google.png'} alt="google logo" width={50} height={50} />
      Sign In With Google
    </button>
  )
}

function SignOutButton() {
  return (
    <>
      <p>test</p>
      <button onClick={() => auth.signOut()}> Sign Out</button>
    </>
  )
}

function UsernameForm() {
  return null
}
