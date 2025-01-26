import { DocumentData } from 'firebase/firestore';
import React from 'react'

type ResultProps = {
  searchResults: DocumentData[]; // 親から渡されるデータの型を指定
};

const Result: React.FC<ResultProps>  = ({searchResults}) => {
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
  {searchResults.map((result, index) => (
    <tr key={index} >
      <td className="border-r border-black text-center">{index + 1}</td>
      <td className='text-center'>  {result.month.toDate().toLocaleDateString()}</td> {/* 生産日 */}
      <td className='text-center'>{result.Production}</td> {/* 生産数 */}
      <td className='text-center'>{result.weight}</td> {/* 重量 */}
      <td className='text-center'>{result.height}</td> {/* 厚み (hight → heightに修正) */}
      <td className='text-center'>{result.temperature}</td> {/* 焼成温度 */}
      <td className='text-center'>{result.comment}</td> {/* 備考 */}
    </tr>
  ))}
</tbody>

    </table>
    </div>
  )
}

export default Result