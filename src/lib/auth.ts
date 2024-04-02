import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) {
          return null;
        }
        const user = await db.user.findFirst({
          where: {
            login: credentials.login,
          },
        });
        if (!user) {
          return null;
        }
        const match = await compare(credentials.password, user.password);
        if (!match) {
          return null;
        }
        return {
          user_id: user.user_id + "",
          login: user.login,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // When user signs in, add their information to the token
      if (user) {
        token.user_id = user.user_id; // Make sure it matches what you return in 'authorize'
        token.login = user.login;
      }
      return token;
    },
    async session({ session, token }) {
      // Assign the user information to the session object
      session.user = {
        ...session.user,
        user_id: token.user_id,
        login: token.login,
      };
      return session;
    },
  },
};
