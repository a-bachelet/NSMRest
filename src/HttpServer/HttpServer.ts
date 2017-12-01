/** Dependencies Imports */
import * as express from 'express';

export default class HttpServer {

    private _express: express.Application;
    private _expressPort: number;

    constructor(expressPort: number) {
        this._express = express();
        this._expressPort = expressPort;
    }

    public start(): void {
        this._express.listen(this._expressPort, () => {
            console.log('| Welcome On NodeServerMonitor !');
            console.log('| Server is listening on port -> ' + this._expressPort);
        });
    }

}
