import { SignInWithPassword } from '@/app/_actions/login'
import NextAuth, { DefaultUser } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'

const handler = NextAuth({
  pages: {
    signIn: '/auth/auth1/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const result = await SignInWithPassword(credentials)

        const accessToken = result.result?.access_token as string

        cookies().set('token-access', accessToken)

        Promise.resolve(result)
        console.log('🚀 ~ authorize: ~ 5:', result)
        return {
          id: result.user!.id,
          name: result.user!.first_name + ' ' + result.user?.last_name,
          email: result.user!.email,
          image: result.user!.foto,
        } as DefaultUser
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = {
        ...token,
      }
      return session
    },
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.user = user
    //   }
    //   return token
    // },
  },
})

export { handler as GET, handler as POST }
// eslint-disable-next-line prettier/prettier

