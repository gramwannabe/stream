import * as Minio from 'minio'
import { minioAccessKey, minioHost, minioPort, minioSecretKey, minioUseSsl } from '../configs/minio.config.js';

// Configure MinIO client
const minioClient = new Minio.Client({
    endPoint: minioHost,
    port: minioPort,
    useSSL: minioUseSsl,
    accessKey: minioAccessKey,
    secretKey: minioSecretKey,
});

export async function image(req, res) {

    try {
    
        const { filename, userId } = req.params
        const bucketName = userId

        // Define a function to get video size from MinIO
        const stat = await minioClient.statObject(bucketName, filename);
        const contentType = stat.metaData["content-type"]
        const stream = await minioClient.getObject(bucketName, filename)
        res.raw.writeHead(200, { 'Content-Type': contentType });
        stream.pipe(res.raw);
        
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}