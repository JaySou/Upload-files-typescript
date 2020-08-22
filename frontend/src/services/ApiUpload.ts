import axios from 'axios';

const baseURL = 'http://localhost:3333'

const ApiUpload = axios.create({ baseURL })

export default ApiUpload;
