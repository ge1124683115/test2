import { Injectable } from "@angular/core";
import { HttpHeaders,HttpParams } from "@angular/common/http";
import { HttpUtilNs } from "../infra/http/http-util.service";
import { Observable } from "rxjs/Observable";
import { map,retry } from "rxjs/operators";

import { environment } from "../../../environments/environment";

export namespace UserServiceNs{
  import UfastHttpRes = HttpUtilNs.UfastHttpRes;
  export interface HttpError extends HttpUtilNs.UfastHttpRes{}
  export interface UfastHttpResT<T> extends HttpUtilNs.UfastHttpResT<T>{}
  export interface AuthAnyResModel extends HttpUtilNs.UfastHttpRes{
    value:any;
  }
  export interface UfastHttpAnyResModel extends HttpUtilNs.UfastHttpRes{
    value:any;
  }
  export interface AuthInfoResModel extends HttpUtilNs.UfastHttpRes{
    value:{
      authId:string;
      verifyCode?:string;
      verifyImgUrl:string;
    }
  }
  export interface AuthLoginReqModel {
    authId:string;
    code:string;
    loginName:string;
    password:string;
  }
  export interface AuthUpdateInfoReqModel{
    email?:string;
    mobile?:string;
    areaCode:string;
    loginName:string;
    name:string;
    password:string;
    telephone:string;
  }
  export interface AuthLoginInfoValueModel {
    loginName:string;
    password:string;
    deptName:string;      //所属部门
    email:string;
    name:string;
    roleNames:string;     //角色
    mobile:string;        //手机号
    telephone:string;     //电话
    userId:string;
    rolesVOs:any[];
    status:number;
    type:number;
    [otherKey:string]:any;
  }
  export interface AuthLoginInfoResModel extends UfastHttpRes{
    value:AuthLoginInfoValueModel;
  }

  export interface UserInfoModel{
    locked:number;      //0：启用，1：锁定
    loginName:string;
    name:string;
    roleIds:string[];
    email?:string;
    mobile?:string;
    telephone?:string;
    nickname?:string;   //昵称
    sex:number;         //0:女，1：男
    deptId:string;
    areaCode?:string;
    spaceId?:string;
    deptName?:string;
    lastLoginTime?:number;
    roleNames?:string;
    roleVOs?:any[];
    type?:number;
    status?:number;
    userId?:string;
  }
  export interface DepartmentModel{
    code:string;
    id:string;
    leaf:number;
    name:string;
    parentId:string;
    seq:number;
    spaceId:string;
  }
  @Injectable()
  export class UserService{
    public userInfo:any;

    constructor(private http:HttpUtilNs.HttpUtilService){
      this.userInfo = {
        username:""
      }
    }

    public getAuthInfo():Observable<AuthInfoResModel>{
      return this.http.get<AuthInfoResModel>("ius","/auth/authInfo")
        .pipe(retry(2),map((data:AuthInfoResModel) => {
          data.value.verifyImgUrl = this.http.getFullUrl("ius","/auth/kaptcha") + `?authid=${data.value.authId}`;
          return data;
        }));
    }
    public postLogin(loginData:AuthLoginReqModel):Observable<AuthAnyResModel>{


      return this.http.post<AuthAnyResModel>("ius","/auth/login",loginData)
        .pipe(map((resData:AuthAnyResModel) => {
          if(resData.code === 0){
            this.userInfo.username = loginData.loginName;
          }
          return resData;
        }));
    }

    public logout():Observable<AuthAnyResModel>{
      return this.http.post("ius","/auth/logout")
        .pipe(map((resData:AuthAnyResModel) => {
          if(resData.code === 0){
            this.userInfo.username = "";
          }
          return resData;
        }));
    }
    public modifyPassword(oldPassword:string,newPassword:string):Observable<UfastHttpAnyResModel>{
      return this.http.post<AuthAnyResModel>("ius","/auth/password",{
        newPassword:newPassword,
        oldPassword:oldPassword
      });
    }
    public getLogin():Observable<UfastHttpAnyResModel>{
      return this.http.get<AuthLoginInfoResModel>("ius","/profile/getLogin");
    }
    public updatePersonInfo(data:AuthUpdateInfoReqModel):Observable<UfastHttpAnyResModel>{
      return this.http.post<AuthAnyResModel>("ius","/profile/update",data);
    }
    public addUser(userInfo:UserInfoModel):Observable<UfastHttpAnyResModel>{
      return this.http.post("ius","/profile",userInfo);
    }
    public updateUserInfo(userInfo:UserInfoModel):Observable<UfastHttpAnyResModel>{
      return this.http.post("ius","/profile/updateUserInfo",userInfo);
    }
    public resetPassword(userIdList:string[]):Observable<UfastHttpAnyResModel>{
      return this.http.post("ius","/account/resetPassword",userIdList);
    }
    public removeUsers(userIdList:string[]):Observable<UfastHttpAnyResModel>{
      return this.http.post("ius","/profile/remove",userIdList);
    }
    public getUserDetail(userId:string):Observable<UfastHttpResT<UserInfoModel>>{
      let params = new HttpParams();

      return this.http.get("ius","/profile/detail",params.set("userId",userId));
    }
    public getUserList(filter:{filters:any,pageNum:number,pageSize:number}):Observable<UfastHttpAnyResModel>{
      return this.http.post("ius","/profile/list",filter);
    }
    public lockUsers(lock:number,userIds:string[]):Observable<UfastHttpAnyResModel>{
      let body = {
        lock:lock,
        userIds:userIds
      };
      return this.http.post("ius","/profile/updateLock",body);
    }

    public getDepartment(id:string):Observable<HttpUtilNs.UfastHttpResT<DepartmentModel[]>>{
      let params = new HttpParams();

      return this.http.get("ius","/department/list",params.set("id",id));
    }
  }
}
