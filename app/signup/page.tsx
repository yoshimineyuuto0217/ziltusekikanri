"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "@/components/Button";
import EyeButton from "@/components/EyeButton";
import { useRouter } from "next/navigation";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [ icon , setIcon ] = useState(false);
  const [ error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]: name === "name" ? value.replace(/\s+/g, "") : value, // 名前入力時に空白を削除
    });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    console.log(error);

    try {
      const callbackUrl = `${window.location.origin}/product`;

      // NextAuthで新規ユーザー登録（CredentialsProviderのauthorizeメソッドで処理）
      const res = await signIn("credentials", {
        username: formData.name,
        password: formData.password,
        email: formData.email,
        redirect: false,  //リダイレクトを手動に trueだとnextauth側で実行されるからSSRになる
        callbackUrl: callbackUrl,
      });

      console.log("signIn Response:", res);
      
      if (res?.error) {
        setError("ユーザー登録に失敗しました");
        return;
      }

     await router.push("/product");
  } catch (error) {
    console.error(error);
    setError("予期せぬエラーが発生します")
  }
  };

  return (
    <>
      <h1 className="text-center text-[2.5em] mb-5">新規登録</h1>
      <div className="bg-gray-200 sm:w-[50%] w-[90%] h-[80%] m-auto py-10 px-5">
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
            <div className="relative">
            <input
              type = {icon ? "text" : "password"}
              id="password"
              name="password"
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <EyeButton icon={icon} setIcon={setIcon}/>
            </div>
          </div>
          <Button name={"登録"} className="w-[100%] sm:w-[200px] mb-5 bg-blue-500 p-3 hover:bg-blue-600 transition"/>
        </form>
      </div>
    </>
  );
};

export default UserRegister;
