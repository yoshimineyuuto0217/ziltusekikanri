"use client";

import Button from "@/components/Button";
import { db } from "@/lib/firebase";
import { handleMonthChange } from "@/utils/handleMonthChange";
import { useProductRegister } from "@/utils/productRegister";
import { addDoc, collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import React from "react";

const ProductRegister = () => {
  const {
    productName, setProductName,
    production, setProduction,
    month, setMonth,
    weight, setWeight,
    height, setHeight,
    comment, setComment,
    temperature, setTemperature,
    resetFields,
  } = useProductRegister();

  const productRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const q = query(
        collection(db, "registr"),
        where("name", "==", productName),
        orderBy("id", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      const lastDoc = querySnapshot.docs[0];
      const newId = lastDoc ? lastDoc.data().id + 1 : 1;

      await addDoc(collection(db, "registr"), {
        id: newId,
        name: productName,
        production,
        month,
        weight,
        height,
        comment,
        temperature,
      });

      window.alert(`新しい製品を登録しました: ID ${newId}, 製品名: ${productName}`);
      resetFields();
    } catch (error) {
      console.error("データ登録時にエラーが発生しました:", error);
    }
  };

  return (
    <>
      <h1 className="text-center text-[2.5em] mb-5">新規登録</h1>
      <form
        className="bg-gray-200 py-10 px-5 sm:max-w-[800px] w-[90%] m-auto"
        onSubmit={productRegister}
      >
        <div className="flex flex-col sm:flex sm:flex-row sm:flex-wrap w-[100%]">
          <label htmlFor="name" className="sm:w-[10%] w-[100%] p-2">
            製品名
          </label>
          <input
            type="text"
            placeholder="製品名を入力"
            id="name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-[100%] sm:w-[35%] mb-5 mr-[10%] p-2"
            required
          />
          <label htmlFor="temperature" className="sm:w-[10%] w-[100%] p-2">
            温　度
          </label>
          <input
            type="number"
            id="temperature"
            min="0"
            placeholder="1200"
            className="sm:w-[35%] mb-5 w-[100%] p-2"
            required
            value={temperature === null ? "" : temperature}
            onChange={(e) => setTemperature(e.target.value === "" ? null : Number(e.target.value))}
          />
          <label htmlFor="production" className="sm:w-[10%] w-[100%] p-2">
            生産数
          </label>
          <input
            type="number"
            id="production"
            min="0"
            placeholder="3000"
            required
            value={production === null ? "" : production}
            onChange={(e) => setProduction(e.target.value === "" ? null : Number(e.target.value))}
            className="w-[100%] sm:w-[35%] mb-5 mr-[10%] p-2"
          />
          <label htmlFor="month" className="sm:w-[10%] w-[100%] p-2">
            生産日
          </label>
          <input
            type="date"
            id="month"
            className="w-[100%] sm:w-[35%] mb-5 p-2"
            required
            value={month ? month.toDate().toISOString().split("T")[0] : ""}
            onChange={(e) => handleMonthChange(e, setMonth)}
          />
          <label htmlFor="weight" className="sm:w-[10%] w-[100%] p-2">
            重　量
          </label>
          <input
            type="text"
            id="weight"
            placeholder="1000mg"
            className="sm:w-[35%] w-[100%] mb-5 mr-[10%] p-2"
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <label htmlFor="height" className="sm:w-[10%] w-[100%] p-2">
            厚　み
          </label>
          <input
            type="text"
            id="height"
            className="sm:w-[35%] mb-5 w-[100%] p-2"
            placeholder="1000mm"
            required
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <label htmlFor="comment" className="sm:w-[10%] w-[100%] p-2">
            備考欄
          </label>
          <textarea
            id="comment"
            className="sm:w-[90%] w-[100%] mb-10 h-[200px] p-2"
            maxLength={200}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <Button name="登録" className="w-[100%] mb-5 bg-blue-500 p-3 hover:bg-blue-600 transition" />
      </form>
    </>
  );
};

export default ProductRegister;