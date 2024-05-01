import { User } from "@prisma/client";
import NextAuth from "next-auth";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user_id: number;
      login: string;
      role_id: number;
      group_id: number;
    };
    token: {
      user_id: number;
      login: string;
      role_id: number;
      group_id: number;
    };
  }
  interface User {
    user_id: number;
    login: string;
    role_id: number;
    group_id: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user_id: number;
    login: string;
    role_id: number;
    group_id: number;
  }
}
