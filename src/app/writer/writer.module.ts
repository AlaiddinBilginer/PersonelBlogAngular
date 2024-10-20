import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class WriterModule { }
