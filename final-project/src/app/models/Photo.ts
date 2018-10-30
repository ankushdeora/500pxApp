import { Images } from './Images';
import { comments } from './comments';
export class Photo {
    id: number;
    user_id: number;
    name: string;
    description: string;
    camera: string;
    taken: string;
    image_url: string;
    votes_count: number;
    images: Images[];
    created_at: string;
    created_at_date: Date;
    tags: Array<string>;
    comments: comments;
}