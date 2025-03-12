"use client"

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import EyeButton from "@/components/EyeButton";

export default function Home() {
  const [ icon , setIcon ] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
  };

  return (
    <>
      <h1 className="text-center text-[2.5em] mb-5">ログイン</h1>
      <div className="bg-gray-200 sm:w-[50%] w-[90%] h-[80%] m-auto py-10 px-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="山田太郎"
              autoComplete="username"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              パスワード
            </label>
            <div className="relative">
            <input
              type = {icon ? "text" : "password"}
              id="password"
              name="password"
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500  "
              placeholder="••••••••"
            />
            <EyeButton icon={icon} setIcon={setIcon}/>
            </div>
          </div>
          <div className="text-right block ">
          <Button name={"ログイン"} className="w-[100%] sm:w-[200px] mb-5 bg-blue-500 p-3 hover:bg-blue-600 transition"/>
          </div>
        </form>
        <p>アカウントをお持ちでない方は <Link className="text-blue-500" href="/signup">こちらから登録</Link></p>
      </div>
    </>
  );
}