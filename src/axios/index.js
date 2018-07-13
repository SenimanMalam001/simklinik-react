import axios from 'axios'

const url = 'http://localhost:3000'
// const url = 'http://35.240.239.157/'

export default axios.create({
  baseURL:  url
})
