import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { tap } from 'rxjs/operators';

export class authinterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedReq = req.clone({ 
      headers: req.headers.append('isAuthorized', 'true')})
    return next.handle(modifiedReq)
  }
}