
const dev = {
  API_URL: 'http://localhost:3001/api/',
};
const prod = {
  API_URL: 'https://plugindatabase.net/api/',
};
const config = process.env.NODE_ENV === 'development' ? dev : prod;
export default config;
