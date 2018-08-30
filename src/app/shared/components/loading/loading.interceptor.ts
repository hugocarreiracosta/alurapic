import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent, HttpResponse
} from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    
    constructor(private loadingService: LoadingService){
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent  | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        

        return next
            .handle(req)
            .pipe(tap(event => {
                if(event instanceof HttpResponse) { 
                    this.loadingService.stop();
                } else { 
                    this.loadingService.start();
                }
            }))

    }

}