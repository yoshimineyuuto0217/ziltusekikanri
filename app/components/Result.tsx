import { DocumentData } from "firebase/firestore";
import React from "react";

type ResultProps = {
  searchResults: DocumentData[]; // 親から渡されるデータの型を指定
};

const Result: React.FC<ResultProps> = ({ searchResults }) => {
  const sortedResults = [...searchResults].sort((a, b) => {
    // IDを基準に降順に並び替える 
    return b.id - a.id;
  });
  return (
    <div className="overflow-hidden overflow-x-auto md:overflow-visible">
      <table className="sm:m-auto w-[1000px] m-4">
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
        <tbody>
          {/* ここで無駄な改行入れない 無駄な改行によるwhitespaceerror出る */}
          {/* tdタグの外で書いたことでwhitespaceエラー出てる */}
          {sortedResults.map((result, index) => (
            <tr key={index}>
              <td className="border-r border-black text-center">{result.id}</td>
              <td className="text-center">{result.Production ?? "不明"/* 生産日 */}</td>
              <td className="text-center">{result.Production /* 生産数 */}</td>
              <td className="text-center">{result.weight /* 重量 */}</td> 
              <td className="text-center">{result.height /* 厚み*/}</td>
              <td className="text-center">{result.temperature /* 焼成温度 */}c°</td>
              <td className="text-center">{result.comment /* 備考欄 */}</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
