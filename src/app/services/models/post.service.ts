import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Observable } from 'rxjs';
import { ListPost } from '../../contracts/list-post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private httpClientService: HttpClientService) { }

  getAll(page: number = 0, size: number = 5) : Observable<{totalCount: number; posts: ListPost[]}> {
    return this.httpClientService.get<{totalCount: number, posts: ListPost[]}>({
      controller: 'posts',
      queryString: `pagination.page=${page}&pagination.size=${size}`
    });
  }
}
