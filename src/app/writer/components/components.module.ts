import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { RouterModule } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';

@NgModule({
  declarations: [
    BlogCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: 'create-blog', component: BlogCreateComponent, canActivate: [authGuard] }])
  ]
})
export class ComponentsModule { }
