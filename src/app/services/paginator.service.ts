import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, map, merge, Observable, Subject, switchMap, tap } from 'rxjs';
import {  HttpService } from '../interfaces/http';

@Injectable({
     providedIn: 'root'
})
export class PaginatorService {


     data$: Subject<any> = new Subject();

     page$: BehaviorSubject<number> = new BehaviorSubject(1);

     perPage$: BehaviorSubject<number> = new BehaviorSubject(10);

     total$: BehaviorSubject<number> = new BehaviorSubject(0);

     totalPages: number = 0;

     constructor(private http: HttpClient) { }


     public of(resource: HttpService): PaginatorService {

          combineLatest([this.page$, this.perPage$]).pipe(
               debounceTime(100),
               switchMap(([page, perPage]) => resource.get(page, perPage)),

          ).subscribe({
               next: (response: PaginatedHttpResponse) => {
                    this.totalPages = response.total_pages;
                    this.total$.next(response.total);
                    this.data$.next(response.data);
               },
               error: (error) => {
                    console.error('Error:', error);
               }
          });

          return this;
     }

     public data() {

          return this.data$;
     }

     public total() {

          return this.total$;
     }

     public perPage() {

          return this.perPage$;
     }

     public setPerPage(perPage:number){
       
          if(perPage == this.perPage$.value) return;

          this.goTo(1);

          this.perPage$.next(perPage);
     }

     public goTo(page: number) {

          if(page == this.page$.value || page > this.totalPages) return;


          this.page$.next(page);
     }

     public next() {

          this.page$.next(this.page$.value + 1);
     }

     public prev() {

          if (this.page$.value == 1) return;

          this.page$.next(this.page$.value - 1);
     }

     public hasNext(){

          return this.page$.value < this.totalPages;
     }

     public hasPrev(){

          return this.page$.value > 1;
     }
}
