import NextAuth, { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma";
import bcrypt from 'bcryptjs';


export const config: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        maxAge: 3600, // 1時間 (3600秒) の有効期限
      },
      pages: {
        signIn: "/", // カスタムのサインインページ
      },
    //   ログインしてる時の対応
    callbacks: {
        // サインイン後の処理
        async signIn({ user }) {
          // ログイン成功時に product ページにリダイレクト
          if (user) {
            return true;  // ログイン成功
          }
          return false;  // ログイン失敗
        },
        async redirect({ url, baseUrl }) {
          // リダイレクト先を /product に固定
          if (url === baseUrl) {
            return `${baseUrl}/product`;
          }
          return url;  // 他のリダイレクト先があればそのまま使用
        },
      },
    providers: [
    CredentialsProvider ({
        name: "Credentials",
        credentials:{
            username: {label: "Username",type: "text"},
            password: {label: "Password", type: "password"},
            email: { label: "Email", type: "text" },
        },
        async authorize( credentials, req) {
            const { username, password, email } = credentials as { username: string; password: string; email?: string };

            if (email) {
                // email がある場合は新規登録フロー
                let user = await prisma.user.findUnique({ where: { username } });
                if (user) {
                  throw new Error("ユーザーはすでに存在します");
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                user = await prisma.user.create({
                  data: { username, email, password: hashedPassword },
                });
                return { ...user, id: user.id.toString() };
              } else {
                const user = await prisma.user.findUnique({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      return { ...user, id: user.id.toString() };
    }
    return null;
              }
        }
    })
]
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);


