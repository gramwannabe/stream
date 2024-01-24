import { stream } from "../handlers/stream.handler.js";

const routes = async (app, options) => {
  app.route({
    method: 'GET',
    url: '/stream/:userId/:filename',
    handler: stream
  });

};

export default routes;