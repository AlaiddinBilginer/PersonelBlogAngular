import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../common/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService implements HttpInterceptor {

  constructor(
    private toastrService: CustomToastrService,
    private spinner: NgxSpinnerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error) => {
      let message = '';
      let title = '';

      switch(error.status) {
        case HttpStatusCode.Unauthorized:
          message = "Bu işlemi yapmak için yetkiniz yok";
          title = "Yetkisiz İşlem"
          break;
        case HttpStatusCode.InternalServerError:
          message = "Sunucuya erişilemedi";
          title = "Sunucu Hatası";
          break;
        case HttpStatusCode.BadRequest:
          message = "Geçersiz istek yapıldı";
          title = "Geçersiz İstek"
          break;
        case HttpStatusCode.NotFound:
          message = "Kaynak bulunamadı";
          title = "Bulunamadı";
          break;
        case HttpStatusCode.Forbidden:
          message = "Bu işlemi gerçekleştirmek için gerekli izinleriniz yok";
          title = "Erişim Engellendi";
          break;
        default:
          message = "Beklenmeyen bir hata meydana geldi!";
          title = "Beklenmeyen Hata"
          break;
      }

      this.toastrService.message(message, title, {
        toastrMessageType: ToastrMessageType.Warning,
        toastrPosition: ToastrPosition.BottomLeft
      });

      this.spinner.hide();
      
      return of(error);
    }));
  }
}
