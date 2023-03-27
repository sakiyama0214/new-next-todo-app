import Link from 'next/link'
import React from 'react'
import PrimaryButton from './atom/PrimaryButton'

const Header = () => {
  return (
    <div className='flex flex-row bg-teal-700'>
        <h2 className='text-white text-3xl font-bold p-3 basis-3/4'>TODO LIST</h2>
        <div className='basis-1/4'>
            <span className='mr-4'><PrimaryButton ><Link href='/'>Home</Link></PrimaryButton></span>
            <PrimaryButton><Link href='/todos/create'>TODO作成</Link></PrimaryButton>
        </div>
    </div>
  )
}

export default Header