/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '12345',
        database: 'student',
    }
}

module.exports = nextConfig
