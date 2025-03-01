"use client";

import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { useState } from "react";

const ProductRegister = () => {
  const [productName, setProductName] = useState("");
  const [production, setProduction] = useState<number | null >(null);
  const [month, setMonth] = useState<Timestamp | undefined >( undefined );
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [comment, setComment] = useState("");
  const [temperature, setTemperature] = useState<number | null>(null);
  
  const productRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // queryで二つのフィールドを作るときはfirebaseでインデックス設定をする
      const q = query(
        collection(db, "registr"),
        where("name", "==", productName),
        orderBy("id", "desc"),
        limit(1)
      );
      // getdocsはコレクション内の全ての全てのドキュメントを持ってくる
      const querySnapshot = await getDocs(q);
      // docsは全てのドキュメントを持ってくる意味
      const lastDoc = querySnapshot.docs[0];

      if (lastDoc) {
        const newId = lastDoc.data().id + 1;
        const docRef = await addDoc(collection(db, "registr"), {
          id: newId,
          name: productName,
          production: production,
          month: month,
          weight: weight,
          height: height,
          comment: comment,
          temperature: temperature,
        });
        console.log(docRef);
        setComment("");
        setTemperature(null);
        setProduction(null);
        setMonth(undefined);
        setHeight("");
        setWeight("");
        setProductName("");
        window.alert(`新しい製品を登録しました: ID ${newId}, 製品名: ${productName}`);
      } else {
        const docRef = await addDoc(collection(db, "registr"), {
          id: 1,
          name: productName,
          production: production,
          month: month,
          weight: weight,
          comment: comment,
          temperature: temperature,
        });
        console.log(docRef);
        setComment("");
        setTemperature(null);
        setProduction(null);
        setMonth(undefined);
        setHeight("");
        setWeight("");
        setProductName("");
        window.alert(`新しい製品を登録しました: ID ${"1"}, 製品名: ${productName}`);
      }
    } catch (error) {
      console.error("データ登録時にエラーが発生しました:", error);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("入力された日付:", e.target.value);
    const inputValue = e.target.value;  // 例: "2025-02-05"
    const [year, monthStr, dayStr] = inputValue.split('-');
    const monthNum = parseInt(monthStr, 10) - 1;  // 月は0から始まるので-1
    const dayNum = parseInt(dayStr, 10); // 日を取得
    const date = new Date(Number(year), monthNum, dayNum); // 新しいDateオブジェクトを作成
    const newTimestamp = Timestamp.fromDate(date);
    console.log("変換後の Timestamp:", newTimestamp);
    setMonth(newTimestamp); // DateオブジェクトをTimestampに変換してsetMonth
  };
  

  return (
    <>
      <h1 className="text-center text-[2.5em] mb-5">新規登録</h1>
      <form
        className="bg-gray-200 py-10 px-5 sm:max-w-[800px]  w-[90%] m-auto "
        onSubmit={productRegister}
      >
        <div className="flex flex-col sm:flex sm:flex-row sm:flex-wrap w-[100%] ">
          <label htmlFor="name" className="sm:w-[10%] w-[100%] p-2">
            製品名
          </label>
          <input
            type="name"
            placeholder="製品名を入力"
            id="name"
            name="name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-[100%] sm:w-[35%] mb-5 mr-[10%] p-2"
            required
          />
          <label htmlFor="name" className="sm:w-[10%] w-[100%] p-2">
            温　度
          </label>
          <input
            type="number"
            id="name"
            name="name"
            min="0"
            placeholder="1200"
            className="sm:w-[35%] mb-5 w-[100%] p-2"
            required
            value={temperature === null ? "" : temperature}
            onChange={(e) => {
              const value = e.target.value;
              setTemperature(value === null ? null : Number(value)); 
            }}
          />
          <label htmlFor="name" className="sm:w-[10%] w-[100%] p-2">
            生産数
          </label>
          <input
            type="number"
            id="name"
            name="name"
            min="0"
            placeholder="3000"
            required
            value={production === null ? "": production}
            onChange={(e) => {
              const value = e.target.value;
              setProduction(value === "" ? null : Number(value)); 
            }}
            className="w-[100%] sm:w-[35%] mb-5 mr-[10%] p-2"
          />
          <label htmlFor="name" className="sm:w-[10%] w-[100%] p-2">
            生産日
          </label>
          <input
            type="date"
            id="month"
            name="month"
            placeholder="2025-01-17"
            className="w-[100%] sm:w-[35%] mb-5 p-2"
            required
            value={month ? month.toDate().toISOString().split("T")[0] : ""}
            onChange={handleMonthChange}
          />
          <label htmlFor="name" className="sm:w-[10%] w-[100%] p-2">
            重　量
          </label>
          <input
            type="name"
            id="name"
            name="name"
            placeholder="1000mg"
            className="sm:w-[35%] w-[100%] mb-5 mr-[10%] p-2"
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <label htmlFor="name" className="sm:w-[10%] w-[100%] p-2">
            厚　み
          </label>
          <input
            type="name"
            id="name"
            name="name"
            className="sm:w-[35%] mb-5 w-[100%] p-2"
            placeholder="1000mm"
            required
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <label htmlFor="remarks" className="sm:w-[10%] w-[100%] p-2">
            備考欄
          </label>
          <textarea
            id="remarks"
            name="remarks"
            className="sm:w-[90%] w-[100%] mb-10 h-[200px] p-2"
            maxLength={200}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
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
