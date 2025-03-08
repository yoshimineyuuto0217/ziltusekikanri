"use client";

import React, { useEffect, useState } from "react";


import { db } from "@/lib/firebase";
import { collection, DocumentData, getDocs,} from "firebase/firestore";
import Result from "@/components/Result";
import { handleSearch } from "@/utils/handleSearch";

const Search = () => {
  const [name, setName] = useState("");
  const [search, setSearch] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "registr"));
        const results = querySnapshot.docs.map((doc) => ({
          docId : doc.id,
          ...doc.data(),
          uniqueKey: `${doc.data().name}-${doc.data().id}`, // name + id を組み合わせてキーを一意にする 自分で組み合わせて作る
        }));
        setSearch(results);
      } catch (error) {
        console.error("Error fetching all data: ", error);
      }
    };
    fetchAllData();
  }, []);

  return (
    <>
      <h1 className="text-center text-[2.5em] mb-5">実績検索・削除</h1>
      <div className="bg-gray-200 py-10 px-5 sm:max-w-[800px]  w-[90%] m-auto mb-20">
        <div className="sm:flex mb-5 m-auto w-[100%] ">
          <label htmlFor="name" className="sm:w-[15%] w-[100%] text-center ">
            製品名
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="製品名を入れてください"
            className="sm:w-[85%] w-[100%]"
          />
        </div>
        <button
          type="submit"
          className=" w-[100%] bg-blue-500  p-3 hover:bg-blue-600 transition"
          onClick={()=>handleSearch(name,setSearch)}
        >
          検索
        </button>
      </div>
      <div>
        <Result searchResults={search} setSearchResults={setSearch} />
      </div>
    </>
  );
};

export default Search;

;

