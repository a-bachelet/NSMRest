/** Classes Imports */
import AbstractRestEntity from './AbstractRestEntity';

/** Interfaces Imports */
import INoParamConstructor from '../Interfaces/INoParamConstructor';

export default abstract class AbstractRestController<T extends AbstractRestEntity> {

    constructor(private _ctor: INoParamConstructor<T>, protected _tableName: string) {}

    protected getNewEntity(): T {
        const newEntity: T = new this._ctor();
        return newEntity;
    }

    protected convertToEntity(obj: any): T {
        const newEntity = this.getNewEntity();
        newEntity.hydrate(obj);
        return newEntity;
    }

    protected convertToEntityCollection(objCollection: any[]): T[] {
        const newEntityCollection: T[] = [];
        objCollection.forEach((obj: any) => {
            const newEntity = this.getNewEntity();
            newEntity.hydrate(obj);
            newEntityCollection.push(newEntity);
        });
        return newEntityCollection;
    }
}
