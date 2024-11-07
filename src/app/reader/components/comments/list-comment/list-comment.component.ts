import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../../services/models/comment.service';
import { ListCommentResponse } from '../../../../contracts/comments/list-comment/list-comment-response';
import { CommentDetail } from '../../../../contracts/comments/commentDetail';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrl: './list-comment.component.css'
})
export class ListCommentComponent implements OnInit {
  comments: CommentDetail[];
  totalCommentCount: number;
  page: number = 0;
  size: number = 10;

  constructor(
    private commentService: CommentService
  ) {}

  @Input() postId: string;

  ngOnInit(): void {
    this.getAllByPostId();
  }

  getAllByPostId() {
    this.commentService.getAllByPostId(this.postId, this.page, this.size).subscribe({
      next: (response) => {
        this.comments = response.comments;
        this.totalCommentCount = response.totalCommentCount;
      },
      error: (responseError) => {
        console.log(responseError);
      }
    });
  }
}
