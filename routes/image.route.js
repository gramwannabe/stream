import { image } from "../handlers/image.handler.js";

const routes = async (app, options) => {
  app.route({
    method: 'GET',
    url: '/image/:userId/:filename',
    handler: image
  });

};

export default routes;