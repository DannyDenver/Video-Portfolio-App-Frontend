export class Videographer {
    constructor(firstName, lastName, location, bio, profilePictureUrl) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.location = location,
        this.bio = bio;
        this.profilePictureUrl = profilePictureUrl
    }
    
    firstName: string;
    lastName: string;
    location: string;
    bio: string;
    profilePictureUrl: string;
}
