import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';

const Main = () => {
  return (
    <div className='sm:flex justify-around w-[90%] m-auto gap-5'>
        <div className="w-[100%] mb-5 py-3 sm:w-[50%] bg-blue-500 sm:h-[500px] flex flex-col items-center justify-center hover:bg-blue-600"><Link href="/product/register"><h2 className='text-center sm:text-[1.8em] mt-5'>実績登録</h2> <div className='text-center p-20'><ExitToAppIcon style={{ fontSize: '5em'}} /></div></Link></div>
        <div className="w-[100%] mb-5 py-3 sm:w-[50%] bg-blue-500 sm:h-[500px] flex flex-col items-center justify-center  hover:bg-blue-600"><Link href="/product/search"><h2 className='text-center sm:text-[1.8em] mt-5'>実績検索・削除</h2><div className='text-center p-20'><SearchIcon style={{ fontSize: '5em'}} /></div></Link></div>
        </div>
  )
}

export default Main