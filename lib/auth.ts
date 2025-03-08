import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma";

export const config: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 3600, // 1時間 (3600秒) の有効期限
  },
  pages: {
    signIn: "/", // カスタムのサインインページ
  },

  // ✅ コールバック関数を修正
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
    },

    async redirect({ url }) {
      return url.startsWith("/") ? `/product` : url; // リダイレクト処理を修正
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "text", optional: true },
      },
      async authorize(credentials) {
        const { username, password, email } = credentials as {
          username: string;
          password: string;
          email?: string;
        };

        // ✅ 新規登録処理
        if (email) {
          let user = await prisma.user.findUnique({ where: { username } });
          if (user) {
            throw new Error("ユーザーはすでに存在します");
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          user = await prisma.user.create({
            data: { username, email, password: hashedPassword },
          });
          return { id: user.id.toString(), username: user.username, email: user.email };
        }

        // ✅ ログイン処理
        const user = await prisma.user.findUnique({ where: { username } });
        if (user && (await bcrypt.compare(password, user.password))) {
          return { id: user.id.toString(), username: user.username, email: user.email };
        }
        throw new Error("認証に失敗しました");
      },
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
