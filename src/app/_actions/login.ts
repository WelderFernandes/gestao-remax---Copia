import { HTTPError } from 'ky'
import { api } from './..//../http/api-client'

interface SignInWithPasswordProps {
  email: string
  password: string
}

interface SignInWithPasswordResponse {
  message: string
  access_token: string
  refresh_token: string
}

interface CheckResponse {
  message: string
  user: string
  user_id: string
  type: string
}

export interface IUser {
  id?: string
  nivel?: string[]
  last_login?: string
  first_name?: string
  last_name?: string
  email?: string
  telefone?: string
  foto?: string
  is_active?: boolean
  is_staff?: boolean
  categoria?: string
  access_token?: string
}

export async function SignInWithPassword({
  email,
  password,
}: SignInWithPasswordProps) {
  try {
    const result = await api
      .post('auth/register/login/', {
        json: {
          email,
          password,
        },
        hooks: {
          beforeError: [
            (error) => {
              const { response } = error
              if (response.status === 401) {
                error.name = 'UNAUTHORIZED'
                error.message = 'Incorrect email or password'
              }
              return error
            },
          ],
        },
      })
      .json<SignInWithPasswordResponse>()

    const check = await api
      .post('auth/register/check/', {
        json: {
          token: result.access_token,
        },
      })
      .json<CheckResponse>()

    const user = await api
      .get(`accounts/usuarios/${check.user_id}`, {
        headers: {
          Authorization: `Bearer ${result.access_token}`,
        },
      })
      .json<IUser>()

    return { user, result }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: HTTPError | any) {
    if (error instanceof HTTPError) {
      console.log('🚀 ~ error: 555', error)
      console.log(error.response.status, error.response.body)
      if (error.response.status === 401) {
        return {
          status: error.response.status,
          error: error.response.body?.getReader(),
        }
      }
    }
    console.log('🚀 ~ SignInWithPassword ~ error:', error.response.status)

    return { error: error.response.body }
  }
}
