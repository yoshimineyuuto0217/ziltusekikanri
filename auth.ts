import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt",maxAge: 3600}, // 1時間 (3600秒) の有効期限
    pages: {signIn: "/"}, // カスタムのサインインページ
    adapter: PrismaAdapter(prisma),
    providers: [
    Credentials({
        credentials: {
            username: { label: "Username" , type: "text"},
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            if (!credentials?.username || !credentials?.password) {
                throw new Error("ユーザー名またはパスワードが入力されていません");
              }
            const { username, password } = credentials as {
                username: string;
                password: string;
              }
              const user = await prisma.user.findUnique({
                where: { username },
            })
            if(!user) {
                throw new Error("ユーザーが存在しません");
            }
            const isValid = await compare(password, user.password)
                // パスワードが一致しない場合
                if (!isValid) {
                    throw new Error("パスワードが正しくありません")
                }
                // 認証成功時にユーザー情報を返す
                return {
                    id: user.id, // `id` を `string` にする
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                }
          }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string ,
          emailVerified: null,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user && typeof user === "object") {
        const typedUser = user as { id: string; username: string; email: string };
        token.id = typedUser.id;
        token.name = typedUser.username;
        token.email = typedUser.email;
      }
      return token;
    }}
})