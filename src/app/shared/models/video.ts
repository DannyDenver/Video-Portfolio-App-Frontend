export class Video {
    constructor(videographerId, title, description) {
        this.videographerId = videographerId;
        this.title = title;
        this.description = description
    }

    id: string;
    videographerId: string;
    url: string;
    title: string;
    description: string;
    timestamp: string;
}
