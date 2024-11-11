import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { IdentityService } from '../../../services/identity.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;
  isProfileMenuOpen = false;

  constructor(
    public identityService: IdentityService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private toastrService: CustomToastrService,
    private eRef: ElementRef
  ) {
    identityService.checkIdentity();
  }

  signOut() {
    this.localStorageService.remove("accessToken");
    this.identityService.checkIdentity();
    this.router.navigate(["/"]);
    this.toastrService.message("Başarı ile çıkış yapıldı", "Çıkış Başarılı", {
      toastrMessageType: ToastrMessageType.Info,
      toastrPosition: ToastrPosition.BottomRight
    });
    this.isProfileMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.isProfileMenuOpen = false;
    }
  }
}
