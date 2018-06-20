import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {HttpUtilNs} from '../../../core/infra/http/http-util.service';

export namespace MerchantDataServiceNs {
  import UfastHttpResT = HttpUtilNs.UfastHttpResT;
  import UfastHttpRes = HttpUtilNs.UfastHttpRes;

  export interface MerchantDataModel {
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

  export interface MerchantInfoResModel extends UfastHttpResT<{
    list: MerchantDataModel[];
    total: number;
    pageNum: number;
    pageSize: number;
  }> {
  }

  export interface MerchantDataReqModel {
    filters?: MerchantDataSearchReqModel;
    pageNum: number;
    pageSize: number;
  }

  export interface MerchantDataSearchReqModel {
    businessLicenseNo?: string;
    businessLicenseState?: number;
    businessScope?: number;
    companyAreaId?: string;
    companySearch?: string;
    companyState?: string;
    unifiedSocialCreditcode?: string;
  }

  export interface AreaDataModel {
    areaName: string;
    id: string;
    pId: string;
    value: string;
    label: string;
    isLeaf?: boolean;
  }

  export interface AreaDataResModel extends UfastHttpRes {
    value: AreaDataModel[];
  }

  @Injectable()
  export class MerchantDataService {

    constructor(private http: HttpUtilNs.HttpUtilService) {
    }

    public getMerchantData(paramsData: MerchantDataReqModel): Promise<MerchantInfoResModel> {
      return this.http.post<MerchantInfoResModel>('bizs', 'company/getAllCompanyList', paramsData)
        .pipe(map((data: MerchantInfoResModel) => {
          return data;
        })).toPromise();
    }

    public getAreaList(id: string): Promise<AreaDataResModel> {
      let params: HttpParams = new HttpParams();
      params = params.set('pId', id);
      return this.http.get<AreaDataResModel>('bizs', '/area/listByPid', params)
        .pipe(map((data: AreaDataResModel) => {
          return data;
        })).toPromise();
    }
  }
}
