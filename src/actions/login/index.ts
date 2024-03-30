"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { LoginUser } from "./schema";
import { hash, compare } from "bcrypt";
import { signIn } from "next-auth/react";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { login, password } = data;
  try {
    const isRegistered = await db.user.findUnique({
      where: {
        login: login,
      },
    });
    if (!isRegistered) {
      return {
        error: "Не удалось найти пользователя с таким логиным или паролем",
      };
    }
    const isPasswordCorrect = compare(password, isRegistered.password);
    if (!isPasswordCorrect) {
      return {
        error: "Не удалось найти пользователя с таким логиным или паролем",
      };
    }
    const response = await signIn("credentials", {
      login,
      password,
      redirect: false,
    });
    return {
      error: "Пользователь найден",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось зарегистрировать пользователя",
    };
  }
};

export const loginUser = createSafeAction(LoginUser, handler);
