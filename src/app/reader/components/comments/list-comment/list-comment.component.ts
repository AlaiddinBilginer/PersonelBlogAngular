import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../../services/models/comment.service';
import { CommentDetail } from '../../../../contracts/comments/commentDetail';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { IdentityService } from '../../../../services/identity.service';
import { UpdateCommentRequest } from '../../../../contracts/comments/update-comment/update-comment.request';

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
  editingCommentId: string | null = null;
  editContent: string = '';

  constructor(
    private commentService: CommentService,
    private spinnerService: NgxSpinnerService,
    private toastrService: CustomToastrService,
    public identityService: IdentityService,
    private eRef: ElementRef
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

  editComment(commentId: string, currentContent: string) {
    this.editingCommentId = commentId;
    this.editContent = currentContent; 
    this.selectedCommentId = null;
  }

  saveComment(commentId: string) {
    if(this.editContent.length > 500 || this.editContent.length == 0) {
      this.toastrService.message("Yorum en fazla 500 karakter olmalıdır veya boş olmamalıdır", "Hatalı İşlem", {
        toastrMessageType: ToastrMessageType.Info,
        toastrPosition: ToastrPosition.BottomLeft
      });
      return;
    }
    const updateCommentRequest: UpdateCommentRequest = {
      commentId: this.editingCommentId,
      content: this.editContent
    };
    this.spinnerService.show();
    this.commentService.update(updateCommentRequest).subscribe({
      next: (response) => {
        if(response.succeeded) {
          this.getAllByPostId();
          this.toastrService.message(response.message, "Başarılı", {
            toastrMessageType: ToastrMessageType.Success,
            toastrPosition: ToastrPosition.BottomLeft
          });
          this.spinnerService.hide();
        } else {
          this.toastrService.message(response.message, "Başarısız", {
            toastrMessageType: ToastrMessageType.Error,
            toastrPosition: ToastrPosition.BottomLeft
          });
          this.spinnerService.hide();
        }
      },
      error: (errorResponse) => {
        console.log(errorResponse);
        this.spinnerService.hide();
      }
    })
    this.editingCommentId = null;
    this.editContent = '';
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.editContent = '';
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

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.selectedCommentId !== null && !this.eRef.nativeElement.contains(event.target)) {
      this.selectedCommentId = null;
    }
  }
}
