import { CommentDetail } from "../commentDetail";

export class ListCommentResponse {
  totalCommentCount: number;
  comments: CommentDetail[];
}