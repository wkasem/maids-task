import { Observable } from "rxjs";

export interface HttpService{

     get(page:number , perPage:number):Observable<PaginatedHttpResponse>
}