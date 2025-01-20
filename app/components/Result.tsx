import React from 'react'

const Result = () => {
  return (
    <div className='overflow-hidden overflow-x-auto md:overflow-visible'>
    <table className='sm:m-auto w-[1000px] m-4'>
        <thead>
        <tr className='bg-blue-200'>
            <th className='w-[5%] border-r border-black'>ID</th>
            <th className='w-[15%]'>生産日</th>
            <th className='w-[10%]'>生産数</th>
            <th className='w-[10%]'>重量</th>
            <th className='w-[10%]'>厚み</th>
            <th className='w-[10%]'>焼成温度</th>
            <th className='w-[40%]'>備考欄</th>
        </tr>
        </thead>
        <tbody>
            <th className='border-r border-black'>1</th>
            <th>2024/01/15</th>
            <th>10000</th>
            <th>1500g</th>
            <th>10mm</th>
            <th>1600C°</th>
            <th>焼成温度にきおつけてください</th>
        </tbody>
    </table>
    </div>
  )
}

export default Result