import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { db } from "@/lib/db";
import { User } from "@prisma/client";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req): Promise<any | null> {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) return null;

        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );

        if (passwordCorrect) {
          return user.login;
        } else {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
