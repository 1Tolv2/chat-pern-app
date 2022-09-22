import dotenv from 'dotenv';
dotenv.config();

const PORT: string = process.env.PORT || '8800'
const BASE_URL: string = `http://localhost:${PORT}`

export {PORT, BASE_URL}