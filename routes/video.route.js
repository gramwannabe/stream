import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = async (app, options) => {
    app.route({
        method: 'GET',
        url: '/test/video',
        handler: async (req, res) => {
            res.type('text/html').send(fs.readFileSync('index.html'))
        }
    });

};

export default routes;