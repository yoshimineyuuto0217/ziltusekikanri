import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-center text-[2.5em] mb-5">ログイン</h1>
      <div className="bg-gray-200 sm:w-[50%] w-[90%] h-[800] m-auto py-10 px-5">
        <form>
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
              type="text"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@example.com"
            />
          </div>
          {/* <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              パスワード
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div> */}
          <div className="text-right block ">
            <button
              type="submit"
              className=" w-[100%] sm:w-[200px] mb-5 bg-blue-500  p-3 hover:bg-blue-600 transition "
            >
              ログイン
            </button>
          </div>
        </form>
        <p>初めてのご利用の方は<span className="text-blue-500"><Link href="/UserRegister">こちら</Link></span></p>
      </div>
    </>
  );
}
