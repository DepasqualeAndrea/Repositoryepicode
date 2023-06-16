import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { switchMap, take } from 'rxjs/operators'
//dopo aver inesito le httprequest vado a preparare l'osservatore per il token


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}


//richiamo il token che devo andare ad intercettare
    newUtente! : HttpRequest<any>;

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return this.authService.user$.pipe(take(1), switchMap(user => {
            if (!user) {
                console.log(request);
                console.log(this.newUtente);
                return next.handle(request);
            }

            this.newUtente = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${user.accessToken}`)
            });

            console.log(request);
            console.log(this.newUtente);
            return next.handle(this.newUtente);
        }));
    }
}
