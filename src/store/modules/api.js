import axios from 'axios'
import auth from './auth'

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
})

client.auth = auth(client)

client.install = (Vue) => {
  Object.defineProperty(Vue.prototype, '$request', {
    get () {
      return client
    },
  })
}

export default client