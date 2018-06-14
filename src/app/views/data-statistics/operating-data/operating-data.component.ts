import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { OperatingDataServiceNs } from './operating-data.service';
import { MerchantDataServiceNs } from '../merchant-data/merchant-data.service';
import { Router, ActivatedRoute } from '@angular/router';
enum MerchantStatusE {
  all = 0,
  inUse,
  blockUp
}
@Component({
  selector: 'app-operating-data',
  templateUrl: './operating-data.component.html',
  styleUrls: ['./operating-data.component.scss']
})
export class OperatingDataComponent implements OnInit {
  validateForm: FormGroup;
  paramsReqData: OperatingDataServiceNs.OperatingDataReqModel;
  searchParam: OperatingDataServiceNs.OperatingDataSearchReqModel;
  merchantStatuMapping: {[k: string]: string} = {};
  constructor(private fb: FormBuilder, private router: Router,
              private operatingDataService: OperatingDataServiceNs.OperatingDataService,
              private merchantDataService: MerchantDataServiceNs.MerchantDataService) {
    this.searchParam = {};

    this.merchantStatuMapping[`=${MerchantStatusE.all}`] = '全部';
    this.merchantStatuMapping[`=${MerchantStatusE.inUse}`] = '在用';
    this.merchantStatuMapping[`=${MerchantStatusE.blockUp}`] = '停用';

    this.loadAreaDataHandler = this.loadAreaData.bind(this);
  }

  tableDataSet = [];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = false;
  loadAreaDataHandler = null;

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
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.paramsReqData = {
      pageNum: this.pageIndex,
      pageSize: this.pageSize,
      filters : {
        companySearch: this.searchParam.companySearch,
        companyAreaId: this.searchParam.companyAreaId ? this.searchParam.companyAreaId[this.searchParam.companyAreaId.length - 1 ] : '',
        companyState: this.searchParam.companyState,
      }
    };
    this.loading = true;
    this.operatingDataService.getOperatingData(this.paramsReqData).then((data) => {
      this.loading = false;
      if (!data.value) {
        return;
      }
      this.tableDataSet = data.value.list || [];
      this.total = data.value.total || 0;
    });
  }

  public resetForm(): void {
    this.validateForm = this.fb.group({
      companySearch: [''],
      companyAreaId: [''],
      companyState: ['0']
    });
    this.submitForm();
  }

  submitForm(): void {
    this.searchParam.companySearch = this.validateForm.get('companySearch').value || '';
    this.searchParam.companyAreaId = this.validateForm.get('companyAreaId').value || '';
    this.searchParam.companyState = this.validateForm.get('companyState').value || '0';
    this.searchData(true);
  }
  jumpRouter(item: any, type?: string): void {
    if (!item.orgId) {
      return;
    }
    localStorage.setItem('bkr-merchantData', JSON.stringify(item));
    if (type === 'sale') {
      this.router.navigateByUrl('/main/dataStatistics/saleData/' + item.orgId);
      return;
    }
    this.router.navigateByUrl('/main/dataStatistics/purchaseData/' + item.orgId);
  }
  ngOnInit() {
    localStorage.removeItem('bkr-merchantData');
    this.validateForm = this.fb.group({
      companySearch: [''],
      companyAreaId: [],
      companyState: ['0']
    });
    this.searchData();
  }

}
