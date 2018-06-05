import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { HttpUtilNs } from "../infra/http/http-util.service";
import { Observable } from "rxjs/Observable";

export namespace CompanyServiceNs{

  export interface UfastHttpAnyResModel extends HttpUtilNs.UfastHttpResT<any>{}

  export interface LevelItemModel{
    id?:string;
    levelNo:string;
    levelName?:string;
    paymentMethodNumber?:number;
    price?:number;
    remark?:string;
    levelDays?:number;
    plaLevelRoleNumVOS?:any[];
    updateDate?:string;
    checked?:boolean;
    defaulted?:number;
  }

  export interface CompanyModel{
    id?:number;
    orgId:string;
    orgName?:string;
    orgAddress?:string;
    orgPhone?:string;
    orgFixedPhone?:string;
    wxId?:string;
    registrationFlow?:string;
    status?:number;
    aduitRemark?:string;
    lockStatus?:number;
    cpyLevelVO?:any;
    cpyRouteVOS?:any;
    cpyPhotoVOS?:any[];
    loginName?:string;
  }

  @Injectable()
  export class CompanyService{
    constructor(private http:HttpUtilNs.HttpUtilService){

    }

    public queryScepterLevelList(filter:{filters:any,pageNum:number,pageSize:number}):Observable<UfastHttpAnyResModel>{
      return this.http.post("dev","/plaLevel/list",filter);
    }

    public getLevelDetail(levelNo:string):Observable<LevelItemModel>{
      let params = new HttpParams().set("levelNo",levelNo);

      return this.http.get("dev","/plaLevel/item",params);
    }
    public insertLevel(data:LevelItemModel):Observable<UfastHttpAnyResModel>{
      return this.http.post("dev","/plaLevel/insert",data);
    }
    public updateLevel(data:LevelItemModel):Observable<UfastHttpAnyResModel>{
      return this.http.post("dev","/plaLevel/update",data);
    }
    public deleteLevels(levelNos:string[]):Observable<UfastHttpAnyResModel>{
      return this.http.post("dev","/plaLevel/batchDelete",levelNos);
    }
    public getDefaultLevel(levelNo:string):Observable<UfastHttpAnyResModel>{
      return this.http.get("dev","/plaLevel/updateDefaulted",new HttpParams({
        fromObject:{
          levelNo:levelNo
        }
      }));
    }
    public getLevelConfig(levelNo:string):Observable<UfastHttpAnyResModel>{
      return this.http.get("ius","/template/queryTemplateConfig",new HttpParams({
        fromObject:{
          tempId:levelNo
        }
      }));
    }
    public setLevelConfig(data:{authIds:number[],menuIds:number[],tempId:string}):Observable<UfastHttpAnyResModel>{
      return this.http.post("ius","/template/configTemplate",data);
    }

    public getCompanyBasicList(filter:{filters:any,pageNum:number,pageSize:number}):Observable<UfastHttpAnyResModel>{
      return this.http.post("dev","/cpyBasic/list",filter);
    }
    public getCompanyDetail(orgId:string):Observable<UfastHttpAnyResModel>{
      return this.http.get("dev","/cpyBasic/item",new HttpParams({
        fromObject:{
          orgId:orgId
        }
      }));
    }
    public insertCompany(data:CompanyModel):Observable<UfastHttpAnyResModel>{
      return this.http.post("dev","/cpyBasic/insert",data);
    }
    public companyLockOrUnlock(orgId:string,lockStatus:number):Observable<UfastHttpAnyResModel>{
      return this.http.post("dev","/cpyBasic/lockOrUnlock",{
        orgIds:[orgId],
        lockStatus:lockStatus
      });
    }
    public auditCompany(data:{orgId:string;aduitRemark:string;status:number}):Observable<UfastHttpAnyResModel>{
      return this.http.post("dev","/cpyBasic/audit",data);
    }
  }
}
