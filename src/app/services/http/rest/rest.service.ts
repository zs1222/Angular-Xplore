import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class RestService extends HttpService {
  buildEndpoint(route: string): string {
    return `${environment.restApiUrl}/${route}`;
  }
}
