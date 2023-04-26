import DeleteButton from '@/components/atom/DeleteButton';
import PrimaryButton from '@/components/atom/PrimaryButton';
import Header from '@/components/Header';
import { db } from '@/lib/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { status } from '../index';

export default function TodoDetail() {
    const router = useRouter();

    // データを削除
    const onClickDelete = async(id: string) => {
        const result = confirm('本当に削除しますか？');
        if (result) {
            const docRef = doc(db, 'todos', id);
        await deleteDoc(docRef);
        router.push('/');
        }
    }

    const todoInfo = {id: router.query.id, title: router.query.title, body: router.query.body, status: router.query.status}

    return (
        <>
            <div className='w-1/2 mx-auto'>
                <p className='text-2xl mt-10'>
                    <label className='mr-10'>タイトル :</label>
                    <span>{router.query.title}</span>
                </p>
                <br />
                <p className='text-2xl'>
                    <label className='mr-10'>内容 :</label>
                    <span>{router.query.body}</span>
                </p>
                <br />
                <p className='text-2xl'>
                    <label className='mr-10'>ステータス :</label>
                    <span>{status(router.query.status as string)}</span>
                </p>
            
                <br />
                <span className='mr-10'><PrimaryButton>
                    <Link href={{ pathname: `/todos/${router.query.id}/edit`, query: todoInfo}}>
                        編集する
                    </Link>
                </PrimaryButton></span>
                <DeleteButton onClick={() => onClickDelete(router.query.id as string)}>削除する</DeleteButton>
            </div>
        </>
    )
}