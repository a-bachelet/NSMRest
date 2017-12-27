/** Dependencies Imports */
import * as mongoose from 'mongoose';

/** Interfaces Imports */
import { IRole } from './Role';

export interface IUser extends mongoose.Document {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: IRole;
    createdAt?: Date;
    loginToken?: string;
    validUntil?: Date;
}

export const UserSchema: mongoose.Schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name property is required'],
        minlength: [3, 'First Name property needs to be at least 3 characters long.'],
        maxlength: [255, 'First Name property must not be more than 255 characters long.']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name property is required'],
        minlength: [3, 'Last Name property needs to be at least 3 characters long.'],
        maxlength: [255, 'Last Name property must not be more than 255 characters long.']
    },
    email: {
        type: String,
        unqiue: true,
        required: [true, 'Email property is required'],
        minlength: [3, 'Email property needs to be at least 3 characters long.'],
        maxlength: [255, 'Email property must not be more than 255 characters long.']
    },
    password: {
        type: String,
        required: [true, 'Password property is required'],
        minlength: [8, 'Password needs to be at least 3 characters long.'],
        maxlength: [64, 'Password property must not be more than 64 characters long.']
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'Role property is required']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    loginToken: {
        type: String,
        unique: true,
        sparse: true,
        index: true
    },
    validUntil: {
        type: Date
    }
});

const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;
