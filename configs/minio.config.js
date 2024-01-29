import dotenv from 'dotenv'

dotenv.config()

export const minioHost = process.env.MINIO_HOST
export const minioPort = parseInt(process.env.MINIO_PORT)
export const minioAccessKey = process.env.MINIO_ACCESS_KEY
export const minioSecretKey = process.env.MINIO_SECRET_KEY
export const minioUseSsl = String(process.env.MINIO_USE_SSL).toUpperCase() === 'TRUE' ? true : false