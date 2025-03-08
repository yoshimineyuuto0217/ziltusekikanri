import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    // jwtを全体で使うときはsecret設定が必要
    const token = await getToken({ req , secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = new URL(req.url);

    // ユーザーが未認証で保護されたページにアクセスした場合
    if (!token && pathname !== "/" && pathname !== "/signup") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // ユーザーが認証済みで `/product` 以外の場所にいたら `/product` へリダイレクト
    if (token && pathname === "/") {
        return NextResponse.redirect(new URL("/product", req.url));
    }

    // 何もしない（リクエストをそのまま通す）
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login).*)'],
};
