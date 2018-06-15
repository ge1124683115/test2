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
    private hasUrlFound = false;
    constructor(private http: HttpUtilNs.HttpUtilService, private router: Router){
      this.menuList = [];

      this.menuList = [];


      this.menuNavChange = new BehaviorSubject(this.menuList);

      this.router.events.filter(event => event instanceof NavigationEnd)
        .subscribe((event: NavigationEnd) => {
          this.presentMenu = [];
          this.hasUrlFound = false;
          this.checkMenu(event.urlAfterRedirects, this.menuList, 0);
          if (this.presentMenu.length > 0) {
            this.menuNavChange.next(this.presentMenu);
          }
        });
    }
    private checkMenu(url: string, menu: MenuAuthorizedItemModel[], levelIndex: number){
      if (this.hasUrlFound) {
        return;
      }
      for (let index = 0, len = menu.length; index < len; index++) {
        const menuItem = menu[index];
        if (this.hasUrlFound) {
          return;
        }
        if ( url === menuItem.url) {
          this.hasUrlFound = true;
        }
        // 当url为空的时候，下面这个判断为true, 对于一些伪路由，只有标签名没有url
        if (url.startsWith(menuItem.url)) {
          this.presentMenu[levelIndex] = menuItem;
          this.checkMenu(url, menuItem.children, levelIndex + 1);
          if (!!menuItem.url) {
            break;
          }
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
      const dataStatistics = {
        channel: 0,
        state: 'app.dataStatistics',
        code: '002',
        icon: '',
        id: 1,
        leaf: 1,
        name: '数据统计',
        parentId: 0,
        seq: 1,
        showFlag: 1,
        url: '/main/dataStatistics',
        children: [
          {
          channel: 0,
          code: '002',
          icon: '',
          id: 1,
          leaf: 1,
          name: '经营数据',
          parentId: 0,
          seq: 1,
          showFlag: 1,
          state: '',
          url: '',
          children: [{
            state: 'app.dataStatistics.operatingData',
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
        },
          {
          channel: 0,
          code: '002',
          icon: '',
          id: 1,
          leaf: 1,
          name: '农药数据',
          parentId: 0,
          seq: 1,
          showFlag: 1,
          state: '',
          url: '',
          children: [{
            state: 'app.dataStatistics.pesticideQuery',
            children: [],
            code: '002',
            icon: '',
            id: 1,
            leaf: 1,
            name: '农药查询',
            parentId: 0,
            seq: 1,
            showFlag: 1,
            url: '/main/dataStatistics/pesticideQuery'
          }, {
            state: 'app.dataStatistics.restrictPesticideQuery',
            children: [],
            code: '002',
            icon: '',
            id: 1,
            leaf: 1,
            name: '限制农药查询',
            parentId: 0,
            seq: 1,
            showFlag: 1,
            url: '/main/dataStatistics/restrictPesticideQuery'
          }, /*{
            state: 'app.dataStatistics.suspectedPesticideQuery',
            children: [],
            code: '002',
            icon: '',
            id: 1,
            leaf: 1,
            name: '存疑农药查询',
            parentId: 0,
            seq: 1,
            showFlag: 1,
            url: '/main/dataStatistics/suspectedPesticideQuery'
          }*/],
        },
          {
          channel: 0,
          code: '002',
          icon: '',
          id: 1,
          leaf: 1,
          name: '商户数据',
          parentId: 0,
          seq: 1,
          showFlag: 1,
          state: '',
          url: '',
          children: [{
            state: 'app.dataStatistics.merchantData',
            children: [],
            code: '002',
            icon: '',
            id: 1,
            leaf: 1,
            name: '商户查询',
            parentId: 0,
            seq: 1,
            showFlag: 1,
            url: '/main/dataStatistics/merchantData'
          }],
        }
        ]
      };
      this.menuList = [];
      this.menuList.push( <MenuAuthorizedItemModel>workborad );
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
