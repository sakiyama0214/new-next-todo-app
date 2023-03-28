import React, {useState, useEffect} from 'react'
import Header from "@/components/Header";
import Head from "next/head";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { async } from '@firebase/util';
import Link from 'next/link';

export type Todo = {
  title: string;
  body: string;
  status: string;
  id: string;
}

export const status = (status: string) => {
  return (status == 'notStarted' ? '未着手' : status == 'inProgress' ? '作業中' : '完了')
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])

  // setTodosにデータを追加
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    onSnapshot(q, async (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => {
          return {
            title: doc.data().title as string,
            body: doc.data().body as string,
            status: doc.data().status as string,
            id: doc.id
          }
        })
      )
    })
    const filteringTodos = () => {
      switch (filter) {
        case 'notStarted':
          setFilteredTodos(todos.filter((todo) => todo.status === 'notStarted'));
          break;
        case 'inProgress':
          setFilteredTodos(todos.filter((todo) => todo.status === 'inProgress'));
          break;
        case 'done':
          setFilteredTodos(todos.filter((todo) => todo.status === 'done'));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  },[filter, todos])

  return (
    <>
      <Head>
        <title>TODO LIST</title>
      </Head>
      <Header />
      <div className="text-center">
        <h2 className="text-3xl font-bold mt-10">TODOリスト</h2>
        <div className='flex justify-center my-6'>
          <h3 className='text-xl mr-5'>ソート</h3>
          <select
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className='rounded-md text-xl'
          >
            <option value='all'>全て</option>
            <option value='notStarted'>未着手</option>
            <option value='inProgress'>作業中</option>
            <option value='done'>完了</option>
          </select>
        </div>
        
        <div>
          <table className='border-collapse m-auto mt-6 border-spacing-10'>
            <thead>
              <tr>
                <th className='text-xl font-bold pr-20'>タイトル</th>
                <th className='text-xl font-bold pr-20'>内容</th>
                <th className='text-xl font-bold'>ステータス</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.map((todo: Todo) => {
                  const todoInfo = {id: todo.id, title: todo.title, body: todo.body, status: todo.status}
                  return (
                    <tr key={todo.id} className='h-20'>
                      <td className='text-xl pr-20 hover:text-blue-400'>
                        <Link href={{ pathname: `/todos/${todo.id}`, query: todoInfo}}>
                          {todo.title}
                        </Link>
                      </td>
                      <td className='text-xl pr-20'>{todo.body}</td>
                      <td className='text-xl'>{status(todo.status)}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          <ul>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Home;