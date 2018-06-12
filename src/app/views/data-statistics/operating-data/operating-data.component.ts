import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { OperatingDataServiceNs } from './operating-data.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-operating-data',
  templateUrl: './operating-data.component.html',
  styleUrls: ['./operating-data.component.scss']
})
export class OperatingDataComponent implements OnInit {
  validateForm: FormGroup;
  private tableData = [{
    orgId: '12',
    companyName: '百氪汇',
    companyAreaName: '江苏南京',
    expireDate: '2018-6-12',
    linkMan1 : 'haha',
    linkManTel1: '18888888888',
    companyAccountType: 2
  }];
  selectedValue: string;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
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
    //this.loading = true;
    this.total = 1;
    this.tableDataSet = this.tableData;
  }

  public resetForm(): void {
    this.validateForm = this.fb.group({
      companySearch: [''],
      companyAreaId: [''],
      companyState: ['0']
    });
  }

  jumpRouter(item: any, type?: string): void {
    if (item.orgId) {
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
