import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/models/post.service';
import { CreatePostRequest } from '../../../contracts/post/create-post-request';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent {
  blogForm: FormGroup;
  isBlogSaved: boolean = false;
  isPhotosSaved: boolean = false;
  tags: string[] = [];

  tagInput: string = '';
  allTags: string[] = ['Teknoloji', 'Yapay Zeka', 'Eğitim', 'Tarih', 'Girişimcilik'];
  filteredTags: string[] = [];
  selectedTags: string[] = [];
  isTagDropdownOpen: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private toastrService: CustomToastrService,
    private eRef: ElementRef,
    private spinnerService: NgxSpinnerService
  ) {
    this.blogForm = formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  saveBlog() {
    if (this.blogForm.valid) {
      this.spinnerService.show();
      const createPostRequest: CreatePostRequest = this.blogForm.value;
      this.postService.create(createPostRequest).subscribe({
        next: (response) => {
          this.spinnerService.hide();
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
        toastrPosition: ToastrPosition.TopRight
      });
    }
  }

  onUploadComplete(success: boolean) {
    if (success) {
      this.isPhotosSaved = true;
    }
  }

  filterTags() {
    if (!this.tagInput.trim()) {
      this.isTagDropdownOpen = false;
      return;
    }
    this.filteredTags = this.allTags.filter(tag => 
      tag.toLowerCase().includes(this.tagInput.toLowerCase()) && !this.selectedTags.includes(tag)
    );
    this.isTagDropdownOpen = this.filteredTags.length > 0;
  }

  addTag(tag: string) {
    tag = tag.trim();
    if (tag && !this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
    }
    this.clearTagInput();
  }

  selectTag(tag: string) {
    this.addTag(tag);
    this.clearTagInput();
  }

  removeTag(tag: string) {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
  }

  clearTagInput() {
    this.tagInput = '';
    this.filteredTags = [];
    this.isTagDropdownOpen = false;
  }
}
