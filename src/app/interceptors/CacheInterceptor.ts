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
import { CacheService } from '../services/cache.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cacheService: CacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // Check if the request is in the cache
    const cachedResponse = this.cacheService.get(req);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    // If not cached, proceed with the request and cache the response
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cacheService.put(req, event);
        }
      })
    );
  }
}

