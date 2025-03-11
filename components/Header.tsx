"use client"


import Link from "next/link";


const Header = () => {

  return (
    <div className="flex justify-between w-[90%] border-b border-black m-auto py-5 mb-8">
      <Link href="/product"><div>実績管理アプリ</div></Link>
        <Link href="/">
          <div className="text-blue-500">ログイン</div>
        </Link>
    </div>
  );
};

export default Header;
