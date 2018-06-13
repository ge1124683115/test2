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
  public pesticideCategoryList = [
    {label: '全部类别', value: ''},
    {label: '杀虫剂', value: '杀虫剂'},
    {label: '杀菌剂', value: '杀菌剂'},
    {label: '除草剂', value: '除草剂'},
    {label: '生成调节剂', value: '生成调节剂'},
    {label: '种子处理剂', value: '种子处理剂'},
    {label: '杀鼠剂', value: '杀鼠剂'},
    {label: '卫生用药', value: '卫生用药'},
  ];
  public dosageList = [
    {label: '全部剂型', value: ''},
    ];
  public toxicityList = [
    {label: '全部毒性', value: ''},
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
  public searchParam = {
    certificateCode: '',
    dosage: '',
    holderName: '',
    pesticideCategory: '',
    pesticideName: '',
    toxicity: ''
  };
  constructor(private http: HttpUtilNs.HttpUtilService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.resetForm();
    this.searchData();
    this.getToxicityList();
    this.getDosageList();
  }

  public async searchData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    const param = {
      'filters': this.searchParam,
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
    for (const key of Object.keys(this.searchParam)) {
      this.searchParam[key] = '';
    }
    this.validateForm = this.fb.group({
      pesticideName: [''],
      pesticideCategory: ['0'],
      registrationStatus: ['0'],
      holderName: [''],
      dosage: ['0'],
      toxicity: ['0']
    });
  }

  private async getToxicityList() {
    const data = <any[]> (await this.getDictList('ToxicityType'));
    this.toxicityList = [{label: '全部毒性', value: ''}];
    data.forEach( item => {
      this.toxicityList.push({label: item.value, value: item.value});
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
}
