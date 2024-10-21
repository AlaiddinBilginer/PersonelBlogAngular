import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostImagesService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  upload(files: File[], postId: string): Observable<any> {
    const formData: FormData = new FormData();

    files.forEach(file => formData.append('files', file, file.name));

    formData.append('postId', postId);

    return this.httpClientService.post<any>({
      controller: 'postImages',
      action: 'upload',
    }, formData);
  }
}
