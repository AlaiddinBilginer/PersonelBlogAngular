import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../custom-toastr.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  constructor(
    private httpClientService: HttpClientService,
    private customToastrService: CustomToastrService
  ) {}

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    

    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          fileData.append(file.name, file, droppedFile.relativePath);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }

    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileData).subscribe({
      next: (response) => {
        this.customToastrService.message("Yükleme işlemi başarılı", "Başarılı İşlem", {
          toastrMessageType: ToastrMessageType.Success,
          toastrPosition: ToastrPosition.TopRight
        });
      },
      error: (errorResponse) => {
        this.customToastrService.message("Yükleme işlemi başarısız!", "Başarısız İşlem!", {
          toastrMessageType: ToastrMessageType.Error,
          toastrPosition: ToastrPosition.TopRight
        });
      }
    });
  }
}

export class FileUploadOptions {
  controller: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
}
