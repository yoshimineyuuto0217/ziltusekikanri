"use client"

import { DocumentData } from "firebase/firestore";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import React, { useState } from "react";

type ResultProps = {
  searchResults: DocumentData[];
};

const Result: React.FC<ResultProps> = ({ searchResults }) => {
  // IDを基準に降順ソート
  const sortedResults = [...searchResults].sort((a, b) => b.id - a.id);
  
  const [itemOffset, setItemOffset] = useState(0);

  // ページネーション処理
  const itemPerPage = 10;
  const endOffset = itemOffset + itemPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = sortedResults.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sortedResults.length / itemPerPage);

  // ページ切り替え時の処理
  const handlePageClick:ReactPaginateProps["onPageChange"] = (event) => {
    const newOffset = (event.selected * itemPerPage) % sortedResults.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="overflow-hidden overflow-x-auto md:overflow-visible">
      <table className="sm:m-auto w-[1000px] m-4 ">
        <thead>
          <tr className="bg-blue-200">
            <th className="w-[5%] border-r border-black">ID</th>
            <th className="w-[15%]">生産日</th>
            <th className="w-[10%]">生産数</th>
            <th className="w-[10%]">重量</th>
            <th className="w-[10%]">厚み</th>
            <th className="w-[10%]">焼成温度</th>
            <th className="w-[40%]">備考欄</th>
          </tr>
        </thead>
        <tbody >
          {currentItems.map((result) => (
            <tr key={result.id}>
              <td className="border-r border-black text-center">{result.id}</td>
              <td className="text-center">
                {result.month
                  ? new Date(result.month.seconds * 1000).toLocaleDateString("ja-JP")
                  : "不明"}
              </td>
              <td className="text-center">{result.production}</td>
              <td className="text-center">{result.weight}</td>
              <td className="text-center">{result.height}</td>
              <td className="text-center">{result.temperature}c°</td>
              <td className="text-center">{result.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-10 ">
      {/* ページネーション */}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="flex justify-center gap-5 "
      />
    </div>
    </div>
  );
};

export default Result;


// import { DocumentData } from "firebase/firestore";
// import ReactDOM from 'react-dom';
// import ReactPaginate from 'react-paginate';
// import React, { useState } from "react";

// type ResultProps = {
//   searchResults: DocumentData[];
//   itemPerPage: number;
// };

// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const Result: React.FC<ResultProps> = ({ searchResults, itemPerPage }) => {
//   const sortedResults = [...searchResults].sort((a, b) => {
//     // IDを基準に降順に並び替える
//     return b.id - a.id;
//   });
//   const [itemOffset, setItemOffset] = useState(0);

//   // Simulate fetching items from another resources.
//   // (This could be items from props; or items loaded in a local state
//   // from an API endpoint with useEffect and useState)
//   const endOffset = itemOffset + itemPerPage;
//   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//   const currentItems = items.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(items.length / itemPerPage);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event:any) => {
//     const newOffset = (event.selected * itemPerPage) % items.length;
//     console.log(
//       `User requested page number ${event.selected}, which is offset ${newOffset}`
//     );
//     setItemOffset(newOffset);
//   };
//   return (
//     <div className="overflow-hidden overflow-x-auto md:overflow-visible">
//       <table className="sm:m-auto w-[1000px] m-4">
//         <thead>
//           <tr className="bg-blue-200">
//             <th className="w-[5%] border-r border-black">ID</th>
//             <th className="w-[15%]">生産日</th>
//             <th className="w-[10%]">生産数</th>
//             <th className="w-[10%]">重量</th>
//             <th className="w-[10%]">厚み</th>
//             <th className="w-[10%]">焼成温度</th>
//             <th className="w-[40%]">備考欄</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* ここで無駄な改行入れない 無駄な改行によるwhitespaceerror出る */}
//           {/* tdタグの外で書いたことでwhitespaceエラー出てる */}
//           {sortedResults.map((result, index) => (
//             <tr key={index}>
//               <td className="border-r border-black text-center">{result.id}</td>
//               <td className="text-center">
//                 {
//                   result.month
//                     ? new Date(result.month.seconds * 1000).toLocaleDateString(
//                         "ja-JP"
//                       )
//                     : "不明" /* 生産日 */
//                 }
//               </td>
//               <td className="text-center">{result.production /* 生産数 */}</td>
//               <td className="text-center">{result.weight /* 重量 */}</td>
//               <td className="text-center">{result.height /* 厚み*/}</td>
//               <td className="text-center">
//                 {result.temperature /* 焼成温度 */}c°
//               </td>
//               <td className="text-center">{result.comment /* 備考欄 */}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div>
//       <Result searchResults={searchResults} />
//       <ReactPaginate
//         breaklabel="..."
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         renderOnZeroPageCount={null}
//       />
//       </div>
//     </div>
//   );
// };

// export default Result;