import { User } from './user';
import { stringify } from 'querystring';

export class Commenter extends User {
    constructor(id, firstName, lastName, profilePic, state) {
        super(id, firstName, lastName, profilePic);
        this.state = state;
    }

    state?:string;
}