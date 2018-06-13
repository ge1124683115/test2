/*****
 生产环境配置
 生产环境构建命令(以下命令等效)：
 ng build --target=production --environment=prod
 ng build --prod --env=prod
 ng build --prod
 ****/

const webServerUrl = 'http://192.168.1.37:8087';
export const environment = {
  production: true,
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
