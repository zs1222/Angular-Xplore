import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../../models/dtos/login-response.dto';
import { LoginDto } from '../../models/dtos/login.dto';
import { IHttpService } from '../../interfaces/http.interface';

@Injectable()
export abstract class HttpService implements IHttpService {

  constructor(private http: HttpClient) {}

  abstract buildEndpoint(route: string): string;

  get<T>(route: string): Observable<T> {
    return this.http.get<T>(this.buildEndpoint(route));
  }

  put<T1, T2>(route: string, body?: T1): Observable<T2> {
    return this.http.put<T2>(this.buildEndpoint(route), body);
  }

  post<T1, T2>(route: string, body?: T1): Observable<T2> {
    return this.http.post<T2>(this.buildEndpoint(route), body);
  }

  login(route: string, body?: LoginDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(this.buildEndpoint(route), body);
  }

  delete<T1, T2>(route: string, body?: T1): Observable<T2> {
    return this.http.delete<T2>(this.buildEndpoint(route), body);
  }

}
