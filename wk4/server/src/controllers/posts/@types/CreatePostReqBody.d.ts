export type CreatePostReqBody = {
    title: string;
    body: string;
    tags?: string[];
    isPrivate?: boolean;
};
