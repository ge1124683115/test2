import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, retry } from 'rxjs/operators';
import { HttpUtilNs } from '../../../core/infra/http/http-util.service';
export namespace PurchaseDetailsServiceNs {
  import UfastHttpResT = HttpUtilNs.UfastHttpResT;
  import UfastHttpRes = HttpUtilNs.UfastHttpRes;

  export interface PurchaseDetailModel {
    billId?: string;
    createDate?: string;
    billType?: string;
    productCode?: string;
    productName?: string;
    quantityResult?: string;
    companyName?: string;
    companyTel?: string;
    idCard?: string;
    address?: string;
    companyAreaName?: string;
    type?: string;
    contactTel?: string;
    contact?: string;
    comapnayName?: string;
    productQuantityDOs?: {
      type: number,
      quantityResult: string
    }[];
  }

  export interface PurchaseDetailResModel extends UfastHttpResT<{
    inCount: number;
    returnCount: number;
    pageInfo: {
      list: PurchaseDetailModel[];
      total: number;
      pageNum: number;
      pageSize: number;
      }
    }> {
  }

  export interface PurchaseDetailReqModel {
    filters?: PurchaseDetailSearchReqModel;
    pageNum: number;
    pageSize: number;
  }

  export interface PurchaseDetailSearchReqModel {
    companyName ?: string;
    contacter?: string;
    endTime?: string;
    startTime?: string;
    productCode?: string;
    orgId?: string;
  }
  @Injectable()
  export class PurchaseDetailsService {

    constructor(private http: HttpUtilNs.HttpUtilService) {
    }
    public getPurchaseDetails(paramsData: PurchaseDetailReqModel): Promise<PurchaseDetailResModel> {
      return this.http.post<PurchaseDetailResModel>('bizs', 'company/getCompanyPurchaseDetailList', paramsData)
        .pipe(map((data: PurchaseDetailResModel) => {
          return data;
        })).toPromise();
    }

  }
}

