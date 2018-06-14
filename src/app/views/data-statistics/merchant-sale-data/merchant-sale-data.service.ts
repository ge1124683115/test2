import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, retry } from 'rxjs/operators';
import { HttpUtilNs } from '../../../core/infra/http/http-util.service';
export namespace MerchantSaleDataServiceNs {
  import UfastHttpResT = HttpUtilNs.UfastHttpResT;
  export interface MerchantSaleDataModel {
    orgId?: string;
    productCode?: number;
    productName?: string;
    productClass?: string;
    productClassName?: string;
    uomCode?: string;
    inventory?: string;
    specification?: string;
    manufacturer?: string;
    certificateCode?: string;
    dosageName?: string;
    toxicityName?: string;
    productBrand?: string;
    productQuantityDOs?: {
      type: number,
      quantityResult: string
    }[];
    unitConversionRelationship?: string;
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
    dosage?: string;
    orgId?: string;
    productClass?: string;
    productName?: string;
    toxicity?: string;
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
