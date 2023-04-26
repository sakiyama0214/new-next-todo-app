import Header from '@/components/Header'
import { useState, useEffect } from 'react'
import { AuthProvider } from '@/lib/context/AuthContext'
import { auth } from '@/lib/firebase'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [IsLogin, setIsLogin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setIsLogin(true) : router.push('/Login')
    })
  }, [])
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  )
}
