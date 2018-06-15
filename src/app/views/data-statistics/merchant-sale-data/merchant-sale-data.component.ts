import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MerchantSaleDataServiceNs } from './merchant-sale-data.service';
import { OperatingDataServiceNs } from '../operating-data/operating-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpUtilNs } from '../../../core/infra/http/http-util.service';
import { PurchaseDataServiceNs } from '../purchase-data/purchase-data.service';

@Component({
  selector: 'app-merchant-sale-data',
  templateUrl: './merchant-sale-data.component.html',
  styleUrls: ['./merchant-sale-data.component.scss']
})
export class MerchantSaleDataComponent implements OnInit {
  validateForm: FormGroup;
  public dosageList = [
    {label: '全部剂型', value: ''},
  ];
  public toxicitys = [
    {label: '全部毒性', value: ''},
  ];
  public productClasses = [
    {label: '全部', value: ''},
  ];
  tableDataSet = [];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = false;
  searchParam: MerchantSaleDataServiceNs.MerchantSaleSearchReqModel;
  paramsReqData: MerchantSaleDataServiceNs.MerchantSaleReqModel;
  currentMerchantInfo: OperatingDataServiceNs.OperatingDataModel;
  currentUnitType: number;
  constructor(private fb: FormBuilder,
              private merchantSaleDataService: MerchantSaleDataServiceNs.MerchantSaleDataService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpUtilNs.HttpUtilService,
              private purchaseDataService: PurchaseDataServiceNs.PurchaseDataService) {
      this.searchParam = {};
      this.currentUnitType = 0;
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
      this.getCurrentUnitTypeVaule();
    });
  }

  public resetForm(): void {
    this.validateForm = this.fb.group({
      productName: [''],
      productClass: [''],
      toxicity: [''],
      dosage: ['']
    });
    this.searchData(true);
  }
  submitForm(): void {
    this.searchParam.productName = this.validateForm.get('productName').value || '';
    this.searchParam.productClass = this.validateForm.get('productClass').value || '';
    this.searchParam.toxicity = this.validateForm.get('toxicity').value || '';
    this.searchParam.dosage = this.validateForm.get('dosage').value || '';
    this.searchData(true);
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
    this.router.navigateByUrl('/main/dataStatistics/saleDetails/' + item.productCode);
  }

  goBack(): void {
    window.history.back();
  }

  ngOnInit() {

    this.route.params
      .subscribe((params) => {
        this.searchParam.orgId = params['orgId'];
      });
    this.validateForm = this.fb.group({
      productName: [''],
      productClass: [''],
      toxicity: [''],
      dosage: ['']
    });
    this.currentMerchantInfo = localStorage.getItem('bkr-merchantData') ? JSON.parse(localStorage.getItem('bkr-merchantData')) : {};
    this.searchData();
    this.getToxicityList();
    this.getDosageList();
    this.getClassList();
  }

  private async getToxicityList() {
    const data = <any[]> (await this.getDictList('ToxicityType'));
    this.toxicitys = [{label: '全部毒性', value: ''}];
    data.forEach( item => {
      this.toxicitys.push({label: item.value, value: item.value});
    });
  }

  private async getDosageList() {
    const data = <any[]> (await this.getDictList('DosageType'));
    this.dosageList = [{label: '全部剂型', value: ''}];
    data.forEach( item => {
      this.dosageList.push({label: item.value, value: item.value});
    });
  }

  private getDictList(dicType: string): Promise<any> {
    return this.http.get<HttpUtilNs.UfastHttpResT<any>>('bizs',
      `sysDict/list?groupName=${dicType}`).toPromise().then( data => {
      return data.value;
    });
  }

  private async getClassList() {
    const data = <any[]> (await this.purchaseDataService.getProductClassList(this.searchParam.orgId));
    this.productClasses = [{label: '全部', value: ''}];
    data.forEach( item => {
      this.productClasses.push({label: item.className, value: item.classCode});
    });
  }

}
