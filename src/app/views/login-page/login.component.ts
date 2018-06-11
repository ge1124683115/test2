import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceNs } from '../../core/common-services/user.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  loginReqData: UserServiceNs.AuthLoginReqModel;
  errMsg = '';
  constructor(private userService: UserServiceNs.UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activeRouter: ActivatedRoute) {
    this.loginReqData = {
      authId: '',
      loginName: 'admin001',
      password: '123456'
    };
  }
  public loginSubmit() {
    this.errMsg = '';
    for (const key of Object.keys(this.validateForm.controls)) {
     console.log(key);
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(this.validateForm);
    if (this.validateForm.invalid) {
      return;
    }
    this.router.navigate(['../main'], {
      relativeTo: this.activeRouter
    });
/*    this.userService.postLogin(this.loginReqData)
      .subscribe((resData: UserServiceNs.AuthAnyResModel) => {
        if (resData.code !== 0) {
          this.errMsg = resData.message;
          return;
        }
        this.router.navigate(['../main'], {
          relativeTo: this.activeRouter
        });
      }, (error: UserServiceNs.HttpError) => {
        this.errMsg = error.message;
      });*/
  }
  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
    });
  }
}
