
/*****
  开发环境配置
  开发构建命令(以下命令等效)：
   ng build --target=development --environment=dev
   ng build --dev --e=dev
   ng build --dev
   ng build
 ****/
// const webServerUrl = 'http://192.168.1.37:8087';
const webServerUrl = 'http://localhost:4200';
export const environment = {
  production: false,
  baseUrl: {
    bizs: `${webServerUrl}/bizs/`,
    ius: `${webServerUrl}/ius/`,
  },
  otherData: {
    sysRole: 0,
    sysSite: '0',
    companySite: '1'
  }
};
