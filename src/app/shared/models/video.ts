export class Video {
    constructor(videographerId, url, title, description) {
        this.videographerId = videographerId;
        this.url = url;
        this.title = title;
        this.description = description
    }

    id: number;
    videographerId: number;
    url: string;
    title: string;
    description: string;
}
