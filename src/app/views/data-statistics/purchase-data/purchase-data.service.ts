import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, retry } from 'rxjs/operators';
import { HttpUtilNs } from '../../../core/infra/http/http-util.service';
export namespace PurchaseDataServiceNs {
  import UfastHttpResT = HttpUtilNs.UfastHttpResT;
  export interface PurchaseDataModel {
    orgId: string;
    productCode: number;
    fullname: string;
    productClass: string;
    uomCode: string;
    inventory: string;
    specification: string;
    manufacturer: string;
    certificateCode: string;
    dosage: string;
    productBrand: string;
    productQuantityDOs?: {
      type: number,
      quantityResult: string
    }[];
    relationDesc?: string;
  }

  export interface PurchaseResModel extends UfastHttpResT<{list: PurchaseDataModel[];
    total: number;
    pageNum: number;
    pageSize: number; }> {
  }

  export interface PurchaseReqModel {
    filters?: PurchaseSearchReqModel;
    pageNum: number;
    pageSize: number;
  }

  export interface PurchaseSearchReqModel {
    dosage?: string;
    fullname?: string;
    productClass?: string;
    orgId?: string;
    toxicity?: string;
  }
  @Injectable()
  export class PurchaseDataService {
    constructor(private http: HttpUtilNs.HttpUtilService) {
    }
    public getPurchaseData(paramsData: PurchaseReqModel): Promise<PurchaseResModel> {
      return this.http.post<PurchaseResModel>('bizs', 'company/getCompanyPurchaseList', paramsData)
        .pipe(map((data: PurchaseResModel) => {
          return data;
        })).toPromise();
    }

  }
}
