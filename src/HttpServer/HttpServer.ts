/** Classes Imports */
import Console from '../Console/Console';

/** Dependencies Imports */
import * as express from 'express';

export default class HttpServer {

    private _console: Console;

    private _express: express.Application;
    private _expressPort: number;

    constructor(expressPort: number) {
        this._console = new Console();
        this._express = express();
        this._expressPort = expressPort;
    }

    public start(): void {
        this._console.success('| (s) Welcome On NodeServerMonitor !' + '\n');
        this._express.listen(this._expressPort, () => {
            this._console.success('| (s) Server is listening on port -> ' + this._expressPort);
        });
    }

}
