import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from '@/db/models/User';

import linkfy from '@/utils/linkfy'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        usernameOrEmail: { label: "usernameOrEmail", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })

        const user = await res.json()

        if (res.ok && user) {
          return { ...user }
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
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          id: token.id,
          username: token.username,
          email: token.email,
          role: token.role,
          link: token.link,
          profilePicture: token.profilePicture
        }
      }
    },
    async jwt({ token, account, profile, user }) {
      if (account?.provider === "google") {
        let userQuery = await User.findOne({ where: { email: profile?.email } })

        if (!userQuery)
          userQuery = await User.create({
            username: user?.name,
            email: user?.email,
            profilePicture: user?.image,
            role: "user",
            link: linkfy(user?.name || "")
          })

        token.id = userQuery.id;
        token.username = userQuery.username;
        token.email = userQuery.email;
        token.role = userQuery.role;
        token.link = userQuery.link;
        token.profilePicture = userQuery.profilePicture;
      }

      return token;
    },
  }
}

export default NextAuth(authOptions);