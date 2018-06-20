import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {HttpUtilNs} from '../infra/http/http-util.service';
import {Observable} from 'rxjs/Observable';

export namespace DeptServiceNs {

  export interface UfastHttpAnyResModel extends HttpUtilNs.UfastHttpResT<any> {
  }

  export interface DeptItemModel {
    code?: string;
    id: string;
    leaf: number;
    name: string;
    parentId: string;
    seq?: any;
    spaceId?: string;
    level?: number;
    children?: DeptItemModel[];
    expand?: boolean;
  }

  @Injectable()
  export class DeptService {
    constructor(private http: HttpUtilNs.HttpUtilService) {

    }

    public getDeptList(id: string): Observable<UfastHttpAnyResModel> {
      const params = new HttpParams();
      return this.http.get('ius', '/department/list', params.set('id', id));
    }

    public removeDept(id: string): Observable<UfastHttpAnyResModel> {
      return this.http.post('ius', '/department/remove', {
        id: id
      });
    }

    public insertDept(parentId: string, name: string): Observable<UfastHttpAnyResModel> {
      return this.http.post('ius', '/department/insert', {
        name: name,
        parentId: parentId
      });
    }

    public updateDept(id: string, name: string): Observable<UfastHttpAnyResModel> {
      return this.http.post('ius', '/department/update', {
        id: id,
        name: name
      });
    }
  }
}
