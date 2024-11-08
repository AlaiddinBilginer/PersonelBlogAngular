export class CommentDetail {
  id: string;
  applicationUserId: string;
  content: string;
  createdDate: Date;
  updatedDate: Date;
  userName: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
}