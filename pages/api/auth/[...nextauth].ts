import { StudentData } from "@/sharedTypes/studentType";
import NextAuth, { Session } from "next-auth"
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google"
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    }),
  ],
  secret : process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOptions)