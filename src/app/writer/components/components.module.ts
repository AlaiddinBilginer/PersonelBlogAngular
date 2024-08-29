import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BlogCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: 'create-blog', component: BlogCreateComponent }])
  ]
})
export class ComponentsModule { }
