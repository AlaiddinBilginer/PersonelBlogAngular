import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../../services/models/comment.service';
import { ListCommentResponse } from '../../../../contracts/comments/list-comment/list-comment-response';
import { CommentDetail } from '../../../../contracts/comments/commentDetail';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { IdentityService } from '../../../../services/identity.service';

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

  selectedCommentId: string | null = null;

  constructor(
    private commentService: CommentService,
    private spinnerService: NgxSpinnerService,
    private toastrService: CustomToastrService,
    public identityService: IdentityService,
  ) {
    identityService.checkIdentity()
  }

  @Input() postId: string;

  ngOnInit(): void {
    this.getAllByPostId();
  }

  getAllByPostId() {
    this.spinnerService.show();
    this.commentService.getAllByPostId(this.postId, this.page, this.size).subscribe({
      next: (response) => {
        this.comments = response.comments;
        this.totalCommentCount = response.totalCommentCount;
        this.spinnerService.hide();
      },
      error: (responseError) => {
        console.log(responseError);
        this.spinnerService.hide();
      }
    });
  }

  toggleMenu(commentId: string) {
    this.selectedCommentId = this.selectedCommentId === commentId ? null : commentId;
  }

  editComment(comment: any) {
    console.log('Düzenlenecek yorum:', comment);
    this.selectedCommentId = null; // Menü kapanır
  }

  deleteComment(id: string) {
    this.commentService.delete(id).subscribe({
      next: (response) => {
        if(response.succeeded) {
          this.toastrService.message("Başarılı", response.message, {
            toastrMessageType: ToastrMessageType.Success,
            toastrPosition: ToastrPosition.BottomLeft,
          });
          this.getAllByPostId();
        } else {
          this.toastrService.message("Başarısız", response.message, {
            toastrMessageType: ToastrMessageType.Error,
            toastrPosition: ToastrPosition.BottomLeft,
          });
        }
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      }
    })
    this.selectedCommentId = null;
  }
}
