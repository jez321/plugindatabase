import axios from 'axios';
import { config } from '../constants/Config';

export default axios.create({
  baseURL: config.API_URL
});
