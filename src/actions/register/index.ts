"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { RegisterUser } from "./schema";
import { hash } from "bcrypt";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { login, name, email, password } = data;
  let user;
  try {
    const isRegistered = await db.user.findFirst({
      where: {
        login: login,
        email: email,
      },
    });
    if (isRegistered) {
      return {
        error: "Пользователь с таким логином или email уже зарегистрирован",
      };
    }
    user = await db.user.create({
      data: {
        login,
        name,
        email,
        role_id: 1, // студент
        password: await hash(password, 10),
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось зарегистрировать пользователя",
    };
  }
  return { data: user };
};

export const registerUser = createSafeAction(RegisterUser, handler);
