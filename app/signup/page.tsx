"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // NextAuthで新規ユーザー登録（CredentialsProviderのauthorizeメソッドで処理）
      const res = await signIn("credentials", {
        username: formData.name,
        password: formData.password,
        email: formData.email,
        redirect: false,
      });

      if (res?.error) {
        throw new Error("ユーザー登録に失敗しました");
      }

      // 登録後に自動でログイン
      await signIn("credentials", {
        username: formData.name,
        password: formData.password,
        redirect: true,
        callbackUrl: "/product", // ログイン後にリダイレクト
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-center text-[2.5em] mb-5">新規登録</h1>
      <div className="bg-gray-200 sm:w-[50%] w-[90%] h-[800px] m-auto py-10 px-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="山田太郎"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              パスワード
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-right block">
            <button type="submit" className="w-[100%] sm:w-[200px] mb-5 bg-blue-500 p-3 hover:bg-blue-600 transition">
              登録
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserRegister;
