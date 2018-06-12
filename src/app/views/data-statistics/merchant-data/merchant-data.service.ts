import { Injectable } from '@angular/core';

export namespace MerchantDataServiceNs {

  export interface DataTableModel {
    companyName: string;
    companyAreaName: string;
    expireDate: string;
    linkMan1: string;
    linkManTel1: string;
    companyAccountType: string;
  }
  @Injectable()
  export class MerchantDataService {

    constructor() {
    }

  }
}
