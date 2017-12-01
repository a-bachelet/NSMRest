export default class Console {

    private reset = '\x1b[0m';
    private fgRed = '\x1b[31m';
    private fgGreen = '\x1b[32m';
    private fgYellow = '\x1b[33m';
    private fgCyan = '\x1b[36m';

    public action(text: string): void { this.modify(this.fgYellow, text); }

    public error(text: string): void { this.modify(this.fgRed, text); }

    public info(text: string): void { this.modify(this.fgCyan, text); }

    public success(text: string): void { this.modify(this.fgGreen, text); }

    private modify(modification: string, text: string): void { console.log(modification + '%s' + this.reset, text); }

}
