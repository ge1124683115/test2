import { Injectable,EventEmitter, } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { Router,NavigationEnd } from "@angular/router";
import { HttpUtilNs } from "../infra/http/http-util.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import "rxjs/operators/filter";

export namespace MenuServiceNs{
  export interface UfastHttpAnyResModel extends HttpUtilNs.UfastHttpResT<any>{}

  export interface MenuAuthorizedItemModel{
    auths:{authDesc:string; authId:number;authName:string;parentId:number;}[]
    channel?:number;
    children:MenuAuthorizedItemModel[];
    code?:string;
    icon?:string;
    id?:number;
    leaf?:number;
    name:string;
    parentId?:number;
    seq?:number;
    showFlag?:number;
    state?:string;
    url:string;
  }

  @Injectable()
  export class MenuService{

    menuList:MenuAuthorizedItemModel[];
    menuNavChange:BehaviorSubject<MenuAuthorizedItemModel[]>;
    presentMenu:MenuAuthorizedItemModel[];

    constructor(private http:HttpUtilNs.HttpUtilService,private router:Router){
      this.menuList = [];

      this.menuList = [];


      this.menuNavChange = new BehaviorSubject(this.menuList);

      this.router.events.filter(event => event instanceof NavigationEnd)
        .subscribe((event:NavigationEnd) => {
          this.presentMenu = [];
          this.checkMenu(event.urlAfterRedirects,this.menuList);
          if(this.presentMenu.length > 0){
            this.menuNavChange.next(this.presentMenu);
          }
        });
    }
    private checkMenu(url:string,menu:MenuAuthorizedItemModel[]){

      for(let index=0,len = menu.length;index < len;index++){
        if(url.startsWith(menu[index].url)){
          this.presentMenu.push(menu[index]);
          this.checkMenu(url,menu[index].children);
          break;
        }

      }
    }
    public getMenuAuthorized():Observable<HttpUtilNs.UfastHttpResT<MenuAuthorizedItemModel[]>>{

      return this.http.get("ius","/menu/authorized")
        .pipe(map((menuData:UfastHttpAnyResModel) => {
          if(menuData.code === 0){
            this.modifyMenu(menuData.value);
            this.menuList = menuData.value;
          }
          return menuData;
        }))
    }
    private modifyMenu(menuList:MenuAuthorizedItemModel[]){
      for(let i=0,len=menuList.length;i < len;i++){
        menuList[i].url = menuList[i].url.startsWith("/") ? "/main" + menuList[i].url : "/main/" + menuList[i].url;
        this.modifyMenu(menuList[i].children || []);
      }
    }

    public getListMenuBySite(site:string):Observable<HttpUtilNs.UfastHttpResT<MenuAuthorizedItemModel[]>>{

      return this.http.get("ius","/menu/listMenuBySite",new HttpParams({
        fromObject:{
          site:site
        }
      }));
    }
  }

}
