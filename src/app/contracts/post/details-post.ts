import { Comment } from "../comments/comment";
import { PostImage } from "../post-images/post-imge";
import { Tag } from "../tags/tag";

export class DetailsPost {
  id: string;
  title: string;
  content: string;
  createdDate: Date;
  updatedDate: Date;
  tags: Tag[];
  postImages: PostImage[];
  userName: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
}