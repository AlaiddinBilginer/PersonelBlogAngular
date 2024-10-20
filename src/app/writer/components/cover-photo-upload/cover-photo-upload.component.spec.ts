import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverPhotoUploadComponent } from './cover-photo-upload.component';

describe('CoverPhotoUploadComponent', () => {
  let component: CoverPhotoUploadComponent;
  let fixture: ComponentFixture<CoverPhotoUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoverPhotoUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoverPhotoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
