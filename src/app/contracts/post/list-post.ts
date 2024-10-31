export interface ListPost {
  id: string;
  title: string;
  content: string;
  firstImage: string;
  createdDate: Date;
  applicationUserId: string;
  userName: string;
  firstName?: string;
  lastName?: string;
}