import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        usernameOrEmail: { label: "usernameOrEmail", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log(credentials)

        const res = await fetch("http://localhost:3000/api/user/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        console.log(res)

        const user = await res.json()

        if (res.ok && user) {
          return { ...user, image: "" }
        }
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user }) {
      console.log({ user })
      return true
    },

  }
}

export default NextAuth(authOptions);