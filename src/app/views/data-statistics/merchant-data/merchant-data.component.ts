import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MerchantDataServiceNs } from './merchant-data.service';
enum MerchantStatusE {
  inUse = 0,
  blockUp
}
enum BusinessLicenseStatesE {
  all = 0,//全部
  survival,//存续
  employment,//在业
  revoked, //吊销
  cancellation,//注销
  moveIn, //迁入
  moveOut,//迁出
  closed,//停业
  liquidation,//清算
}

enum BusinessScopeStatesE {
  all = 0,//全部
  unLimit,
  limit
}



@Component({
  selector: 'app-merchant-data',
  templateUrl: './merchant-data.component.html',
  styleUrls: ['./merchant-data.component.scss']
})
export class MerchantDataComponent implements OnInit {
  validateForm: FormGroup;
  businessLicenseStates = [{
    value: '0',
    label: '全部状态'
  }, {
    value: '1',
    label: '存续'
  }, {
    value: '2',
    label: '在业'
  }, {
    value: '3',
    label: '吊销'
  }, {
    value: '4',
    label: '注销'
  }, {
    value: '5',
    label: '迁入'
  }, {
    value: '6',
    label: '迁出'
  }, {
    value: '7',
    label: '停业'
  }, {
    value: '8',
    label: '清算'
  }];
  tableDataSet = [];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = false;
  searchParam: MerchantDataServiceNs.MerchantDataSearchReqModel;
  paramsReqData: MerchantDataServiceNs.MerchantDataReqModel;
  merchantStatuMapping: {[k: string]: string} = {};
  businessLicenseStateMapping: {[k: string]: string} = {};
  businessScopeStateMapping: {[k: string]: string} = {};
  loadAreaDataHandler = null;
  constructor(private fb: FormBuilder,
              private merchantDataService: MerchantDataServiceNs.MerchantDataService) {
    this.searchParam = {};
    this.merchantStatuMapping[`=${MerchantStatusE.inUse}`] = '在用';
    this.merchantStatuMapping[`=${MerchantStatusE.blockUp}`] = '停用';

    this.businessLicenseStateMapping[`=${BusinessLicenseStatesE.all}`] = '';
    this.businessLicenseStateMapping[`=${BusinessLicenseStatesE.survival}`] = '存续';
    this.businessLicenseStateMapping[`=${BusinessLicenseStatesE.employment}`] = '在业';
    this.businessLicenseStateMapping[`=${BusinessLicenseStatesE.revoked}`] = '吊销';
    this.businessLicenseStateMapping[`=${BusinessLicenseStatesE.cancellation}`] = '注销';
    this.businessLicenseStateMapping[`=${BusinessLicenseStatesE.moveIn}`] = '迁入';
    this.businessLicenseStateMapping[`=${BusinessLicenseStatesE.moveOut}`] = '迁出';
    this.businessLicenseStateMapping[`=${BusinessLicenseStatesE.closed}`] = '停业';
    this.businessLicenseStateMapping[`=${BusinessLicenseStatesE.liquidation}`] = '清算';

    this.businessScopeStateMapping[`=${BusinessScopeStatesE.all}`] = '';
    this.businessScopeStateMapping[`=${BusinessScopeStatesE.unLimit}`] = '农药';
    this.businessScopeStateMapping[`=${BusinessScopeStatesE.limit}`] = '农药（限制药品除外）';
    this.loadAreaDataHandler = this.loadAreaData.bind(this);
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.paramsReqData = {
      pageNum: this.pageIndex,
      pageSize: this.pageSize,
      filters : {
        companySearch: this.searchParam.companySearch,
        companyAreaId: this.searchParam.companyAreaId ? this.searchParam.companyAreaId[this.searchParam.companyAreaId.length -1] : '',
        companyState: this.searchParam.companyState,
        unifiedSocialCreditcode: this.searchParam.unifiedSocialCreditcode,
        businessLicenseNo: this.searchParam.businessLicenseNo,
        businessLicenseState: this.searchParam.businessLicenseState,
        businessScope: this.searchParam.businessScope
      }
    };
    this.merchantDataService.getMerchantData(this.paramsReqData).then((data) => {
      this.loading = false;
      if (!data.value) {
          return;
      }
      this.tableDataSet = data.value.list || [];
      this.total = data.value.total || 0;
    });
  }

  submitForm(): void {
    this.searchParam.companySearch = this.validateForm.get('companySearch').value || '';
    this.searchParam.companyAreaId = this.validateForm.get('companyAreaId').value || '';
    this.searchParam.companyState = this.validateForm.get('companyState').value || '0';
    this.searchParam.unifiedSocialCreditcode = this.validateForm.get('unifiedSocialCreditcode').value || '';
    this.searchParam.businessLicenseNo = this.validateForm.get('businessLicenseNo').value || '';
    this.searchParam.businessLicenseState = this.validateForm.get('businessLicenseState').value || '';
    this.searchParam.businessScope = this.validateForm.get('businessScope').value || '';
    this.searchData(true);
  }

  public resetForm(): void {
    this.validateForm = this.fb.group({
      companySearch: [''],
      companyAreaId: [],
      companyState: ['0'],
      unifiedSocialCreditcode: [''],
      businessLicenseNo: [''],
      businessLicenseState: ['0'],
      businessScope: ['0']
    });
    this.submitForm();
  }

  public loadAreaData(node: any, index: number):  PromiseLike<any> {
    const idStr = node.value || '0';
    const self = this;
    return new Promise((resolve) => {
        self.merchantDataService.getAreaList(idStr).then((data) => {
        node.children = this.packAreaData(data.value, index === 1);
        resolve();
      });
    });
  }


  private packAreaData(dataList: MerchantDataServiceNs.AreaDataModel[], isLast?: boolean): MerchantDataServiceNs.AreaDataModel[] {
    dataList.forEach(item => {
      item.label = item.areaName;
      item.value = item.id;
      item.isLeaf = isLast;
    });
    return dataList;
  }

  public areaChanges(value: any): void {
    if (!value) {
      return;
    }
    this.validateForm.get('companyAreaId').setValue(value);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      companySearch: [''],
      companyAreaId: [],
      companyState: ['0'],
      unifiedSocialCreditcode: [''],
      businessLicenseNo: [''],
      businessLicenseState: ['0'],
      businessScope: ['0']
    });
    this.searchData();
  }

}
