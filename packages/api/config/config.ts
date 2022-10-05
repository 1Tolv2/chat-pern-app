import dotenv from 'dotenv';
dotenv.config();

const PORT: string = process.env.PORT || '8800'
const BASE_URL: string = `http://localhost:${PORT}`
const ALTER_DATABASE: boolean = process.env.ALTER_DATABASE === 'true' || false

export {PORT, BASE_URL, ALTER_DATABASE}