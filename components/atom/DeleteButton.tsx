import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode;
    onClick?: () => void;
}

const DeleteButton: React.FC<Props> = (props) => {
    const {children, onClick} = props;
  return (
    <button className=
        'text-md rounded-full bg-red-200 py-2 px-4 my-3 hover:bg-red-400'
        onClick={onClick}
    >
        {children}
    </button>
  )
}

export default DeleteButton