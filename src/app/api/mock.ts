import axios from '@/utils/axios'
import AxiosMockAdapter from 'axios-mock-adapter'

const mock = new AxiosMockAdapter(axios, { delayResponse: 0 })
export default mock
