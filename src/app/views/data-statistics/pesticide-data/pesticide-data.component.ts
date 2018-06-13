import { Component, OnInit } from '@angular/core';
import { HttpUtilNs } from '../../../core/infra/http/http-util.service';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';

interface PesticideItem {
  id: string;
  pesticideName: string;
  certificateCode: string;
  pesticideCategoryCode: string;
  pesticideCategory: string;
  totalContent: string;
  toxicityCode: string;
  toxicity: string;
  dosageCode: string;
  dosage: string;
  validStartDay: string;
  validLastDay: string;
  status: string;
  holderName: string;
  holderId: string;
}
interface PesticideListData {
   pageNum: number;
   pageSize: number;
   total: number;
   pages: number;
   list: PesticideItem[];
}
@Component({
  selector: 'app-pesticide-data',
  templateUrl: './pesticide-data.component.html',
  styleUrls: ['./pesticide-data.component.scss']
})
export class PesticideDataComponent implements OnInit {
  public validateForm: FormGroup;
  public dosageList = [
    {label: '全部剂型', value: ''},
    {label: '粉剂', value: '1'},
    {label: '可容性粉剂', value: '2'},
    ];
  public toxicityList = [
    {label: '全部毒性', value: ''},
    {label: '微毒', value: '1'},
    {label: '低毒', value: '2'},
    ];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet: PesticideItem[] = [];
  loading = true;
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];
  constructor(private http: HttpUtilNs.HttpUtilService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.resetForm();
    this.searchData();
  }

  public async searchData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    const param = {
      'filters': {
        'certificateCode': ''
      },
      'pageNum': this.pageIndex,
      'pageSize': this.pageSize,
    };
    this.loading = true;
    const data: HttpUtilNs.UfastHttpResT<PesticideListData> = await this.http.post<HttpUtilNs.UfastHttpResT<PesticideListData>>('bizs',
      'pesticides/getPesticidesList', param).toPromise();
    console.log(data);
    const dataValue: PesticideListData = data.value;
    this.loading = false;
    this.total = dataValue.total;
    this.dataSet = dataValue.list || [];
  }

  public resetForm(): void {
    this.validateForm = this.fb.group({
      pesticideName: [''],
      pesticideCategory: ['0'],
      registrationStatus: ['0'],
      holderName: [''],
      dosage: ['0'],
      toxicity: ['0']
    });
  }
}
