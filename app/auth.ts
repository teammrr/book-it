import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions as NextAuthConfig } from "next-auth";
import { getServerSession } from "next-auth";
import User from "@/models/user";
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import LineProvider from "next-auth/providers/line";
import { connectToDatabase } from "@/lib/mongodb";
import { signIn } from "next-auth/react";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    role?: "user";
  }
}
interface ExtendedSession extends Session {
  accessToken?: string;
}
export const config = {
  theme: {
    logo: "/img/logo-black.png",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    LineProvider({
      clientId: process.env.AUTH_LINE_ID,
      clientSecret: process.env.AUTH_LINE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      token.role = "user";
      console.log("jwt", token);

      const { name, email, role } = token;
      try {
        await connectToDatabase();
        const userExists = await User.findOne({});
        console.log(userExists);

        if (!userExists) {
          const response = await fetch("/api/auth/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, role }),
          });
          if (response.ok) {
            token.accessToken = account?.accessToken;
            return token;
          }
        }
      } catch (error) {
        console.error("There was an error during authentication", error);
      }
      return token;
    },
    async session({ session, token }) {
      const sessionWithAccessToken: ExtendedSession = {
        ...session,
        accessToken: (token as JWT & { accessToken?: string }).accessToken,
      };

      return sessionWithAccessToken;
    },
  },
} satisfies NextAuthConfig;

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}

// We recommend doing your own environment variable validation
declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;
      AUTH_LINE_ID: string;
      AUTH_LINE_SECRET: string;
    }
  }
}
