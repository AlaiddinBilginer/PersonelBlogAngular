import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { RouterModule } from '@angular/router';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { DetailsBlogComponent } from './details-blog/details-blog.component';

@NgModule({
  declarations: [
    BlogsComponent,
    ListBlogComponent,
    DetailsBlogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        { path: '', component: BlogsComponent },
        { path: 'details/:blogId', component: DetailsBlogComponent}
      ]
    ),
    PipesModule
  ]
})
export class BlogsModule { }
