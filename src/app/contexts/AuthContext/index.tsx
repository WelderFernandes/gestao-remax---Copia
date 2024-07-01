'use client'
import { getUserById } from '@/app/_actions/user'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { createContext, useState } from 'react'
import { IAuthContext, IAuthProvider, IImputData, IToken, IUser } from './types'
import { HandlecheckToken, handleLogin, handleLogout } from './util'

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProviderTeste = ({ children }: IAuthProvider) => {
  const [token, setToken] = useState<IToken | null>()
  const [user, setUser] = useState<IUser>({} as IUser)

  const router = useRouter()

  // useEffect(() => {
  //   const accessToken = getCookie('access_token')
  //   const refreshToken = getCookie('refresh_token')

  //   if (token) {
  //     setCookie('access_token', accessToken, {
  //       path: '/',
  //       expires: new Date(Date.now() + 60 * 60 * 24 * 7000), // 7 dias
  //     })
  //     setCookie('refresh_token', refreshToken, {
  //       path: '/',
  //       expires: new Date(Date.now() + 60 * 60 * 24 * 7000), // 7 dias
  //     })
  //   } else {
  //     deleteCookie('access_token')
  //     deleteCookie('refresh_token')
  //     // router.push('/auth/auth1/login')
  //   }
  // }, [token, router])

  async function authenticate({ email, password }: IImputData) {
    const response = await handleLogin(email, password)
    if (!response.error) {
      const check = await HandlecheckToken(response.access_token)
      if (check.user_id) {
        setToken(response.access_token)
        setCookie('access_token', response.access_token, {
          path: '/',
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        })
        setCookie('refresh_token', response.refresh_token, {
          path: '/',
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        })
        const data = await getUserById(check.user_id)
        setUser(data as IUser)
        router.push('/')
      }
    }

    return response.error
  }

  async function logout() {
    handleLogout(getCookie('access_token') as string)
    setToken(null)
    deleteCookie('access_token')
    deleteCookie('refresh_token')
    router.push('/auth/auth1/login')
  }

  return (
    <AuthContext.Provider value={{ ...token, user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
