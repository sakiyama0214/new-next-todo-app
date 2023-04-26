import PrimaryButton from '@/components/atom/PrimaryButton';
import { useAuthContext } from '@/lib/context/AuthContext';
import { auth } from '@/lib/firebase';
import { Container, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const SignUp = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const isLoggedIn = !!user;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = async() => {
    await router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch(err) {
      alert('メールアドレスまたはパスワードを適切に入力してください')
    }
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  return (
    <div>
      <Snackbar
        open={isLoggedIn}
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='warning'>すでにログインしています</Alert>
      </Snackbar>
      <Container>
        <h2 className='my-3'>ユーザー登録</h2>
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
            <PrimaryButton onClick={handleSubmit}>
              登録
            </PrimaryButton>
          </div>
        </form>
      </Container>
    </div>
  )
}

export default SignUp