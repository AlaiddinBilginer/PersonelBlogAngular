import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Observable } from 'rxjs';
import { ListPost } from '../../contracts/list-post';
import { CreatePostRequest } from '../../contracts/post/create-post-request';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private httpClientService: HttpClientService) { }

  getAll(page: number = 0, size: number = 9) : Observable<{totalCount: number; posts: ListPost[]}> {
    return this.httpClientService.get<{totalCount: number, posts: ListPost[]}>({
      controller: 'posts',
      action: 'GetAll',
      queryString: `pagination.page=${page}&pagination.size=${size}`
    });
  }

  create(createPostRequest: CreatePostRequest) {
    return this.httpClientService.post({
      controller: 'posts',
      action: 'create'
    }, createPostRequest);
  }
}
