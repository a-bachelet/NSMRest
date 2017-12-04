export default abstract class AbstractRestEntity {

    public _id: string | null = null;

    constructor(obj?: any) {
        if (obj) {
            this.hydrate(obj);
        }
    }

    public hydrate(obj: any): void {
        for (const key in this) {
            if (typeof(this[key] !== 'function') && obj[key]) {
                this[key] = obj[key];
            }
        }
    }

}
