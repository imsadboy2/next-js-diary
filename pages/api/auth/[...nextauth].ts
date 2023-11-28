import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import KaKaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLID as string,
      clientSecret:process.env.GOOGLE_CLPW as string
    }),
    KaKaoProvider({
      clientId: process.env.KAKAO_CLID as string,
      clientSecret: process.env.KAKAO_CLPW as string
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLID as string,
      clientSecret: process.env.NAVER_CLPW as string
    })
  ],
  pages: {
    signIn: "/signin"
  },
  secret: 'qwer1234'
};

export default NextAuth(authOptions)