import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';
import { IOrg, Org } from '../models/org.model';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class OrgService {
  private orgUrl = environment.backendUrl + '/org';
  private _orgs = new BehaviorSubject<IOrg[]>([]);

  get orgs() {
    return this._orgs.asObservable();
  }
  constructor(private http: HttpClient) {}

  loadOrgs(userId: string): Observable<Org[]> {
    return this.http.get<any[]>(`${this.orgUrl}/listByMember/${userId}`).pipe(
      map((resData) => {
        console.log('loadOrgs result: ', resData);
        return _.orderBy(resData, ['eventDate'], ['desc']);
      })
    );
  }
  loadOrg(orgId: string): Observable<Org> {
    return this.http.get<any>(`${this.orgUrl}/${orgId}`).pipe(
      map((resData) => {
        console.log('loadOrg result: ', resData);
        return resData;
      })
    );
  }
  loadMembers(userId: string, orgId: string): Observable<any[]> {
    console.log('start loadMembers', userId, orgId);
    return this.http
      .get<any[]>(`${this.orgUrl}/members/${orgId}/${userId}`)
      .pipe(
        map((resData) => {
          console.log('loadMembers result: ', resData);
          return resData;
        })
      );
  }
  loadOrgsExceptMember(userId: string): Observable<Org[]> {
    return this.http
      .get<any[]>(`${this.orgUrl}/listExceptMember/${userId}`)
      .pipe(
        map((resData) => {
          console.log('loadOrgs result: ', resData);
          return _.orderBy(resData, ['eventDate'], ['desc']);
        })
      );
  }
  addOrg(org: IOrg) {
    console.log(org);
    return this.http.post<IOrg>(this.orgUrl + '/add', {
      ...org,
      id: null,
    });
  }
  addMember(orgId: string, memberId: string) {
    console.log('addMember', orgId, memberId);
    return this.http.post<IOrg>(
      this.orgUrl + `/addMember/${orgId}/${memberId}`,
      {}
    );
  }
}
