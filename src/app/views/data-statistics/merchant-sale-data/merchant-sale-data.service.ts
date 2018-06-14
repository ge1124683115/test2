import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, retry } from 'rxjs/operators';
import { HttpUtilNs } from '../../../core/infra/http/http-util.service';
export namespace MerchantSaleDataServiceNs {
  import UfastHttpResT = HttpUtilNs.UfastHttpResT;
  export interface MerchantSaleDataModel {
    address: string;
    businessLicenseNo: string;
    businessLicenseState: number;
    businessModel: number;
    businessScope: number;
    companyAccountType: number;
    companyAreaId: string;
    companyAreaName: string;
    companyIntro: string;
    companyName: string;
    companyScale: number;
    companyTel: string;
    createDate: string;
    entSortId: string;
    expireDate: string;
    fax: string;
    graspVersion: string;
    idcardNo: string;
    isCompany: number;
    isDel: number;
    isGrasp: number;
    isLimitUserNumber: number;
    isLock: number;
    legalName: string;
    linkMan1: string;
    linkManTel1: string;
    logoUrl: string;
    orgId: string;
    regChannel: number;
    remark: string;
    shortName: string;
    unifiedSocialCreditcode: string;
    userNumber: number;
    zip: string;
  }

  export interface MerchantSaleResModel extends UfastHttpResT<{list: MerchantSaleDataModel[];
    total: number;
    pageNum: number;
    pageSize: number; }> {
  }

  export interface MerchantSaleReqModel {
    filters?: MerchantSaleSearchReqModel;
    pageNum: number;
    pageSize: number;
  }

  export interface MerchantSaleSearchReqModel {
    dosage?: number;
    orgId?: string;
    productClass?: number;
    productName?: string;
    toxicity?: number;
  }
  @Injectable()
  export class MerchantSaleDataService {
    constructor(private http: HttpUtilNs.HttpUtilService) {
    }
    public getMerchantSaleData(paramsData: MerchantSaleReqModel): Promise<MerchantSaleResModel> {
      return this.http.post<MerchantSaleResModel>('bizs', 'company/getCompanySaleList', paramsData)
        .pipe(map((data: MerchantSaleResModel) => {
          return data;
        })).toPromise();
    }
  }
}
