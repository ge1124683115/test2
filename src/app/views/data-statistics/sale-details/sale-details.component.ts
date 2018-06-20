import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SaleDetailsServiceNs } from './sale-details.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.scss']
})
export class SaleDetailsComponent implements OnInit {
  validateForm: FormGroup;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = false;
  tableDataSet = [];
  paramsReqData: SaleDetailsServiceNs.SaleDetailReqModel;
  searchParam: SaleDetailsServiceNs.SaleDetailSearchReqModel;
  currentUnitType = 0;
  currentProduct: SaleDetailsServiceNs.SaleProductInfoModel;
  constructor(private fb: FormBuilder,
              private saleDetailsService: SaleDetailsServiceNs.SaleDetailsService,
              private datePipe: DatePipe,
              private route: ActivatedRoute) {
    this.searchParam = {};
    this.currentUnitType = 0;
    this.currentProduct = {};
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.paramsReqData = {
      pageNum: this.pageIndex,
      pageSize: this.pageSize,
      filters : {
        dealerName: this.searchParam.dealerName,
        endTime: this.searchParam.endTime || '',
        productCode: this.searchParam.productCode || '',
        startTime: this.searchParam.startTime || '',
      }
    };
    this.loading = true;
    this.saleDetailsService.getSaleDetails(this.paramsReqData).then((data) => {
      this.loading = false;
      if (!data.value) {
        return;
      }
      this.tableDataSet = data.value.list || [];
      this.total = data.value.total || 0;
      this.getCurrentUnitTypeVaule();
    });

    this.saleDetailsService.getSaleProductInfo(this.paramsReqData).then((res) => {
      if (!res.value) {
        return;
      }
      this.currentProduct = res.value || {};
    });
  }

  private getCurrentUnitTypeVaule(): void {
    this.tableDataSet.forEach( item => {
      if (item.productQuantityDOs && item.productQuantityDOs.length > 1) {
          item.quantityResult = item.productQuantityDOs[this.currentUnitType].quantityResult;
          return;
      }
      item.quantityResult = item.productQuantityDOs[0].quantityResult;
    });
  }

  resetForm(): void {
    this.initFormData();
    this.submitForm();
  }

  setUnitShowType(type?: number): void {
    this.currentUnitType = type || 0;
    this.getCurrentUnitTypeVaule();
  }

  submitForm(): void {
    const rangeTime = this.validateForm.get('rangePicker').value || [];
    this.searchParam.dealerName = this.validateForm.get('dealerName').value || '';
    if (rangeTime.length > 1) {
      this.searchParam.startTime = this.datePipe.transform(rangeTime[0], 'yyyy-MM-dd');
      this.searchParam.endTime = this.datePipe.transform(rangeTime[1], 'yyyy-MM-dd');
    } else {
      this.searchParam.startTime = '';
      this.searchParam.endTime = '';
    }
    this.searchData(true);
  }
  goBack(): void {
      window.history.back();
  }

  private initFormData(): void {
    const startDate = (localStorage.getItem('bkr-productInfo') ? JSON.parse(localStorage.getItem('bkr-productInfo')) : {}).startDate || '';
    const endDate = (localStorage.getItem('bkr-productInfo') ? JSON.parse(localStorage.getItem('bkr-productInfo')) : {}).endDate || '';
    this.validateForm = this.fb.group({
      dealerName: [''],
      rangePicker: [[startDate, endDate]]
    });
  }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.searchParam.productCode  = params['productCode'];
      });
    this.initFormData();
    this.submitForm();
  }

}
