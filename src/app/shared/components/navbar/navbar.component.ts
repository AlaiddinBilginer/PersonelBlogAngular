import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;
  isProfileMenuOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private toastrService: CustomToastrService
  ) {
    authService.checkIdentity();
  }

  signOut() {
    this.localStorageService.remove("accessToken");
    this.authService.checkIdentity();
    this.router.navigate(["/"]);
    this.toastrService.message("Başarı ile çıkış yapıldı", "Çıkış Başarılı", {
      toastrMessageType: ToastrMessageType.Warning,
      toastrPosition: ToastrPosition.BottomRight
    })
  }

  goRoute() {
    if(this.localStorageService.get("accessToken")) {
      this.router.navigate(["/writer/create-blog"])
    }
    else {
      this.router.navigate(["/login"]);
      this.toastrService.message(
        "Blog yazabilmek için sisteme giriş yapmanız gerekmektedir", "Giriş Sayfasına Yönlendirildiniz", 
      {
        toastrMessageType: ToastrMessageType.Info,
        toastrPosition: ToastrPosition.TopLeft
      })
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
}
