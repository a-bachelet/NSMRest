/** Dependencies Imports */
import * as mongoose from 'mongoose';

export interface IRole extends mongoose.Document {
    name?: string;
    createdAt?: Date;
}

export const RoleSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name property is required.'],
        minlength: [3, 'Name property must be at least 3 characters long.'],
        maxlength: [255, 'Name property must not be longer than 255 characters.']
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Role: mongoose.Model<IRole> = mongoose.model<IRole>('Role', RoleSchema);

export default Role;
