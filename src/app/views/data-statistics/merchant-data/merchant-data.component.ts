import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';

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
  constructor(private fb: FormBuilder) {
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    //TODO:
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
  }

  public loadAreaData(node: any, index: number):  PromiseLike<any> {
    return new Promise((resolve) => {
      if (index < 0) { // if index less than 0 it is root node
        node.children = [];
      } else if (index === 0) {
        node.children = [];
      } else {
        node.children = [];
      }
      resolve();
    });
  }

  public areaChanges(value: any): void {
    console.info(value);
    this.validateForm.get('companyAreaId').setValue('');
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

  }

}
