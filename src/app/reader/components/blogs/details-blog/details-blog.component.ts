import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../../services/models/post.service';
import { DetailsPost } from '../../../../contracts/post/details-post';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details-blog',
  templateUrl: './details-blog.component.html',
  styleUrl: './details-blog.component.css'
})
export class DetailsBlogComponent implements OnInit {
  dataLoaded: boolean = false;
  detailsPost: DetailsPost;
  currentIndex: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private spinnerService: NgxSpinnerService
  ) {}

  @Output() postId: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.postId = params['blogId'];
      this.getPostById(this.postId);
    });
  }

  getPostById(blogId: string) {
    this.spinnerService.show();
    this.postService.getById(blogId).subscribe({
      next: (response) => {
        this.detailsPost = response;
        this.dataLoaded = true;
        this.spinnerService.hide();
      },
      error: (responseError) => {
        this.spinnerService.hide();
      }
    })
  }

  nextSlide() {
    if (this.currentIndex < this.detailsPost.postImages.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Son resme gelince başa dön
    }
  }
  
  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.detailsPost.postImages.length - 1; // İlk resimdeyken son resme dön
    }
  }

}
