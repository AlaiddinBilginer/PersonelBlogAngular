import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { RouterModule } from '@angular/router';
import { ListBlogComponent } from './list-blog/list-blog.component';

@NgModule({
  declarations: [
    BlogsComponent,
    ListBlogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: BlogsComponent }])
  ]
})
export class BlogsModule { }
