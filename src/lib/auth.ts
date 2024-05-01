import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";

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
          user_id: user.user_id,
          login: user.login,
          role_id: user.role_id,
          group_id: user.group_id,
        } as any; // костыль, я не нашел как перезаписать defaultUser type
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // When user signs in, add their information to the token
      if (user) {
        token.user_id = user.user_id; // Make sure it matches what you return in 'authorize'
        token.login = user.login;
        token.role_id = user.role_id;
        token.group_id = user.group_id;
      }
      return token;
    },
    async session({ session, token }) {
      // Assign the user information to the session object
      session.user = {
        ...session.user,
        user_id: token.user_id,
        login: token.login,
        role_id: token.role_id,
        group_id: token.group_id,
      };
      return session;
    },
  },
};
