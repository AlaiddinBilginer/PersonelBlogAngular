import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { CreateCommentRequest } from '../../contracts/comments/create-comment-request';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../contracts/common/responseModel';
import { ListCommentResponse } from '../../contracts/comments/list-comment/list-comment-response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  create(createCommentRequest: CreateCommentRequest) : Observable<ResponseModel> {
    return this.httpClientService.post<ResponseModel>({
      controller: 'comments',
      action: 'add'
    }, createCommentRequest)
  }

  getAllByPostId(postId: string, page: number = 0, size: number = 10) : Observable<ListCommentResponse> {
    return this.httpClientService.get<ListCommentResponse>({
      controller: 'comments',
      action: 'getAllByPostId',
      queryString: `postId=${postId}&pagination.page=${page}&pagination.size=${size}`
    });
  }
}
