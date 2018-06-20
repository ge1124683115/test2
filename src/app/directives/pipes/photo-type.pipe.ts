import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'photoType'
})
export class PhotoTypePipe implements PipeTransform {

  private typeObj = {
    0: '未知类型',
    1: '微信支付',
    2: '身份证正面',
    3: '身份证背面',
    4: '营业执照',
    5: '税务登记',
    6: '外观照片',
    7: '设备照片'
  };

  transform(value: any, args?: any): any {
    return this.typeObj[value || 0];
  }

}
