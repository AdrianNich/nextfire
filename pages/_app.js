import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../lib/context'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firestore } from '../lib/firebase'
import { useUserData } from '../lib/hooks'
import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'

function MyApp({ Component, pageProps }) {
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const [username, setUsername] = useState(null)
  useEffect(() => {
    let unsubscribe

    if (user) {
      const ref = firestore.collection('users').doc(user.uid)
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username)
      })
    } else {
      setUsername(null)
    }
    return unsubscribe
  }, [user])
  return (
    <UserContext.Provider value={{ user, username }}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  )
}

export default MyApp
