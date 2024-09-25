import { Component } from '@angular/core';
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
    private toastrService: CustomToastrService
  ) {
    identityService.checkIdentity();
  }

  signOut() {
    this.localStorageService.remove("accessToken");
    this.identityService.checkIdentity();
    this.router.navigate(["/"]);
    this.toastrService.message("Başarı ile çıkış yapıldı", "Çıkış Başarılı", {
      toastrMessageType: ToastrMessageType.Warning,
      toastrPosition: ToastrPosition.BottomRight
    });
    this.isProfileMenuOpen = false;
  }

  // goRoute() {
  //   if(this.localStorageService.get("accessToken")) {
  //     this.router.navigate(["/writer/create-blog"])
  //   }
  //   else {
  //     this.router.navigate(["/login"]);
  //     this.toastrService.message(
  //       "Blog yazabilmek için sisteme giriş yapmanız gerekmektedir", "Giriş Sayfasına Yönlendirildiniz", 
  //     {
  //       toastrMessageType: ToastrMessageType.Info,
  //       toastrPosition: ToastrPosition.TopLeft
  //     })
  //   }
  // }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
}
