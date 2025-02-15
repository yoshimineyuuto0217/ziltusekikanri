import NextAuth, { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma";


export const config: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [
    CredentialsProvider ({
        name: "Credentials",
        credentials:{
            username: {label: "Username",type: "text"},
            password: {label: "Password", type: "password"},
        },
        async authorize(credentials) {

        }
    })
]
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);


// prismaのdetabaseを作る