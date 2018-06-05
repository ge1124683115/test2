
/*****
  开发环境配置
  开发构建命令(以下命令等效)：
   ng build --target=development --environment=dev
   ng build --dev --e=dev
   ng build --dev
   ng build
 ****/

export const environment = {
  production: false,
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
