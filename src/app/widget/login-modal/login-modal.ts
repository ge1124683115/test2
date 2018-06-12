import { Component, Injectable, OnInit} from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { UserServiceNs } from '../../core/common-services/user.service';


@Injectable()
export class LoginModalService {


  public modalSubject: NzModalRef;

  constructor(private modalService: NzModalService) {
  }
  public showLoginModal(maskCloseable: boolean = false ): NzModalRef{
    this.modalSubject = this.modalService.create({
      nzTitle: '用户登录',
      nzContent: LoginModalComponent,
      nzMaskClosable: maskCloseable,
      nzOkLoading: true,
      nzFooter: null,
      nzClosable: false

    });

    return this.modalSubject;
  }
}

@Component({
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  validateForm: FormGroup;
  loginReqData: UserServiceNs.AuthLoginReqModel;
  verifyImgUrl: string;
  remark: string;
  loading: boolean;
  usernameDisable: boolean;

  constructor(private fb: FormBuilder, private loginModalService: LoginModalService, private userService: UserServiceNs.UserService) {
    this.loginReqData = {
      authId: '',
      loginName: this.userService.userInfo.username,
      password: '123456',
      code: ''
    };
    this.usernameDisable = false;
    if ( this.userService.userInfo.username.length > 0) {
      this.usernameDisable = true;
    }
    this.verifyImgUrl = '';
    this.remark = '';
    this.loading = false;
  }
  public refreshVerify() {
  }
  public async loginSubmit() {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    if (this.validateForm.invalid) {
      return;
    }
    this.loading = true;
    const resData: UserServiceNs.AuthAnyResModel = await this.userService.postLogin(this.loginReqData);
    this.loading = false;
    if (resData.code !== 0) {
      this.remark = resData.message;
      this.refreshVerify();
      return;
    }
    this.loginModalService.modalSubject.destroy('onOk');
  }

  public cancelModal(data: any) {
    this.loginModalService.modalSubject.destroy('onCancel');
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      verifyCode: [null, [ Validators.required]],
    });
  }


}
