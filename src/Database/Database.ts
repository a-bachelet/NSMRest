/** Classes Imports */
import Console from '../Console/Console';

/** Dependencies Imports */
import * as mongodb from 'mongodb';
import * as mongoose from 'mongoose';

export default class Database {

    private _console: Console;

    private _mongooseUrl: string;

    constructor(mongooseUrl: string) {
        this._console = new Console();
        this._mongooseUrl = mongooseUrl;
    }

    public connect(): Promise<mongodb.MongoError | null> {
        return new Promise((resolve, reject) => {
            mongoose.connect(this._mongooseUrl, { useMongoClient: true }, (err: mongodb.MongoError) => {
                if (err) {
                    reject(err);
                } else {
                    this._console
                    .success('|            -> Successfully connected to MongoDB database at : ' + this._mongooseUrl);
                    resolve(null);
                }
            });
        });
    }

}
