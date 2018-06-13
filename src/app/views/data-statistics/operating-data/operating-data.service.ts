import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, retry } from 'rxjs/operators';
import { HttpUtilNs } from '../../../core/infra/http/http-util.service';
export namespace OperatingDataServiceNs {
  import UfastHttpResT = HttpUtilNs.UfastHttpResT;
  export interface OperatingDataModel {
    orgId: string;
    companyName: string;
    shortName: string;
    companyTel: string;
    address: string;
    linkMan1: string;
    linkManTel1: string;
    entSortId: string;
    companyAreaId: string;
    createDate: string;
    isCompany: number;
    isLock: number;
    isDel: number;
    unifiedSocialCreditcode: string;
    businessModel: string;
    companyScale: string;
    legalName: string;
    idcardNo: string;
    regChannel: number;
    graspVersion: string;
    isGrasp: string;
    companyAccountType: number;
    userNumber: number;
    isLimitUserNumber: number;
    expireDate: string;
    remark: string;
    companyIntro: string;
    businessLicenseNo: string;
    businessLicenseState: number;
    businessScope: number;
    companyAreaName: string;
  }

  export interface OperatingInfoResModel extends UfastHttpResT<{list: OperatingDataModel[];
    total: number;
    pageNum: number;
    pageSize: number; }> {
  }

  export interface OperatingDataReqModel {
    filters?: OperatingDataSearchReqModel;
    pageNum: number;
    pageSize: number;
  }

  export interface OperatingDataSearchReqModel {
    companyAreaId?: string;
    companySearch?: string;
    companyState?: string;
  }
  @Injectable()
  export class OperatingDataService {

    constructor(private http: HttpUtilNs.HttpUtilService) { }
    public getOperatingData(paramsData: OperatingDataReqModel): Promise<OperatingInfoResModel> {
      return this.http.post<OperatingInfoResModel>('bizs', 'company/getCompanyList', paramsData)
        .pipe(map((data: OperatingInfoResModel) => {
          return data;
        })).toPromise();
    }
  }
}
