import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/models/post.service';
import { ListPost } from '../../../../contracts/list-post';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrl: './list-blog.component.css'
})
export class ListBlogComponent implements OnInit {
  posts: ListPost[];

  constructor(
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.postService.getAll().subscribe({
      next: (respnonse) => {
        this.posts = respnonse.posts;
      },
      error: (responseError) => {
        console.log(responseError);
      }
    })
  }

}
