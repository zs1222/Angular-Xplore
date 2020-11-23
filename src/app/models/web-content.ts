export class WebContent {
    name: string;
    thumbnailUrl: string;
    onClickUrl: string;

    constructor(name: string, thumbnailUrl: string, onClickUrl) {
        this.name = name;
        this.thumbnailUrl = thumbnailUrl;
        this.onClickUrl = onClickUrl;
    }
}