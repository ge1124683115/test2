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
  constructor(private fb: FormBuilder,
              private merchantSaleDataService: MerchantSaleDataServiceNs.MerchantSaleDataService,
              private route: ActivatedRoute) {
      this.searchParam = {};
  }



  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    //this.loading = true;
    this.total = 1;
  }

  public resetForm(): void {
    this.validateForm = this.fb.group({
      productName: [''],
      productClass: [''],
      toxicity: [''],
      dosage: ['']
    });
    //TODO:
  }
  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.searchParam.orgId = params['orgId'];
        console.info(this.searchParam.orgId);
      });
    this.validateForm = this.fb.group({
      productName: [''],
      productClass: [''],
      toxicity: [''],
      dosage: ['']
    });
  }

}
