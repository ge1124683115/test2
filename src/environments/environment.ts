
/*****
  开发环境配置
  开发构建命令(以下命令等效)：
   ng build --target=development --environment=dev
   ng build --dev --e=dev
   ng build --dev
   ng build
 ****/
const webServerUrl = 'http://192.168.1.121:9008';
export const environment = {
  production: false,
  baseUrl: {
    site: `${webServerUrl}/`,
  },
  otherData: {
    sysRole: 0,
    sysSite: '0',
    companySite: '1'
  }
};
