import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map, retry} from 'rxjs/operators';
import {HttpUtilNs} from '../../../core/infra/http/http-util.service';
import {HttpParams} from '@angular/common/http';

export namespace PurchaseDataServiceNs {
  import UfastHttpResT = HttpUtilNs.UfastHttpResT;

  export interface PurchaseDataModel {
    orgId?: string;
    productCode?: number;
    fullname?: string;
    productClass?: string;
    uomCode?: string;
    inventory?: string;
    specification?: string;
    manufacturer?: string;
    certificateCode?: string;
    dosage?: string;
    productBrand?: string;
    productQuantityDOs?: {
      type: number,
      quantityResult: string
    }[];
    relationDesc?: string;
  }

  export interface PurchaseResModel extends UfastHttpResT<{
    list: PurchaseDataModel[];
    total: number;
    pageNum: number;
    pageSize: number;
  }> {
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
    startDate?: string;
    endDate?: string;
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

    public getDictList(dicType: string): Promise<any> {
      return this.http.get<HttpUtilNs.UfastHttpResT<any>>('bizs',
        'sysDict/list?groupName=' + dicType).toPromise().then(data => {
        return data.value;
      });
    }

    public getProductClassList(orgId: string): Promise<any> {
      let params: HttpParams = new HttpParams();
      params = params.set('pClassCode', '001');
      return this.http.get<HttpUtilNs.UfastHttpResT<any>>('bizs',
        'company/getPorductClassList', params).toPromise().then(data => {
        return data.value;
      });
    }

  }
}
