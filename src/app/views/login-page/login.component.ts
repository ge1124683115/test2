import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceNs } from '../../core/common-services/user.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public validateForm: FormGroup;
  public loginReqData: UserServiceNs.AuthLoginReqModel;
  public errMsg = '';
  public verifyImgUrl = '';
  constructor(private userService: UserServiceNs.UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activeRouter: ActivatedRoute) {
    this.loginReqData = {
      authId: '',
      loginName: '',
      password: '',
      code: '',
    };
  }
  public async loginSubmit() {
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
/*    this.router.navigate(['../main'], {
      relativeTo: this.activeRouter
    });*/
    const resData: UserServiceNs.AuthAnyResModel = await this.userService.postLogin(this.loginReqData);
    if (resData.code !== 0) {
      this.errMsg = resData.message;
      return;
    }
    this.router.navigate(['../main'], {
      relativeTo: this.activeRouter
    });
  }

  public async refreshVerify() {
    const data: UserServiceNs.AuthInfoResModel = await this.userService.getAuthInfo();
    this.verifyImgUrl = data.value.verifyImgUrl;
    this.loginReqData.authId = data.value.authId;
  }

  ngOnInit(): void {
    this.refreshVerify();
    this.validateForm = this.formBuilder.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      verifyCode: [ null, [ Validators.required ] ],
    });
  }
}
