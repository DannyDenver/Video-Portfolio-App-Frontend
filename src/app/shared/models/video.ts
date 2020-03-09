export class Video {
    constructor(videographerId, title, description, videoId?, genre?, order?) {
        this.videographerId = videographerId;
        this.title = title;
        this.description = description;
        this.id = videoId;
        this.genre = genre;
        this.order = order;
    }

    id: string;
    videographerId: string;
    url: string;
    title: string;
    description: string;
    timestamp: string;
    profilePic: string;
    firstName: string;
    lastName: string;
    genre: string;
    order?: number;
}
