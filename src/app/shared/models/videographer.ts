import { Video } from './video';
import { User } from './user';

export class Videographer extends User {
    constructor(id, firstName, lastName, camera, school, location, bio, profilePic) {
        super(id, firstName, lastName, profilePic);
        this.location = location;
        this.bio = bio;
        this.camera = camera;
        this.school = school;
    }

    camera?: string;
    school?: string;
    location?: string;
    bio?: string;
}
