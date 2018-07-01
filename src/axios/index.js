import axios from 'axios'

// const url = 'http://localhost:3000'
const url = 'http://35.185.189.173'

export default axios.create({
  baseURL:  url
})
