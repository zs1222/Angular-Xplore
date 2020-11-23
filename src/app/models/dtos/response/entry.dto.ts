import { Asset } from 'contentful';

export interface EntryDto {
    title: string;
    description: string;
    videoId: string;
    media: Asset;
}
