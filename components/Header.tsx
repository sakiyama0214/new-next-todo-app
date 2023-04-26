import { useAuthContext } from '@/lib/context/AuthContext'
import { auth } from '@/lib/firebase'
import { Alert, Button } from '@mui/material'
import { signOut } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import PrimaryButton from './atom/PrimaryButton'

const Header = () => {

  const router = useRouter();
  const [IsLogin, setIsLogin] = useState(false);

  const handleLogout = (e: any) => {
    signOut(auth).then(() => {
      <Alert severity='success'>サインアウトしました</Alert>
      router.push('/Login');
    }).catch((error) => {
      <Alert severity='error'>ログアウトに失敗しました</Alert>
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setIsLogin(true) : router.push('/Login')
    })
  }, [])
  return (
    <>
      <div className='flex flex-row bg-teal-700'>
          <h2 className='text-white text-3xl font-bold p-3 basis-3/4'>TODO LIST</h2>
          { IsLogin ? (
          <div className='basis-1/4'>
              <span className='mr-4'>
                {/* <PrimaryButton> */}
                  <Link href='/'>Home</Link>
                {/* </PrimaryButton> */}
              </span>
              {/* <PrimaryButton> */}
                <Link href='/todos/create'>TODO作成</Link>
              {/* </PrimaryButton> */}
              <PrimaryButton
              onClick={handleLogout}
              >
                ログアウト
              </PrimaryButton>
          </div>
          ) : (
            <Button
              href='/Login'
              className='text-md rounded-full bg-teal-200 py-2 px-4 m-3 text-black ml-auto hover:bg-teal-400'
            >
              ログイン
            </Button>
          )}
      </div>
    </>
  )
}

export default Header