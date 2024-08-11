import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../stores/loading/loading.actions';
import { LoadingState } from '../stores/loading/loading.reducer';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private store: Store<LoadingState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


     this.store.dispatch(startLoading());

    return next.handle(req).pipe(
      tap((event) => {
          this.store.dispatch(stopLoading());
      })
    );
  }
}

