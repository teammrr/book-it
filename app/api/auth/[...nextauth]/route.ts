import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { options } from "./option";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
