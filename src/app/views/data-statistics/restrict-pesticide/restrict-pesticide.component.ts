import { Component, OnInit } from '@angular/core';
import { HttpUtilNs } from '../../../core/infra/http/http-util.service';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';

interface ListItem {
  id: number;
  code: string;
  value: string;
  groupName: string;
  seqNo: number;
  remark: string;
}
interface ResponseDataValue {
  pageNum: number;
  pageSize: number;
  total: number;
  pages: number;
  list: ListItem[];
}

@Component({
  selector: 'app-restrict-pesticide',
  templateUrl: './restrict-pesticide.component.html',
  styleUrls: ['./restrict-pesticide.component.scss']
})
export class RestrictPesticideComponent implements OnInit {
  validateForm: FormGroup;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;
  public listData: ListItem[] = [];
  public searchParam = {
    value: '',
    groupName: 'LimitingPesticide'
  };
  constructor(private fb: FormBuilder,
              private http: HttpUtilNs.HttpUtilService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({});
    this.validateForm.addControl('searchContent', new FormControl());
    this.searchData();
  }
  public resetForm(): void {
    this.validateForm.reset();
    this.searchParam.value = '';
  }

  public async searchData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    const param = {
      // 'filters': this.searchParam,
      'filters': {
        value: this.searchParam.value.replace(/^\s*|\s*$/g, ''),
        groupName: this.searchParam.groupName
      },
      'pageNum': this.pageIndex,
      'pageSize': this.pageSize,
    };
    this.loading = true;
    const data: HttpUtilNs.UfastHttpResT<ResponseDataValue> = await this.http.post<HttpUtilNs.UfastHttpResT<ResponseDataValue>>('bizs',
      'sysDict/listPage', param).toPromise();
    console.log(data);
    const dataValue: ResponseDataValue = data.value;
    this.loading = false;
    this.total = dataValue.total;
    this.listData = dataValue.list || [];
  }
}
