import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable()
export class RealtimeService extends HttpService {
  buildEndpoint(route: string): string {
    throw new Error('Method not implemented.');
  }
}
