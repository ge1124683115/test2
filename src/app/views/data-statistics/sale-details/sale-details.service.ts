import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, retry } from 'rxjs/operators';
import { HttpUtilNs } from '../../../core/infra/http/http-util.service';
export namespace SaleDetailsServiceNs {
  import UfastHttpResT = HttpUtilNs.UfastHttpResT;
  import UfastHttpRes = HttpUtilNs.UfastHttpRes;
  export interface SaleDetailModel {
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
    productQuantityDOs?: {
      type: number,
      quantityResult: string
    }[];
  }


  export interface SaleProductInfoModel {
    productCode?: string;
    productName?: string;
    productBrand?: string;
    saleOutTimes ?: number;
    saleReturnTimes?: number;
    specification?: string;
    unitConversionRelationship?: string;
  }
  export interface SaleProductResModel extends UfastHttpRes {
    value?: SaleProductInfoModel;
  }

  export interface SaleDetailResModel extends UfastHttpResT<{list: SaleDetailModel[];
    total: number;
    pageNum: number;
    pageSize: number; }> {
  }

  export interface SaleDetailReqModel {
    filters?: SaleDetailSearchReqModel;
    pageNum: number;
    pageSize: number;
  }

  export interface SaleDetailSearchReqModel {
    dosage?: string;
    dealerName ?: string;
    endTime?: string;
    productCode?: string;
    startTime?: string;
  }

  @Injectable()
  export class SaleDetailsService {
    constructor(private http: HttpUtilNs.HttpUtilService) {
    }
    public getSaleDetails(paramsData: SaleDetailReqModel): Promise<SaleDetailResModel> {
      return this.http.post<SaleDetailResModel>('bizs', 'company/getCompanySaleDetailList', paramsData)
        .pipe(map((data: SaleDetailResModel) => {
          return data;
        })).toPromise();
    }

    public getSaleProductInfo(paramsData: SaleDetailReqModel): Promise<SaleProductResModel> {
      return this.http.post<SaleProductResModel>('bizs', 'company/getCompanySaleDetailListForHead', paramsData)
        .pipe(map((data: SaleProductResModel) => {
          return data;
        })).toPromise();
    }

  }
}

