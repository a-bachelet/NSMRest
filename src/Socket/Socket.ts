/** Dependencies Imports */
import * as http from 'http';
import * as os from 'os';
import * as socketIo from 'socket.io';

/** Classes Imports */
import Console from '../Console/Console';

export default class Socket {

    private _console: Console;
    private _server: http.Server;

    constructor(server: http.Server) {
        this._console = new Console();
        this._server = server;
    }

    public start(): void {
        this._console.info('| (i) SocketIO Server Initialization started...' + '\n');

        const io = socketIo.listen(this._server);
        io.on('connection', (client) => {
            let memoryInterval: any = null;
            let cpuInterval: any = null;

            this._console.info('| (i) SocketIO : Client Connected -> ' + client.client.id);

            client.on('disconnect', (reason) => {
                clearInterval(memoryInterval);
                clearInterval(cpuInterval);
                this._console.error('| (q) SocketIO : Client Disconnected ->' + client.client.id);
            });

            client.on('memory', () => {
                this._console.info('| (i) SocketIO : ' + client.client.id + ' -> Start Emiting Memory Info');
                client.emit('memory', {
                    totalMem: os.totalmem(),
                    freeMem: os.freemem()
                });
                memoryInterval = setInterval(() => {
                    client.emit('memory', {
                        totalMem: os.totalmem(),
                        freeMem: os.freemem()
                    });
                }, 4000);
            });

            client.on('stopMemory', () => {
                clearInterval(memoryInterval);
                this._console.info('| (i) SocketIO : ' + client.client.id + ' -> Start Emiting Memory Info');
            });

            client.on('cpu', () => {
                this._console.info('| (i) SocketIO : ' + client.client.id + ' -> Start Emiting Cpu Info');
                client.emit('cpu', {
                    cpu: os.cpus()
                });
                cpuInterval = setInterval(() => {
                    client.emit('cpu', {
                        cpu: os.cpus()
                    });
                }, 4000);
            });

            client.on('stopCpu', () => {
                clearInterval(cpuInterval);
                this._console.info('| (i) SocketIO : ' + client.client.id + ' -> Stop Emiting Cpu Info');
            });

        });

        this._console.success('| (s) SocketIO Server successfully initialized !' + '\n');
    }

}
