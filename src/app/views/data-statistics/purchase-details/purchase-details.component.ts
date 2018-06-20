import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {PurchaseDetailsServiceNs} from './purchase-details.service';
import {PurchaseDataServiceNs} from '../purchase-data/purchase-data.service';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss']
})
export class PurchaseDetailsComponent implements OnInit {
  inventoryCount = 0;
  returnCount = 0;
  validateForm: FormGroup;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = false;
  tableDataSet = [];
  paramsReqData: PurchaseDetailsServiceNs.PurchaseDetailReqModel;
  searchParam: PurchaseDetailsServiceNs.PurchaseDetailSearchReqModel;
  currentUnitType = 0;
  currentProductInfo: PurchaseDataServiceNs.PurchaseDataModel;

  constructor(private fb: FormBuilder,
              private purchaseDetailsService: PurchaseDetailsServiceNs.PurchaseDetailsService,
              private datePipe: DatePipe,
              private route: ActivatedRoute) {
    this.searchParam = {};
    this.currentUnitType = 0;
    this.currentProductInfo = {};
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.paramsReqData = {
      pageNum: this.pageIndex,
      pageSize: this.pageSize,
      filters: {
        companyName: this.searchParam.companyName,
        contacter: this.searchParam.contacter,
        endTime: this.searchParam.endTime || '',
        productCode: this.searchParam.productCode || '',
        startTime: this.searchParam.startTime || '',
        orgId: this.searchParam.orgId || ''
      }
    };
    this.loading = true;
    this.purchaseDetailsService.getPurchaseDetails(this.paramsReqData).then((data) => {
      this.loading = false;
      if (!data.value) {
        return;
      }
      this.tableDataSet = data.value.pageInfo.list || [];
      this.total = data.value.pageInfo.total || 0;
      this.getCurrentUnitTypeVaule();
      this.inventoryCount = data.value.inCount;
      this.returnCount = data.value.returnCount;
    });
  }

  private getCurrentUnitTypeVaule(): void {
    this.tableDataSet.forEach(item => {
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
    this.searchParam.companyName = this.validateForm.get('companyName').value || '';
    this.searchParam.contacter = this.validateForm.get('contacter').value || '';
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
      companyName: [''],
      contacter: [''],
      rangePicker: [[startDate, endDate]]
    });
  }

  ngOnInit() {
    this.currentProductInfo = localStorage.getItem('bkr-productInfo') ? JSON.parse(localStorage.getItem('bkr-productInfo')) : {};
    this.route.params
      .subscribe((params) => {
        this.searchParam.productCode = params['productCode'];
        this.searchParam.orgId = params['orgId'];
      });
    this.initFormData();
    this.submitForm();
  }

}
