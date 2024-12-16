import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://savpetsbackend-5semestre-production.up.railway.app/api/v1',
})
