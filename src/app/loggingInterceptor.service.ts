import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { tap } from 'rxjs/operators'
export class loggingInterceptorservice implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Outgoing request');
        console.log(req.url);
        return next.handle(req).pipe(
            tap(ev => {
                if(ev.type === HttpEventType.Response){
                    console.log('Incoming response');
                    console.log(ev.body);
                    
                }
                // else if (ev.type === HttpEventType.Sent){
                //     console.log(' request sent' );
                //     console.log(ev.type);
                    
                // }
            })
        );
    }
}