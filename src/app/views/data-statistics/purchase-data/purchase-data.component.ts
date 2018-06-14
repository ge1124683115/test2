import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseDataServiceNs } from './purchase-data.service';
@Component({
  selector: 'app-purchase-data',
  templateUrl: './purchase-data.component.html',
  styleUrls: ['./purchase-data.component.scss']
})
export class PurchaseDataComponent implements OnInit {
  validateForm: FormGroup;
  paramsReqData: PurchaseDataServiceNs.PurchaseReqModel;
  searchParam: PurchaseDataServiceNs.PurchaseSearchReqModel;
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
  currentUnitType: string;
  constructor(private fb: FormBuilder,
              private purchaseDataService: PurchaseDataServiceNs.PurchaseDataService,
              private route: ActivatedRoute) {
    this.currentUnitType = 'small';
    this.searchParam = {};
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
        dosage: this.searchParam.dosage || '',
        toxicity: this.searchParam.toxicity || '',
        productClass: this.searchParam.productClass || '',
        fullname: this.searchParam.fullname || ''
      }
    };
    this.loading = true;
    this.purchaseDataService.getPurchaseData(this.paramsReqData).then((data) => {
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
  }
  submitForm(): void {
    this.searchParam.fullname = this.validateForm.get('productName').value || '';
    this.searchParam.productClass = this.validateForm.get('productClass').value || 0;
    this.searchParam.toxicity = this.validateForm.get('toxicity').value || 0;
    this.searchParam.dosage = this.validateForm.get('dosage').value || 0;
  }

  setUnitShowType(type?: string): void {
    this.currentUnitType = type || '';
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
