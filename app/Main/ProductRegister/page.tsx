"use client";
// timestamp型になるように画面入力で数値のところが消せない
import { db } from "@/lib/firebase";
import { addDoc, collection} from "firebase/firestore";
import React, { useState } from "react";

const ProductRegister= () => {
  const [productname, setProductName] = useState("");
  const [production, setProduction] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [comment, setComment] = useState("");

  const productRegister = async (event: React.FormEvent<HTMLFormElement>)  => {
  event.preventDefault(); // 型エラー解消
  try {
   const docRef =await addDoc(collection(db, "registr"), {
      name: productname,
      production: production,
      height: height,
      month: month ,
      weight: weight,
      comment: comment,
    });
    console.log("データが正常に登録されました:", docRef);
  } catch (error) {
    console.error("データ登録時にエラーが発生しました:", error);
  }
};


  return (
    <>
      <h1 className="text-center text-[2.5em] mb-5">新規登録</h1>
      <form className="bg-gray-200 py-10 px-5 sm:max-w-[800px]  w-[90%] m-auto " onSubmit={productRegister}>
        <div className="flex flex-col sm:flex sm:flex-row sm:flex-wrap w-[100%]">
          <label htmlFor="name" className="sm:w-[10%] w-[100%]">
            製品名
          </label>
          <input
            type="name"
            id="name"
            name="name"
            value={productname}
            onChange={(e) => setProductName(e.target.value)}
            className="w-[100%] sm:w-[90%] mb-5 p-2"
          />
          <label htmlFor="name" className="sm:w-[10%] w-[100%]">
            生産数
          </label>
          <input
            type="name"
            id="name"
            name="name"
            value={production}
            onChange={(e) => setProduction(Number(e.target.value) || 0)}
            className="w-[100%] sm:w-[35%] mb-5 mr-[10%] p-2"
          />
          <label htmlFor="name" className="sm:w-[10%] w-[100%]">
            生産日
          </label>
          <input
            type="data"
            id="month"
            name="month"
            className="w-[100%] sm:w-[35%] mb-5 p-2"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value) || 0 )} 
          />
          <label htmlFor="name" className="sm:w-[10%] w-[100%]">
            重　量
          </label>
          <input
            type="name"
            id="name"
            name="name"
            className="sm:w-[35%] w-[100%] mb-5 mr-[10%] p-2"
            value={weight}
            onChange={(e)=> setWeight(e.target.value)}
          />
          <label htmlFor="name" className="sm:w-[10%] w-[100%]">
            厚　み
          </label>
          <input
            type="name"
            id="name"
            name="name"
            className="sm:w-[35%] mb-5 w-[100%] p-2"
            value={height}
            onChange={(e)=> setHeight(e.target.value)}
          />
          <label htmlFor="remarks" className="sm:w-[10%] w-[100%]">
            備考欄
          </label>
          <textarea
            id="remarks"
            name="remarks"
            className="sm:w-[90%] w-[100%] mb-10 h-[200px] p-2"
            maxLength={200}
            value={comment}
            onChange={(e)=>  setComment(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className=" w-[100%]  mb-5 bg-blue-500  p-3 hover:bg-blue-600 transition "
        >
          登録
        </button>
      </form>
    </>
  );
};

export default ProductRegister;
