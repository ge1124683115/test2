import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl } from "@angular/forms";
import { Router,ActivatedRoute } from '@angular/router';
import { UserServiceNs } from "../../../core/common-services/user.service";
import { ShowMessageService } from "../../../widget/show-message/show-message";
import { UfastValidatorsService } from "../../../core/infra/validators/validators.service";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  passwordForm:FormGroup;

  constructor(private userService:UserServiceNs.UserService,private messageService:ShowMessageService,private activeRouter:ActivatedRoute,
              private formBuilder:FormBuilder,private validator:UfastValidatorsService,private router:Router) {

  }
  public updatePassword(){
    for(let key in this.passwordForm.controls){
      this.passwordForm.controls[key].markAsDirty();
      this.passwordForm.controls[key].updateValueAndValidity();
    }
    if(this.passwordForm.invalid){
      return;
    }
    this.userService.modifyPassword(this.passwordForm.value.oldPassword, this.passwordForm.value.newPassword)
      .subscribe((resData:any) => {
        if(resData.code === 0){
          this.userService.logout();
          this.messageService.showAlertMessage("","修改密码成功,请重新登录.","success").afterClose.subscribe(() => {
            this.router.navigateByUrl("/login");
          });
        }else{
          this.messageService.showAlertMessage("",resData.message,"warning");
        }
      },(error:any) => {
        this.messageService.showAlertMessage("",error.message,"error");
      });
  }
  private confirmValidator(){
    return (control:FormControl) =>{
      if(!control.value){
        return null;
      }
      if(control.value !== this.passwordForm.value.newPassword){
        return { secPassword:false};
      }
      return null;

    };
  }
  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      oldPassword:[null,[ Validators.required ]],
      newPassword:[null,[ Validators.required,this.validator.passwordValidator() ]],
      secPassword:[null,[ Validators.required,this.confirmValidator()]]
    });
  }

}
