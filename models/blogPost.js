export interface BlogPost {
    id: number;
    date_posted: Date;
    user: string;
    post_subject: string;
    post_body: string;
    // TODO: fix data model naming before prod
}
