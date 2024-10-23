import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { RouterModule } from '@angular/router';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    BlogsComponent,
    ListBlogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: BlogsComponent }]),
    PipesModule
  ]
})
export class BlogsModule { }
