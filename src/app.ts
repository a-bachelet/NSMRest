/** Import HttpServer */
import HttpServer from './HttpServer/HttpServer';

/** Load Env Vars */
const expressPort: number = Number(process.env.EXPRESS_PORT) || 3000;

/** Instanciation of HttpServer */
const httpServer: HttpServer = new HttpServer(expressPort);

/** Start HttpServer */
httpServer.start();
