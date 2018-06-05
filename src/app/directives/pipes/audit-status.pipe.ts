import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'auditStatus'
})
export class AuditStatusPipe implements PipeTransform {

  private statusObj = {
    0:"待审核",
    1:"审核通过",
    2:"审核未通过",

  };
  transform(value: any, args?: any): any {

    return this.statusObj[value || 0];
  }

}
