import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCommentComponent } from './list-comment/list-comment.component';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    CreateCommentComponent,
    ListCommentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ],
  exports: [
    CreateCommentComponent,
    ListCommentComponent
  ]
})
export class CommentsModule { }
