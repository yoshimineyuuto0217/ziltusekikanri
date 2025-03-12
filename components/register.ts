"use server"

import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData):Promise<string | void> {
    const username = formData.get("name") as string;
    const email =formData.get("email") as string;
    const password =formData.get("password") as string;

    const user = await prisma.user.findFirst({ where: {email}});

    if(user) {
        return "このメールアドレスは存在します";
    }

    const bcryptPassword = await bcrypt.hash(password,10);

    try{
        await prisma.user.create({
            data: {
                username,
                email,
                password:bcryptPassword
            },
        });
    } catch (error) {
        console.error(error);
        return "新規登録に失敗しました"
    }
}