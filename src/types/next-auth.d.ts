import { User } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      user_id: number;
      name: string;
    };
    token: {
      user_id: number;
      login: string;
    };
  }
}
