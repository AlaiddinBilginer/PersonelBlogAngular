import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../services/common/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../services/common/local-storage.service';
import { IdentityService } from '../services/identity.service';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelper: JwtHelperService = inject(JwtHelperService);
  const router: Router = inject(Router);
  const toastrService: CustomToastrService = inject(CustomToastrService);
  const spinner: NgxSpinnerService = inject(NgxSpinnerService);
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const authService: AuthService = inject(AuthService);
  const identityService: IdentityService = inject(IdentityService);

  spinner.show();

  let token: string = localStorageService.get("accessToken");
  let refreshToken: string = localStorageService.get("refreshToken");

  let isExpired: boolean;

  try {
    isExpired = jwtHelper.isTokenExpired(token);
  } catch {
    isExpired = true;
  }


  if (isExpired && token) {    
    authService.refreshToken(refreshToken).subscribe({
      next: (response: any) => {
        if (response.succeeded) {
          localStorageService.set("accessToken", response.token.accessToken);
          localStorageService.set("refreshToken", response.token.refreshToken);
          token = localStorageService.get("accessToken");
          refreshToken = localStorageService.get("refreshToken");
          isExpired = false;
          identityService.checkIdentity();
        } else {
          router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          localStorageService.remove("accessToken");
          localStorageService.remove("refreshToken");
        }
      },
      error: responseError => {
        console.log(responseError);
      }
    })
  }

  if(!identityService.isAuthenticated) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    toastrService.message("Oturum açmanız gerekiyor", "Yetkisiz Erişim", {
      toastrMessageType: ToastrMessageType.Info,
      toastrPosition: ToastrPosition.TopLeft
    });
    spinner.hide();
    return false;
  }

  spinner.hide();
  return true;
};
