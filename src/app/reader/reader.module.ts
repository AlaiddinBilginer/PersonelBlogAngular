import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { BlogsModule } from './components/blogs/blogs.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    BlogsModule
  ]
})
export class ReaderModule { }
