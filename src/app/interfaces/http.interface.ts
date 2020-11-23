import { Observable } from 'rxjs';

export interface IHttpService {
  get<T>(route: string): Observable<T>;

  put<T1, T2>(route: string, body?: T1): Observable<T2>;

  post<T1, T2>(route: string, body?: T1): Observable<T2>;

  delete<T1, T2>(route: string, body?: T1): Observable<T2>;
}
