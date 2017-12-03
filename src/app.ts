/** Import HttpServer */
import HttpServer from './HttpServer/HttpServer';

/** Load Env Vars */
const databaseUrl: string = 'mongodb://localhost/NodeServerMonitor' ||  process.env.DATABASE_URL;
const httpPort: number = Number(process.env.HTTP_PORT) || 3000;

/** Instanciation of HttpServer */
const httpServer: HttpServer = new HttpServer(databaseUrl, httpPort);

/** Start HttpServer */
httpServer.start();
