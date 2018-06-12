import { Injectable } from '@angular/core';

export namespace OperatingDataServiceNs {

  export interface DataTableModel {
    companyName: string;
    companyAreaName: string;
    expireDate: string;
    linkMan: string;
    linkManTel: string;
    companyAccountType: string;
  }

  export interface QueryModel {

  }
  @Injectable()
  export class OperatingDataService {

    constructor() { }

  }
}
