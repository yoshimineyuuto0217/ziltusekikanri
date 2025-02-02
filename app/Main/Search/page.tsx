"use client"

import React, {useState } from 'react'
import Result from '../../components/Result'
import { db } from '@/lib/firebase'
import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore';

const Search = () => {
  const [name, setName] = useState("");
  const [search, setSearch] = useState<DocumentData[]>([]);

  const handleSearch = async () => {
    // 検索欄がからだった場合
    if (!name.trim()) return;

    try {
      const searchQuery = query(
        collection(db, "registr"),
        where("name", "==", name) 
      );

      const querySnapshot = await getDocs(searchQuery);
      const results = querySnapshot.docs.map(doc => doc.data());
      setSearch(results) // 結果を取得して状態にセット
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      <h1 className="text-center text-[2.5em] mb-5">実績検索</h1>
      <div className="bg-gray-200 py-10 px-5 sm:max-w-[800px]  w-[90%] m-auto mb-20">
        <div className="sm:flex mb-5 m-auto w-[100%] ">
          <label htmlFor="name" className="sm:w-[15%] w-[100%] text-center">製品名</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="製品名を入れてください" className="sm:w-[85%] w-[100%]"/>
        </div>
        <button type="submit" className=" w-[100%] bg-blue-500  p-3 hover:bg-blue-600 transition" onClick={handleSearch}>
          検索
        </button>
      </div>
      <div><Result searchResults={search}/></div>
    </>
  );
}

export default Search;
