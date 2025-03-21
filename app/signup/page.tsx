"use client";

import React, { useState, useTransition } from "react";
import Button from "@/components/Button";
import EyeButton from "@/components/EyeButton";
import { registerUser } from "@/components/register";
import { useRouter } from "next/navigation";


const UserRegister = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [icon, setIcon] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      const result = await registerUser(formData);
      if (typeof result === "string") {
        setErrorMessage(result);
      } else {
        startTransition(() => {
          router.push("/");
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage("登録処理中にエラーが発生しました。");
    } finally {
      setIsSubmitting(false); // 送信完了後に解除
    }
  };

  return (
    <>
      <h1 className="text-center text-[2.5em] mb-5">新規登録</h1>
      <div className="bg-gray-200 sm:w-[50%] w-[90%] h-[80%] m-auto py-10 px-5">
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}
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
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@example.com"
              required
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
                type={icon ? "text" : "password"}
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />
              <EyeButton icon={icon} setIcon={setIcon} />
            </div>
          </div>
          <Button
            name={isSubmitting || isPending ? "登録中..." : "登録"}
            disabled={isSubmitting || isPending}
            className="w-[100%] sm:w-[200px] mb-5 bg-blue-500 p-3 hover:bg-blue-600 transition"
          />
        </form>
      </div>
    </>
  );
};

export default UserRegister;
