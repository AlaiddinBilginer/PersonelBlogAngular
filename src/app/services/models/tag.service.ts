import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { CreateTagRequest } from '../../contracts/tags/create-tag-request';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../contracts/common/responseModel';
import { Tag } from '../../contracts/tags/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClientService: HttpClientService ) { }

  CreateTags(createTagRequest: CreateTagRequest) : Observable<ResponseModel> {
    return this.httpClientService.post<ResponseModel>({
      controller: "tags",
      action: "createTags",
    }, createTagRequest);
  }

  GetTags(count: number): Observable<{ successs: boolean, tags: Tag[] }> {
    return this.httpClientService.get<{ successs: boolean, tags: Tag[] }>({
      controller: "tags",
      action: "getTags",
      queryString: `count=${count}`
    });
  }
}
