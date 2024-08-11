import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, HttpResponse<any>>();

  get(req: HttpRequest<any>): HttpResponse<any> | null {
    return this.cache.get(req.urlWithParams) || null;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    this.cache.set(req.urlWithParams, response);
  }
}
