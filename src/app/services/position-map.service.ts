import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPositionMap } from '../models/position-map.model';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PositionMapService {
  private positionMapUrl = environment.backendUrl + '/position-map';

  constructor(private http: HttpClient) {}
  loadCountByLocalAddress(
    userId: string,
    healthSignal: string
  ): Observable<any> {
    console.log('start loadCountByLocalAddress ', userId, healthSignal);
    return this.http
      .get<any>(
        `${this.positionMapUrl}/countByLocalAddress/${userId}/${healthSignal}`
      )
      .pipe(
        map((resData) => {
          console.log('loadCountByLocalAddress result: ', resData);
          return resData;
        })
      );
  }
}
