import { Video } from './video';

export class Videographer {
    constructor(id, firstName, lastName, location, bio, profilePic) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.location = location,
        this.bio = bio;
        this.profilePic = profilePic
    }

    id: string;
    firstName?: string;
    lastName?: string;
    location?: string;
    bio?: string;
    profilePic?: string;
    email?: string;
    coverPhoto?: string;
}
