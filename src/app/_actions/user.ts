'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { UserType } from '../(DashboardLayout)/types/apps/users'

export async function getUsers() {
  const data = await api
    .get('https://api.remax.rdweb.com.br/accounts/usuarios/', {
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
  const data = await api
    .get(`https://api.remax.rdweb.com.br/accounts/usuarios/${id}/`, {
      headers: {
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
    })
    .then((res) => res.data)

  // Orderna os dados para o header da tabela
  // const response = {
  //   id: data.user.id,
  //   name: data.user.first_name + ' ' + data.user.last_name,
  //   email: data.user.email,
  //   phone: data.user.telefone,
  //   status: data.user.is_active,
  //   staff: data.user.is_staff,
  //   category: data.user.categoria,
  // }

  console.log('🚀 ~ response ~ response:', data)

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
