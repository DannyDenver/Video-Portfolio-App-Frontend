export class Video {
    constructor(videographerId, title, description, videoId?) {
        this.videographerId = videographerId;
        this.title = title;
        this.description = description,
        this.id = videoId
    }

    id: string;
    videographerId: string;
    url: string;
    title: string;
    description: string;
    timestamp: string;
}
