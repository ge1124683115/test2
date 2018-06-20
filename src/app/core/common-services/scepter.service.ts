import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {HttpUtilNs} from '../infra/http/http-util.service';
import {MenuServiceNs} from './menu.service';

export namespace ScepterServiceNs {
  export interface ScepterResModelT<T> extends HttpUtilNs.UfastHttpRes {
    value: T;
  }

  export interface RoleModel {
    deptId?: string;
    deptName?: string;
    id?: string;
    name: string;
    remark?: string;
    spaceId?: string;
    type?: number;
    checked?: boolean;
  }

  export interface GetRoleResModel extends HttpUtilNs.UfastHttpResT<RoleModel[]> {
  }

  export interface EditRoleModel {
    deptId?: string;
    deptName?: string;
    id: string;
    name?: string;
    remark?: string;
    spaceId?: string;
    type: number;
  }

  export interface GetMenusAuthsResModel extends HttpUtilNs.UfastHttpRes {
    auths: number[];
    menus: number[];
  }

  export interface AddMenusAuthsModel {
    authIds: number[];
    menuIds: number[];
    channel?: number[];
    roleId: string;
  }

  export interface MenuShownItemModel extends MenuServiceNs.MenuAuthorizedItemModel {
    [x: string]: any;
  }


  @Injectable()
  export class ScepterService {


    constructor(private http: HttpUtilNs.HttpUtilService) {

    }

    public getRoles() {
      return this.http.get<GetRoleResModel>('ius', '/scepter/roles');
    }

    public addRole(role: RoleModel) {
      return this.http.post<ScepterResModelT<any>>('ius', '/scepter/role', role);
    }

    public deleteRoles(roleIds: string[]) {
      return this.http.post<ScepterResModelT<any>>('ius', '/scepter/deleteRoles', roleIds);
    }

    public editRoles(roleInfo: EditRoleModel) {
      return this.http.post<ScepterResModelT<any>>('ius', '/scepter/editRole', roleInfo);
    }

    public getMenusAuths(roleId: string) {
      let params: HttpParams = new HttpParams();
      params = params.set('roleId', roleId);
      return this.http.get<GetMenusAuthsResModel>('ius', '/scepter/getMenusAuths', params);
    }

    public getMenuShown() {
      return this.http.get<ScepterResModelT<MenuShownItemModel[]>>('ius', '/menu/shown');
    }

    public addMenusAuths(auths: AddMenusAuthsModel) {
      return this.http.post<ScepterResModelT<any>>('ius', '/scepter/addMenusAuths', auths);
    }
  }


}


