import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MerchantSaleDataServiceNs } from './merchant-sale-data.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-merchant-sale-data',
  templateUrl: './merchant-sale-data.component.html',
  styleUrls: ['./merchant-sale-data.component.scss']
})
export class MerchantSaleDataComponent implements OnInit {
  validateForm: FormGroup;
  toxicitys = [{
    value: '0',
    label: '全部'
  }, {
    value: '1',
    label: '微毒'
  }, {
    value: '2',
    label: '低毒'
  }, {
    value: '3',
    label: '中等毒'
  }, {
    value: '4',
    label: '高毒'
  }, {
    value: '5',
    label: '剧毒'
  }];
  tableDataSet = [];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = false;
  searchParam: MerchantSaleDataServiceNs.MerchantSaleSearchReqModel;
  paramsReqData: MerchantSaleDataServiceNs.MerchantSaleReqModel;
  currentUnitType: string;
  constructor(private fb: FormBuilder,
              private merchantSaleDataService: MerchantSaleDataServiceNs.MerchantSaleDataService,
              private route: ActivatedRoute,
              private router: Router) {
      this.searchParam = {};
      this.currentUnitType = 'small';
  }



  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.paramsReqData = {
      pageNum: this.pageIndex,
      pageSize: this.pageSize,
      filters : {
        orgId: this.searchParam.orgId,
        dosage: this.searchParam.dosage || 0,
        toxicity: this.searchParam.toxicity || 0,
        productClass: this.searchParam.productClass || 0,
        productName: this.searchParam.productName || ''
      }
    };
    this.loading = true;
    this.merchantSaleDataService.getMerchantSaleData(this.paramsReqData).then((data) => {
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
      productName: [''],
      productClass: [''],
      toxicity: ['0'],
      dosage: ['0']
    });
    this.searchData(true);
  }
  submitForm(): void {
    this.searchParam.productName = this.validateForm.get('productName').value || '';
    this.searchParam.productClass = this.validateForm.get('productClass').value || 0;
    this.searchParam.toxicity = this.validateForm.get('toxicity').value || 0;
    this.searchParam.dosage = this.validateForm.get('dosage').value || 0;
    this.searchData(true);
  }

  setUnitShowType(type?: string): void {
      this.currentUnitType = type || '';
  }

  jumpRouter(item: any): void {
    if (!item.productCode) {
      return;
    }
    this.router.navigateByUrl('/main/dataStatistics/saleDetails/' + item.productCode);
  }
  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.searchParam.orgId = params['orgId'];
      });
    this.validateForm = this.fb.group({
      productName: [''],
      productClass: [''],
      toxicity: ['0'],
      dosage: ['0']
    });
    this.searchData();
  }

}
