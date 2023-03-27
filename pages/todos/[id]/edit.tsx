import PrimaryButton from '@/components/atom/PrimaryButton'
import Header from '@/components/Header'
import { db } from '@/lib/firebase'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, {useState} from 'react'

const edit = () => {
    const router = useRouter();

    const [editTodoTitle, setEditTodoTitle] = useState(router.query.title);
    const [editTodoBody, setEditTodoBody] = useState(router.query.body);
    const [editTodoStatus, setEditTodoStatus] = useState(router.query.status)

    const onClickEdit = async(id: string) => {
        const editRef = doc(db, 'todos', id);
        if (editTodoTitle !== '') {
            if (editTodoBody !== '') {
                await updateDoc(editRef, {
                    title: editTodoTitle,
                    body: editTodoBody,
                    status: editTodoStatus,
                });
                router.push('/');
            }
        }
        
    }
  return (
    <>
        <Header />
        <div className='container mx-auto mt-10'>
            <h2 className='text-3xl font-bold'>TODO 編集</h2>
            <input
                type='text'
                placeholder='タイトルを入力'
                value={editTodoTitle}
                onChange={(e) => setEditTodoTitle(e.target.value)}
                className='w-80 h-10 my-3 border-0 rounded-full pl-4'
            />
            <br />
            <textarea
                placeholder='内容を入力'
                value={editTodoBody}
                onChange={(e) => setEditTodoBody(e.target.value)}
                className='w-80 h-40 my-2 border-0 rounded-md pl-4 pt-2'
            />
            <br />
            <select
                value={editTodoStatus}
                onChange={(e) => setEditTodoStatus(e.target.value)}
            >
                <option value='notStarted'>未着手</option>
                <option value='inProgress'>作業中</option>
                <option value='done'>完了</option>
            </select>
            <br />
            <PrimaryButton onClick={() => onClickEdit(router.query.id as string)}>編集</PrimaryButton>
        </div>
    </>
  )
}

export default edit