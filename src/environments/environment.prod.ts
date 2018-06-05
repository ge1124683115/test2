/*****
 生产环境配置
 生产环境构建命令(以下命令等效)：
 ng build --target=production --environment=prod
 ng build --prod --env=prod
 ng build --prod
 ****/


export const environment = {
  production: true,
  baseUrl:{
    ius:"http://192.168.2.103:4200/site/ius/",
    dev:"http://192.168.2.103:4200/site/hx/",
    photo:"http://192.168.2.103:4200/site/hx/cpyPhoto/loadImage?path="
  },
  otherData: {
    sysRole: 0,
    sysSite: "0",
    companySite:"1"
  }
};
