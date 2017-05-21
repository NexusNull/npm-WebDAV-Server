import { IUserManager } from '../IUserManager'
import { SimpleUser } from './SimpleUser'
import { IUser } from '../IUser'

export class SimpleUserManager implements IUserManager
{
    protected users : any

    constructor()
    {
        this.users = {
            __default: new SimpleUser('DefaultUser', null, false, true)
        };
    }

    getUserByName(name : string, callback : (error : Error, user : IUser) => void)
    {
        if(!this.users[name])
            callback(new Error('User not found'), null);
        else
            callback(null, this.users[name]);
    }
    getDefaultUser(callback : (user : IUser) => void)
    {
        callback(this.users.__default);
    }

    addUser(name : string, password : string, isAdmin : boolean = false)
    {
        this.users[name] = new SimpleUser(name, password, isAdmin, false);
    }

    getUsers(callback : (error : Error, users : IUser[]) => void)
    {
        const users = [];

        for(const name in this.users)
            users.push(this.users[name]);

        callback(null, users);
    }
}