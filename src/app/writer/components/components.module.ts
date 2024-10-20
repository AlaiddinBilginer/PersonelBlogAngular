import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { RouterModule } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '../../services/common/file-upload/file-upload.module';
import { CoverPhotoUploadComponent } from './cover-photo-upload/cover-photo-upload.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    BlogCreateComponent,
    CoverPhotoUploadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: 'create-blog', component: BlogCreateComponent, canActivate: [authGuard] }]),
    FileUploadModule,
    NgxDropzoneModule,
    FormsModule
  ]
})
export class ComponentsModule { }
