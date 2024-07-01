import axios from 'axios'

// const jwt = getCookies('token') || ''

export const api = axios.create({
  baseURL: process.env.APP_API_URL,
})
