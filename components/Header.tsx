"use client"

import { Session } from "next-auth";
import { useSession, signOut  } from "next-auth/react"; // useSessionとsignOutをインポート
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {

  const { data: session } = useSession();
  const [clientSession, setClientSession] = useState<Session | null>(null);

  useEffect(() => {
    setClientSession(session);
  }, [session]);

  return (
    <div className="flex justify-between w-[90%] border-b border-black m-auto py-5 mb-8">
      <Link href="/product"><div>実績管理アプリ</div></Link>
      {clientSession? (
        // セッションがあればユーザー名と「ログアウト」を表示
        <div className="flex items-center space-x-4">
          <div>{clientSession.user?.name}</div>
          <div
            className="cursor-pointer text-blue-500"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            ログアウト
          </div>
        </div>
      ) : (
        // セッションがない場合は「ログイン」を表示
        <Link href="/">
          <div className="text-blue-500">ログイン</div>
        </Link>
      )}
    </div>
  );
};

export default Header;
