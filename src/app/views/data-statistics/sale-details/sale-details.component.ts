import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  constructor(private fb: FormBuilder) { }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
  }

  resetForm(): void {
    this.validateForm = this.fb.group({
      dealerName: [''],
      rangePicker: [[]]
    });
    this.searchData(true);
  }

  submitForm(): void {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      dealerName: [''],
      rangePicker: [[]]
    });
  }

}
