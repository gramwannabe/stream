import * as Minio from 'minio'
import { minioAccessKey, minioHost, minioPort, minioSecretKey, minioUseSsl } from '../configs/minio.config.js';
import { DIVIDER_STREAM } from '../helpers/common.constant.js';

// Configure MinIO client
const minioClient = new Minio.Client({
    endPoint: minioHost,
    port: minioPort,
    useSSL: minioUseSsl,
    accessKey: minioAccessKey,
    secretKey: minioSecretKey,
});

export async function stream(req, res) {

    try {
        const range = req.headers.range;
        if (!range) {
            res.status(400).send("Requires Range header");
            return;
        }

        const { filename, userId } = req.params
        // const { userId } = req.query
        // const validateTokenResponse = await this.validateToken(t)

        // Your MinIO bucket and video file details
        // const bucketName = validateTokenResponse.data.user_id;
        const bucketName = userId

        // Define a function to get video size from MinIO
        const stat = await minioClient.statObject(bucketName, filename);
        const videoSize = stat.size;
        
        const chunkSize = (videoSize / DIVIDER_STREAM) * 1e6; // 1 * 1e6 1MB; 92500 is a magic number
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + chunkSize, videoSize - 1);
        const contentLength = end - start + 1;

        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        };

        // Stream video from MinIO
        const stream = await minioClient.getPartialObject(bucketName, filename, start, end);
        res.raw.writeHead(206, headers);
        stream.pipe(res.raw);
        
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}