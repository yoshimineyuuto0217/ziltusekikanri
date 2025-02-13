"use client"

import { DocumentData } from "firebase/firestore";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { handleDelete } from "@/utils/handleDelete";

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
  const handlePageClick: ReactPaginateProps["onPageChange"] = (event) => {
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
            <th className="w-[30%]">備考欄</th>
            <th className="w-[10%]">削除</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((result) => (
            <tr key={result.id}>
              <td className="border-r border-black text-center">{result.id}</td>
              <td className="text-center">
              {/* toLocaleDateStringだとCSRの時間使うのでISOで統一 */}
                {/* {result.month
                  ? new Date(result.month.seconds * 1000).toLocaleDateString("ja-JP")
                  : "不明"} */}
                {result.month
                  ? (() => {
                      const date = new Date(result.month.seconds * 1000);
                      return (
                        <span suppressHydrationWarning>
                          {date && !isNaN(date.getTime()) ? date.toISOString().split("T")[0] : "不明"}
                        </span>
                      );
                    })()
                  : "不明"}
              </td>
              
              <td className="text-center">{result.production}</td>
              <td className="text-center">{result.weight}</td>
              <td className="text-center">{result.height}</td>
              <td className="text-center">{result.temperature}c°</td>
              <td className="text-center">{result.comment}</td>
              <td className="text-center" onClick={() => handleDelete(result.id , result.name)}><DeleteIcon/></td>
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

