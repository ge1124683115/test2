import { Injectable } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

@Injectable()
export class UfastValidatorsRuleService{

  private Wi:number[];
  private ValideCode:number[];

  constructor(){
    this.Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
    this.ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  }

  public passwordRule(value:string):ValidationErrors{

    if(!value){
      return null;
    }

    let regTure = /^[^\s]{6,20}$/;
    let regFalse = /^\d+$/;

    return regTure.test(value) && !regFalse.test(value) ? null : {message:"密码由6到20位大小写字母、数字或其他字符组成"};

  }
  public mobileRule(value:string):ValidationErrors{
    if(!value){
      return null;
    }

    let phoneReg:any = /^1\d{10}$/;
    return phoneReg.test(value) ? null : {message:"请输入正确的手机号"};
  }
  public telephoneRule(value:string):ValidationErrors{
    if(!value){
      return null;
    }

    let telephoneReg:RegExp = /^(0\d{2,3}-?)?\d{7,8}$/;
    return telephoneReg.test(value) ? null : {message:"请输入正确的电话号码"}
  }
  public emailRule(value:string):ValidationErrors{
    if(!value){
      return null;
    }

    let emailReg:RegExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return emailReg.test(value) ? null : {message:"请输入正确的邮箱地址"};
  }
  public urlRule(value:string):ValidationErrors{
    if(!value){
      return null;
    }

    let urlReg:RegExp = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_#-](\?)?)*)*$/i;
    return urlReg.test(value) ? null : {message:"请输入正确的网址"};
  }
  public idNoRule(value:string):ValidationErrors{
    if(!value){
      return null;
    }

    let res = {
      message:"请输入正确的身份证号码"
    };
    if (value.length == 15) {
      //进行15位身份证的验证
      return this.isValidityBrithBy15IdCard(value) ? null : res;
    } else if (value.length == 18) {
      var a_idCard = value.split("");// 得到身份证数组
      //进行18位身份证的基本验证和第18位的验证
      return (this.isValidityBrithBy18IdCard(value) && this.isTrueValidateCodeBy18IdCard(a_idCard)) ? null : res;
    } else {
      return res;
    }

  }
  private isTrueValidateCodeBy18IdCard(a_idCard){
    var sum = 0;// 声明加权求和变量
    if (a_idCard[17].toLowerCase() == 'x') {
      a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作
    }
    for (var i = 0; i < 17; i++) {
      sum += this.Wi[i] * a_idCard[i];// 加权求和
    }
    var valCodePosition = sum % 11;// 得到验证码所位置
    return (a_idCard[17] == this.ValideCode[valCodePosition]);
  }
  private isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    return !(temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day));
  }
  private isValidityBrithBy15IdCard(idCard15) {
    var pattern = /^\d{15}$/;
    return pattern.test(idCard15);
  }

}
