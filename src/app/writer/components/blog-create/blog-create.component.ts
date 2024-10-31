import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/models/post.service';
import { CreatePostRequest } from '../../../contracts/post/create-post-request';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreatePostResponse } from '../../../contracts/post/create-post-response';
import { TagService } from '../../../services/models/tag.service';
import { CreateTagRequest } from '../../../contracts/tags/create-tag-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent {
  blogForm: FormGroup;
  isBlogSaved: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService,

  ) {
    this.blogForm = formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  @Output() blogId: string;
  @Output() isPhotosSaved: boolean = false;

  saveBlog() {
    if (this.blogForm.valid) {
      this.spinnerService.show();
      const createPostRequest: CreatePostRequest = this.blogForm.value;
      this.postService.create(createPostRequest).subscribe({
        next: (response: CreatePostResponse) => {
          this.spinnerService.hide();
          this.blogId = response.id;
          this.isBlogSaved = true;
          this.toastrService.message(
            "Blog başarılı bir şekilde eklendi. Lütfen sıradaki işlemleri tamamlayınız.",
            "Başarılı Kaydetme",
            {
              toastrMessageType: ToastrMessageType.Success,
              toastrPosition: ToastrPosition.TopRight
            }
          );
        },
        error: (responseError) => {
          this.spinnerService.hide();
          console.log(responseError);
        }
      });
    } else {
      this.toastrService.message("Geçersiz değerler girdiniz", "Geçersiz İşlem", {
        toastrMessageType: ToastrMessageType.Warning,
        toastrPosition: ToastrPosition.BottomLeft
      });
    }
  }

  onUploadComplete(success: boolean) {
    if (success) {
      this.isPhotosSaved = true;
    }
  }
}
