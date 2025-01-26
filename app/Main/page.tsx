import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';

const Main = () => {
  return (
    <div className='sm:flex justify-around w-[90%] m-auto'>
        <div className="w-[100%] mb-5 py-3 sm:w-[calc(33.33%-20px)]  bg-blue-500 sm:h-[500px] flex flex-col items-center justify-center hover:bg-blue-600"><Link href="/Main/ProductRegister"><h2 className='text-center sm:text-[1.8em]'>実績登録</h2> <div className='text-center p-20'><ExitToAppIcon style={{ fontSize: '5em'}} /></div></Link></div>
        <div className="w-[100%] mb-5 py-3 sm:w-[calc(33.33%-20px)] bg-blue-500 sm:h-[500px] flex flex-col items-center justify-center  hover:bg-blue-600"><Link href="/Main/Search"><h2 className='text-center sm:text-[1.8em]'>実績検索</h2><div className='text-center p-20'><SearchIcon style={{ fontSize: '5em'}} /></div></Link></div>
        <div className="w-[100%] mb-5 py-3 sm:w-[calc(33.33%-20px)] bg-blue-500  sm:h-[500px] flex flex-col items-center justify-center hover:bg-blue-600"><Link href="/Main/Delete"><h2 className='text-center sm:text-[1.8em]'>実績削除</h2><div className='text-center p-20'><DeleteIcon style={{ fontSize: '5em'}} /></div></Link></div>
        </div>
  )
}

export default Main