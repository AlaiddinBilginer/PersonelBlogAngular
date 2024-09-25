import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../services/common/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../services/common/local-storage.service';
import { _isAuthenticated } from '../services/identity.service';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelper: JwtHelperService = inject(JwtHelperService);
  const router: Router = inject(Router);
  const toastrService: CustomToastrService = inject(CustomToastrService);
  const spinner: NgxSpinnerService = inject(NgxSpinnerService);
  const localStorageService: LocalStorageService = inject(LocalStorageService);

  spinner.show();

  const token: string = localStorageService.get("accessToken");

  let isExpired: boolean;

  try {
    isExpired = jwtHelper.isTokenExpired(token);
  } catch {
    isExpired = true;
  }

  if(!token || isExpired || !_isAuthenticated) {
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
