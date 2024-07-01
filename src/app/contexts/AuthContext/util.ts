'use server'
import { api } from '@/services/api'

export async function handleLogin(email: string, password: string) {
  const response = await api
    .post('https://api.remax.rdweb.com.br/auth/register/login/', {
      email,
      password,
    })
    .then((res) => res.data)
    .catch((err) => {
      return err.response.data
    })
  console.log(response.data)
  return response
}

export async function handleLogout(token: string) {
  try {
    const response = await api.post(
      'https://api.remax.rdweb.com.br/auth/register/logout/',
      {
        token,
      },
    )
    console.log(response.data)
    return response.data
  } catch (error) {}
}

export async function HandlecheckToken(token: string) {
  try {
    const response = await api.post(
      'https://api.remax.rdweb.com.br/auth/register/check/',
      {
        token,
      },
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log({ error })
  }
}

export async function handleGetUser(id: string, token: string) {
  console.log('🚀 ~ handleGetUser ~ id:', id)
  try {
    const response = await api.get(
      `https://api.remax.rdweb.com.br/accounts/usuarios/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    console.log('users', response.data)
    return response.data
  } catch (error) {
    console.log({ error })
  }
}
