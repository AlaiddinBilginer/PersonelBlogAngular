import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/models/post.service';
import { ListPost } from '../../../../contracts/post/list-post';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrl: './list-blog.component.css'
})
export class ListBlogComponent implements OnInit {
  posts: ListPost[];
  currentPageNo: number = 1;
  totalCount: number;
  totalPageCount: number;
  pageSize: number = 6;
  pageList: number[] = [];

  constructor(
    private postService: PostService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? '1', 10);
      this.getAll(this.currentPageNo - 1);
    });
  }

  getAll(pageNo: number) {
    this.spinnerService.show();
    this.postService.getAll(pageNo, this.pageSize).subscribe({
      next: (response) => {
        this.posts = response.posts;
        this.spinnerService.hide();
        this.totalCount = response.totalCount;
        this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);
        this.generatePageList();
      },
      error: (responseError) => {
        console.log(responseError);
        this.spinnerService.hide();
      }
    });
  }

  generatePageList() {
    this.pageList = [];
    
    const startPage = Math.max(1, this.currentPageNo - 3);
    const endPage = Math.min(this.totalPageCount, this.currentPageNo + 3);

    for (let i = startPage; i <= endPage; i++) {
      this.pageList.push(i);
    }
  }

  goToPreviousPage() {
    if (this.currentPageNo > 1) {
      this.router.navigate(['/blogs', this.currentPageNo - 1]);
    }
  }

  goToNextPage() {
    if (this.currentPageNo < this.totalPageCount) {
      this.router.navigate(['/blogs', this.currentPageNo + 1]);
    }
  }
}
