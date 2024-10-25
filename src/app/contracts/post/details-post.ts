import { Comment } from "../comments/comment";
import { PostImage } from "../post-images/post-imge";
import { Tag } from "../tags/tag";

export class DetailsPost {
  id: string;
  title: string;
  content: string;
  createdDate: Date;
  updatedDate: Date;
  comments: Comment[];
  tags: Tag[];
  postImages: PostImage[];
}