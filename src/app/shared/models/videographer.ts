import { Video } from './video';

export class Videographer {
    constructor(id, firstName, lastName, location, bio, pictureUrl, email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.location = location,
        this.bio = bio;
        this.pictureUrl = pictureUrl
        this.email = email
    }

    id: string;
    createdBy?: string;
    firstName?: string;
    lastName?: string;
    location?: string;
    bio?: string;
    pictureUrl?: string;
    email?: string
}
