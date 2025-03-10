"use client"

import { signIn } from "next-auth/react"; // NextAuthのsignInメソッドをインポート
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import EyeButton from "@/components/EyeButton";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const [username, setUsername] = useState(""); // ユーザー名
  const [password, setPassword] = useState(""); // パスワード
  const [error, setError] = useState(""); // エラーメッセージ
  const [ icon , setIcon ] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const callbackUrl = `${window.location.origin}/product`

    // signInメソッドを使って認証を行う
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: callbackUrl,
    });

    console.log("signIn Response:", res);
    
    if (res?.error) {
      setError("ログインに失敗しました。再度お試しください。"); // エラーがあれば表示
    } else {
      await router.push("/product") ; // 成功した場合はproductページへリダイレクト
    }
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
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ""))} // 入力時にusernameを更新
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
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 入力時にpasswordを更新
            />
            <EyeButton icon={icon} setIcon={setIcon}/>
            </div>
          </div>
          {error && <p className="text-red-500" suppressHydrationWarning >{error}</p>} {/* エラーメッセージ表示 */}
          <div className="text-right block ">
          <Button name={"ログイン"} className="w-[100%] sm:w-[200px] mb-5 bg-blue-500 p-3 hover:bg-blue-600 transition"/>
          </div>
        </form>
        <p>アカウントをお持ちでない方は <Link className="text-blue-500" href="/signup">こちらから登録</Link></p>
      </div>
    </>
  );
}
