
const dev = {
    API_URL: 'http://localhost:3001/'
}
const prod = {
    API_URL: 'https://plugindatabase.net/api/'
}
export const config = process.env.NODE_ENV === 'development' ? dev : prod;