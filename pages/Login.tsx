import { useAuthContext } from '@/lib/context/AuthContext'
import { useRouter } from 'next/router';
import { Alert, Container, InputLabel, Snackbar, TextField } from '@mui/material';

import React, { useState } from 'react'
import PrimaryButton from '@/components/atom/PrimaryButton';
import { async } from '@firebase/util';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import Header from '@/components/Header';

const Login = () => {
    const { user } = useAuthContext();
    const isLoggedIn = !!user;
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = async () => {
      await router.push('/');
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.currentTarget.value);
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/')
      } catch(err) {
        alert('メールアドレスまたはパスワードが間違っています');
      }
    }

  return (
    <div>
        <Snackbar
          open={isLoggedIn}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          autoHideDuration={3000}
          onClose={handleClose}
        >
            <Alert onClose={handleClose} severity='warning'>すでにログインしています</Alert>
        </Snackbar>
        <Snackbar
        open={!isLoggedIn}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
      >
        <Alert severity="warning">ログインしてください</Alert>
      </Snackbar>
      <Container>
        <h2 className='my-3'>ログイン</h2>
        <form>
          <div>
            <InputLabel>メールアドレス</InputLabel>
            <TextField
              name='email'
              type='email'
              size='small'
              onChange={handleChangeEmail}
            />
          </div>
          <div>
            <InputLabel>パスワード</InputLabel>
            <TextField
              name='password'
              type='password'
              size='small'
              onChange={handleChangePassword}
            />
          </div>
          <div>
            <PrimaryButton onClick={handleSubmit}>ログイン</PrimaryButton>
          </div>
          <div>
            ユーザー登録は
            <Link href={'/SignUp'}>こちら</Link>
            から
          </div>
        </form>
      </Container>
    </div>
  )
}

export default Login