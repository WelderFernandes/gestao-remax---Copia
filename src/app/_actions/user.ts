'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { UserType } from '../(DashboardLayout)/types/apps/users'

export async function getUsers() {
  const data = await api
    .get('/accounts/usuarios/', {
      headers: {
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
    })
    .then((res) => res.data)

  // Orderna os dados para o header da tabela
  const response = data.results.map((user: UserType) => {
    return {
      id: user.id,
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
      phone: user.telefone,
      status: user.is_active,
      staff: user.is_staff,
      category: user.categoria,
    }
  })
  console.log('🚀 ~ response ~ response:', response)

  return response
}
export async function getUserById(id: string) {
  console.log('🚀 ~ response ~ response:', id)
  const data = await api
    .get(`https://api.remax.rdweb.com.br/accounts/usuarios/${id}/`, {
      headers: {
        Authorization: `Bearer ${cookies().get('access_token')?.value}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log({ err })
    })
  console.log('🚀 ~ getUserById ~ data:', data)

  return data
}

export async function deleteUser(id: string) {
  console.log({ id })
  try {
    await api
      .delete(`https://api.remax.rdweb.com.br/accounts/usuarios/${id}/`, {
        headers: {
          Authorization: `Bearer ${cookies().get('token')?.value}`,
        },
      })
      .then((res) => res.data)
    revalidatePath('/users')
  } catch (error) {
    console.log(error)
  }
}
