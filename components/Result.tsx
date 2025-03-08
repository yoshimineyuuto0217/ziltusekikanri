"use client"

import { DocumentData } from "firebase/firestore";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import React, { useCallback, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { handleDelete } from "@/utils/handleDelete";

type ResultProps = {
  searchResults: DocumentData[];
  setSearchResults: React.Dispatch<React.SetStateAction<DocumentData[]>>;
};

const Result: React.FC<ResultProps> = ({ searchResults ,setSearchResults}) => {

  // 並びかえ
  const sortedResults = [...searchResults].sort((a, b) => {
    const dateA = a.month ? new Date(a.month.seconds * 1000) : new Date(0);
    const dateB = b.month ? new Date(b.month.seconds * 1000) : new Date(0);
    return dateB.getTime() - dateA.getTime(); // 新しい日付が先頭になるように
  });
  
  const [itemOffset, setItemOffset] = useState(0);

  // ページネーション処理
  const itemPerPage = 10;
  const endOffset = itemOffset + itemPerPage;
  const currentItems = sortedResults.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sortedResults.length / itemPerPage);

  // ページ切り替え時の処理
  const handlePageClick: ReactPaginateProps["onPageChange"] = (event) => {
    const newOffset = (event.selected * itemPerPage) % sortedResults.length;
    setItemOffset(newOffset);
  };
   // utilsでかいてるhandleDeleteをonDeleteで囲む
  // 削除処理（削除後に即時反映）
  const onDelete = useCallback(
    async (docId: string , name: string , id: number) => {
      await handleDelete(docId, name , id);
      setSearchResults((prevResults) => prevResults.filter((item) => item.docId !== docId));
    },
    [setSearchResults]
  );
  
  return (
    <div className="overflow-hidden overflow-x-auto md:overflow-visible">
      <table className="sm:m-auto w-[1000px] m-4 ">
        <thead>
          <tr className="bg-blue-200">
            <th className="w-[4%] border-r border-black">ID</th>
            <th className="w-[13%]">製品名</th>
            <th className="w-[15%]">生産日</th>
            <th className="w-[9%]">生産数</th>
            <th className="w-[9%]">重量</th>
            <th className="w-[10%]">厚み</th>
            <th className="w-[10%]">焼成温度</th>
            <th className="w-[25%]">備考欄</th>
            <th className="w-[5%]">削除</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((result) => (
            <tr key={result.uniqueKey ?? result.id }>
              <td className="border-r border-black text-center">{result.id}</td>
              <td className="text-center">{result.name}</td>
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
              <td className="text-center" onClick={() => onDelete(result.docId , result.name , result.id)}><DeleteIcon className="text-gray-500 hover:text-gray-800"/></td>
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

