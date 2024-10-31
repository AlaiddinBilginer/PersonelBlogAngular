import { Component, Input } from '@angular/core';
import { TagService } from '../../../services/models/tag.service';
import { Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateTagRequest } from '../../../contracts/tags/create-tag-request';

@Component({
  selector: 'app-create-tags',
  templateUrl: './create-tags.component.html',
  styleUrl: './create-tags.component.css'
})
export class CreateTagsComponent {
  tagInput: string = '';
  selectedTags: string[] = [];

  constructor(
    private tagService: TagService,
    private router: Router,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService,
  ) {}

  @Input() blogId: string;
  @Input() isPhotosSaved: boolean;

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
  }

  createTags() {
    this.spinnerService.show();
    const createTagRequest: CreateTagRequest = {
      postId: this.blogId,
      tags: this.selectedTags
    };

    this.tagService.CreateTags(createTagRequest).subscribe({
      next: (response) => {
        this.toastrService.message("Başarılı", response.message, {
          toastrMessageType: ToastrMessageType.Success,
          toastrPosition: ToastrPosition.TopRight
        });
        this.spinnerService.hide();
        this.router.navigate([`/blogs/details/${this.blogId}`]);
      },
      error: (responseError) => {
        this.toastrService.message("Başarısız", responseError.message, {
          toastrMessageType: ToastrMessageType.Error,
          toastrPosition: ToastrPosition.TopRight
        })
      }
    });
  }
}
