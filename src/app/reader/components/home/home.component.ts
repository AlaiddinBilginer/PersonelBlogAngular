import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../contracts/tags/tag';
import { TagService } from '../../../services/models/tag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  tags: Tag[];
  isDataLoaded: boolean = false;

  constructor(
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.GetTags(20);
  }

  GetTags(count: number) {
    this.tagService.GetTags(count).subscribe({
      next: (response) => {
        console.log(response);
        this.tags = response.tags;
        this.isDataLoaded = true;
      },
      error: (errorResponse) => {
        console.log(errorResponse)
      }
    })
  }

}
