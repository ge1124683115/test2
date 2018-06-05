import { Injectable } from "@angular/core";
import { ValidatorFn,AbstractControl,ValidationErrors } from "@angular/forms";
import { UfastValidatorsRuleService } from "./validatorsRule.service";

@Injectable()
export class UfastValidatorsService{
  constructor(private vrService:UfastValidatorsRuleService){}

  public passwordValidator():ValidatorFn{
    return this.commonUtil(this.vrService.passwordRule);
  }
  public mobileValidator():ValidatorFn{
    return this.commonUtil(this.vrService.mobileRule);
  }
  public telephoneValidator():ValidatorFn{
    return this.commonUtil(this.vrService.telephoneRule);
  }
  public urlValidator():ValidatorFn{
    return this.commonUtil(this.vrService.urlRule);
  }
  public emailValidator():ValidatorFn{
    return this.commonUtil(this.vrService.emailRule);
  }
  public idNoValidator():ValidatorFn{
    return this.commonUtil(this.vrService.idNoRule);
  }
  private commonUtil(ruleFun:(value:string)=>ValidationErrors):ValidatorFn{
    return (control:AbstractControl):ValidationErrors => {
      return ruleFun(control.value);
    };
  }


}
