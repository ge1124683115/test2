import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseDataServiceNs } from './purchase-data.service';
import { OperatingDataServiceNs } from '../operating-data/operating-data.service';
import { DatePipe } from '@angular/common';
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
    value: '',
    label: '全部'
  }];
  productClassList = [{
    value: '',
	  label: '全部'
  }];
  dosageList = [{
	  value: '',
	  label: '全部剂型'
  }];
  tableDataSet = [];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = false;
  currentUnitType: number;
  currentMerchantInfo: OperatingDataServiceNs.OperatingDataModel;
  constructor(private fb: FormBuilder,
              private purchaseDataService: PurchaseDataServiceNs.PurchaseDataService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe) {
    this.currentUnitType = 0;
    this.searchParam = {};
    this.currentMerchantInfo = {};
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
        fullname: this.searchParam.fullname || '',
        startDate: this.searchParam.startDate || '',
        endDate: this.searchParam.endDate || ''
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
      this.getCurrentUnitTypeVaule();
    });
  }

  public resetForm(): void {
    this.initSearchFormData();
    this.submitForm();
  }
  submitForm(): void {
    this.searchParam.fullname = this.validateForm.get('productName').value || '';
    this.searchParam.productClass = this.validateForm.get('productClass').value || 0;
    this.searchParam.toxicity = this.validateForm.get('toxicity').value || 0;
    this.searchParam.dosage = this.validateForm.get('dosage').value || 0;
    const rangeTime = this.validateForm.get('rangePicker').value || [];
    if (rangeTime.length > 1) {
      this.searchParam.startDate = this.datePipe.transform(rangeTime[0], 'yyyy-MM-dd');
      this.searchParam.endDate = this.datePipe.transform(rangeTime[1], 'yyyy-MM-dd');
    } else {
      this.searchParam.startDate = '';
      this.searchParam.endDate = '';
    }
    this.searchData();
  }

  setUnitShowType(type?: number): void {
    this.currentUnitType = type || 0;
    this.getCurrentUnitTypeVaule();
  }

  private getCurrentUnitTypeVaule(): void {
    this.tableDataSet.forEach( item => {
      if (!item.productQuantityDOs) {
        item.quantityResult = '';
        return;
      }
      if (item.productQuantityDOs && item.productQuantityDOs.length > 1) {
        item.quantityResult = item.productQuantityDOs[this.currentUnitType].quantityResult;
        return;
      }
      item.quantityResult = item.productQuantityDOs[0].quantityResult;
    });
  }
  jumpRouter(item: any): void {
    if (!item.productCode) {
      return;
    }
    localStorage.setItem('bkr-productInfo', JSON.stringify(item));
    this.router.navigateByUrl('/main/dataStatistics/purchaseDetails/' + this.searchParam.orgId + '/' + item.productCode);
  }
  goBack(): void {
    window.history.back();
  }

  private initSearchFormData(): void {
    const date = new Date();
    const endTime = this.datePipe.transform(date, 'yyyy-MM-dd');
    date.setDate((date.getDate() - 6));
    const startTime = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.validateForm = this.fb.group({
      productName: [''],
      productClass: [''],
      toxicity: [''],
      dosage: [''],
      rangePicker: [[startTime, endTime]]
    });
  }
  ngOnInit() {
    localStorage.removeItem('bkr-productInfo');
    this.route.params
      .subscribe((params) => {
        this.searchParam.orgId = params['orgId'];
      });
    this.initSearchFormData();
    this.currentMerchantInfo = localStorage.getItem('bkr-merchantData') ? JSON.parse(localStorage.getItem('bkr-merchantData')) : {};
    this.submitForm();
	  this.getDosageList();
	  this.getProductClassList();
    this.getToxicityList();
  }

  private async getDosageList() {
    const data = <any[]> (await this.purchaseDataService.getDictList('DosageType'));
    this.dosageList = [{label: '全部剂型', value: ''}];
    data.forEach( item => {
      this.dosageList.push({label: item.value, value: item.value});
    });
  }

  private async getProductClassList() {
    const data = <any[]> (await this.purchaseDataService.getProductClassList(this.searchParam.orgId));
    this.productClassList = [{label: '全部', value: ''}];
    data.forEach( item => {
      this.productClassList.push({label: item.className, value: item.classCode});
    });
  }

  private async getToxicityList() {
    const data = <any[]> (await this.purchaseDataService.getDictList('ToxicityType'));
    this.toxicitys = [{label: '全部毒性', value: ''}];
    data.forEach( item => {
      this.toxicitys.push({label: item.value, value: item.value});
    });
  }
}
