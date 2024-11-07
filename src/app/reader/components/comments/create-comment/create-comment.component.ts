import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../../services/models/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { CreateCommentRequest } from '../../../../contracts/comments/create-comment-request';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css'
})
export class CreateCommentComponent implements OnInit {
  commentForm: FormGroup;

  constructor(
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService
  ) {
    this.commentForm = formBuilder.group({
      content: ['', 
        [Validators.required, Validators.maxLength(500)]
      ]
    })
  }

  @Input() postId: string;

  ngOnInit(): void {
  }

  createComment() {
    if(this.commentForm.valid) {
      this.spinnerService.show();
      const createCommentRequest: CreateCommentRequest = this.commentForm.value;
      createCommentRequest.postId = this.postId;
      this.commentService.create(createCommentRequest).subscribe({
        next: (response) => {
          this.spinnerService.hide();
          this.commentForm.reset();
          this.toastrService.message('Başarılı', response.message, {
            toastrMessageType: ToastrMessageType.Success,
            toastrPosition: ToastrPosition.BottomRight
          });
        },
        error: (responseError) => {
          this.spinnerService.hide();
          this.toastrService.message('Hata', responseError.message, {
            toastrMessageType: ToastrMessageType.Error,
            toastrPosition: ToastrPosition.BottomLeft
          });
        }
      })
    } else {
      this.toastrService.message('Geçersiz İşlem', "Yorumunuzun içeriği geçersiz", {
        toastrMessageType: ToastrMessageType.Error,
        toastrPosition: ToastrPosition.BottomLeft
      });
    }
  }
}
