import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { OperatingDataServiceNs } from './operating-data.service';
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
              private operatingDataService: OperatingDataServiceNs.OperatingDataService) {
    this.searchParam = {};

    this.merchantStatuMapping[`=${MerchantStatusE.all}`] = '全部';
    this.merchantStatuMapping[`=${MerchantStatusE.inUse}`] = '在用';
    this.merchantStatuMapping[`=${MerchantStatusE.blockUp}`] = '停用';
  }

  tableDataSet = [];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = false;
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.paramsReqData = {
      pageNum: this.pageIndex,
      pageSize: this.pageSize,
      filters : {
        companySearch: this.searchParam.companySearch,
        companyAreaId: this.searchParam.companyAreaId,
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
    if (type === 'sale') {
      this.router.navigateByUrl('/main/dataStatistics/saleData/'+item.orgId);
      return;
    }
    //this.router.navigateByUrl('/main/dataStatistics/saleData', {queryParams: {orgId: item.orgId}});
  }
  ngOnInit() {

    this.validateForm = this.fb.group({
      companySearch: [''],
      companyAreaId: [''],
      companyState: ['0']
    });
    this.searchData();
  }

}
