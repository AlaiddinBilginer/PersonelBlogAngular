import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostImagesService } from '../../../services/models/post-images.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cover-photo-upload',
  templateUrl: './cover-photo-upload.component.html',
  styleUrl: './cover-photo-upload.component.css'
})
export class CoverPhotoUploadComponent {
  files: File[] = [];

  constructor(
    private postImagesService: PostImagesService,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService
  ) {}

  @Output() uploadComplete: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() blogId: string;

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  uploadPhotos() {
    this.spinnerService.show();
    this.postImagesService.upload(this.files, this.blogId).subscribe({
      next: (response) => {
        this.spinnerService.hide();
        this.uploadComplete.emit(true);
        this.toastrService.message(response.message, "Başarılı İşlem", {
          toastrMessageType: ToastrMessageType.Success,
          toastrPosition: ToastrPosition.TopRight
        });
      },
      error: (responseError) => {
        this.spinnerService.hide();
        this.uploadComplete.emit(false);
        this.toastrService.message(responseError.message, "Başarısız İşlem!", {
          toastrMessageType: ToastrMessageType.Error,
          toastrPosition: ToastrPosition.TopRight
        });
      }
    })
  }
}