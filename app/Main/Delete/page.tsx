"use client"

import { db } from "@/lib/firebase";
import { collection, deleteDoc,getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";

const Delete = () => {
  const [productname,setProductName] = useState("")
  const [id, setId] = useState<number | null>(null);
  const handleDelete = async(event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const Ref = collection(db, "registr");
      const req = query(Ref, where("name", "==", productname), where("id", "==", id));
      const snapshot = await getDocs(req);
      
      if (snapshot.empty) {
        window.confirm("その製品は存在しません")
        return;
      }
      // forEach ではなく for...of を使って非同期処理を待つ
      for (const doc of snapshot.docs) {
        await deleteDoc(doc.ref); // 各ドキュメントを削除
      }
      window.confirm(`製品：${productname} ID: ${id} を削除しました`);
      setId(null);
      setProductName("")
    } catch (error) {
      console.error("データ削除に失敗しました", error);
    }
  }
  return (
    <>
      <h1 className="text-center text-[2.5em] mb-5">新規削除</h1>
      <form action=""className="bg-gray-200 py-10 px-5 sm:max-w-[800px]  w-[90%] m-auto mb-5 " onSubmit={handleDelete}>
        <div className="sm:flex mb-5 m-auto w-[100%] ">
          <label
            htmlFor="name"
            className="sm:w-[15%] w-[100%] text-center "
          >
            製品名
          </label>
          <input
            type="name"
            id="name"
            name="name"
            placeholder="製品名を入れてください"
            className="sm:w-[85%] w-[100%]"
            required
            value={productname}
            onChange={(e)=> setProductName(e.target.value)}
          />
        </div>
        <div className="sm:flex mb-5 m-auto w-[100%]">
          <label
            htmlFor="name"
            className="sm:w-[15%]  w-[100%] text-center  "
          >
            I D
          </label>
          <input
            type="number"
            id="name"
            name="name"
            placeholder="製品IDを入れてください"
            className="sm:w-[85%] w-[100%]"
            required
            value={id === null ? "" : id}
            onChange={(e) => {
              const value = e.target.value;
              setId(value === null ? null : Number(value)); 
            }}
          />
        </div> 
        <button
          type="submit"
          className=" w-[100%] bg-red-500  p-3 hover:bg-red-600 transition "
        >
          削除
        </button>
      </form>
    </>
  );
};

export default Delete;
