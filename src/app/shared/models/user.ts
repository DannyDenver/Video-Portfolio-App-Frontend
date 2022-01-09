
export class User {
    constructor(id, firstName, lastName, profilePic) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePic = profilePic
    }

    id: string;
    firstName?: string;
    lastName?: string;
    profilePic?: string;
    email?: string;
    coverPhoto?: string;
}
