import  mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        roles: {
            type: String,
            default: null
        }
    },
        {timestamps: true} 
);

export const UserModel = mongoose.model('users', userSchema);