import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-operating-data',
  templateUrl: './operating-data.component.html',
  styleUrls: ['./operating-data.component.scss']
})
export class OperatingDataComponent implements OnInit {
  validateForm: FormGroup;
  selectedValue: string;
  tableDataSet: {}[];
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      MerchantName: [''],
      AreaName: [''],
      MerchantType: ['0'],
      MerchantState: ['']
    });
  }

}
