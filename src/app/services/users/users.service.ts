import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpService } from '../../interfaces/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements HttpService {

  constructor(private http: HttpClient) { }

  public get(page:number = 1 , perPage:number = 10) : Observable<UsersHttpResponse>{

    return this.http.get<UsersHttpResponse>(`https://reqres.in/api/users?page=${page}&per_page=${perPage}`);
  }
  public show(id:string | null) : Observable<User|undefined>{



    return this.http.get<UserHttpResponse>(`https://reqres.in/api/users/${id}`).pipe(
      catchError((_) => of(null)),
      map(response => response?.data),
    )
  }
}
