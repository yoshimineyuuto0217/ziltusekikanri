import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

const page = () => {
  return (
    <div className='flex justify-around w-[1000px] m-auto'>
        <div className="w-[300px] bg-blue-500 h-[500px] flex flex-col items-center justify-center hover:bg-blue-600"><h2 className='text-center text-[1.8em]'>実績登録</h2> <div><ExitToAppIcon style={{ fontSize: '6em'}} /></div></div>
        <div className="w-[300px] bg-blue-500 h-[500px] flex flex-col items-center justify-center  hover:bg-blue-600"><h2 className='text-center text-[1.8em]'>実績検索</h2><div><SearchIcon style={{ fontSize: '6em'}} /></div></div>
        <div className="w-[300px] bg-blue-500 h-[500px] flex flex-col items-center justify-center hover:bg-blue-600"><h2 className='text-center text-[1.8em]'>実績削除</h2><div><DeleteIcon style={{ fontSize: '6em'}} /></div></div>
        </div>
  )
}

export default page