import { Injectable, EventEmitter, } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { HttpUtilNs } from '../infra/http/http-util.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/operators/filter';

export namespace MenuServiceNs {
  export interface UfastHttpAnyResModel extends HttpUtilNs.UfastHttpResT<MenuAuthorizedItemModel> {}
  export interface AuthItemModel {
    authDesc: string;
    authId: number;
    authName: string;
    parentId: number;
  }
  /***
   * @interface
   *  state: 路由状态名称
   *  url: 菜单跳转地址
   *  leaf：是否是叶子节点
   *  name：菜单名称
   *  children：子菜单
   */
  export interface MenuAuthorizedItemModel {
    auths?: AuthItemModel[];
    channel?: number;
    children: MenuAuthorizedItemModel[];
    code?: string;
    icon?: string;
    id?: number;
    leaf?: number;
    name: string;
    parentId?: number;
    seq?: number;
    showFlag?: number;
    state?: string;
    url: string;
  }

  @Injectable()
  export class MenuService {

    menuList: MenuAuthorizedItemModel[];
    menuNavChange: BehaviorSubject<MenuAuthorizedItemModel[]>;
    presentMenu: MenuAuthorizedItemModel[];

    constructor(private http: HttpUtilNs.HttpUtilService, private router: Router){
      this.menuList = [];

      this.menuList = [];


      this.menuNavChange = new BehaviorSubject(this.menuList);

      this.router.events.filter(event => event instanceof NavigationEnd)
        .subscribe((event: NavigationEnd) => {
          this.presentMenu = [];
          this.checkMenu(event.urlAfterRedirects, this.menuList);
          if(this.presentMenu.length > 0){
            this.menuNavChange.next(this.presentMenu);
          }
        });
    }
    private checkMenu(url: string, menu: MenuAuthorizedItemModel[]){

      for(let index=0,len = menu.length;index < len;index++){
        if(url.startsWith(menu[index].url)){
          this.presentMenu.push(menu[index]);
          this.checkMenu(url,menu[index].children);
          break;
        }

      }
    }

    public getMenuAuthorized(): Promise<MenuAuthorizedItemModel[]> {
      const workborad = {
        state: 'app.workborad',
        channel: 0,
        children: [],
        code: '002',
        icon: '',
        id: 1,
        leaf: 1,
        name: '工作台',
        parentId: 0,
        seq: 1,
        showFlag: 1,
        url: '/main/workboard'
      };
      const companyManage = {
        channel: 0,
        state: 'app.companyManage',
        children: [{
          channel: 0,
          children: [{
            state: 'app.companyManage.personalInfo',
            children: [],
            code: '002',
            icon: '',
            id: 1,
            leaf: 1,
            name: '个人信息',
            parentId: 0,
            seq: 1,
            showFlag: 1,
            url: '/main/companyManage/personalInfo'
          }],
          code: '002',
          icon: '',
          id: 1,
          leaf: 1,
          name: '个人信息',
          parentId: 0,
          seq: 1,
          showFlag: 1,
          state: '',
          url: ''
        }],
        code: '002',
        icon: '',
        id: 1,
        leaf: 1,
        name: '内部管理',
        parentId: 0,
        seq: 1,
        showFlag: 1,
        url: '/main/companyManage'
      };
      const dataStatistics = {
        channel: 0,
        state: 'app.companyManage',
        children: [{
          channel: 0,
          children: [{
            state: 'app.companyManage.personalInfo',
            children: [],
            code: '002',
            icon: '',
            id: 1,
            leaf: 1,
            name: '商户经营数据',
            parentId: 0,
            seq: 1,
            showFlag: 1,
            url: '/main/dataStatistics/operatingData'
          }],
          code: '002',
          icon: '',
          id: 1,
          leaf: 1,
          name: '经营数据',
          parentId: 0,
          seq: 1,
          showFlag: 1,
          state: '',
          url: ''
        }],
        code: '002',
        icon: '',
        id: 1,
        leaf: 1,
        name: '数据统计',
        parentId: 0,
        seq: 1,
        showFlag: 1,
        url: '/main/dataStatistics'
      };
      this.menuList = [];
      this.menuList.push( <MenuAuthorizedItemModel>workborad );
      this.menuList.push(<MenuAuthorizedItemModel>companyManage);
      this.menuList.push(<MenuAuthorizedItemModel>dataStatistics);
      return Promise.resolve(this.menuList);
    }
   /* public getMenuAuthorized(): Observable<HttpUtilNs.UfastHttpResT<MenuAuthorizedItemModel[]>> {

      return this.http.get('ius', 'menu/authorized')
        .pipe(map((menuData: UfastHttpAnyResModel) => {
          if (menuData.code === 0) {
            this.modifyMenu(menuData.value);
            this.menuList = menuData.value;
          }
          console.log(menuData);
          return menuData;
        }));
    }*/
    private modifyMenu(menuList: MenuAuthorizedItemModel[]) {
      menuList.forEach( menu => {
        menu.url = menu.url.startsWith('/') ? '/main' + menu.url : '/main/' + menu.url;
        this.modifyMenu(menu.children || []);
      });
/*      for(let i=0,len=menuList.length;i < len;i++){
        menuList[i].url = menuList[i].url.startsWith('/') ? '/main' + menuList[i].url : '/main/' + menuList[i].url;
        this.modifyMenu(menuList[i].children || []);
      }*/
    }

    public getListMenuBySite(site:string):Observable<HttpUtilNs.UfastHttpResT<MenuAuthorizedItemModel[]>>{

      return this.http.get('ius','/menu/listMenuBySite',new HttpParams({
        fromObject:{
          site:site
        }
      }));
    }
  }

}
