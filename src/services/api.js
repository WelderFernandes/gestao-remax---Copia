import axios from 'axios'
import { getCookies } from 'cookies-next'

const jwt = getCookies('token') || ''

export const api = axios.create({
  baseURL: process.env.APP_API_URL,
  headers: {
    Authorization: `Bearer ${jwt.token}`,
  },
})
