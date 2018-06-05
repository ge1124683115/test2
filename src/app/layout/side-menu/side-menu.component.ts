import { Component,Input,Output,EventEmitter } from "@angular/core";
import { MenuServiceNs } from "../../core/common-services/menu.service";
import { Router,NavigationEnd } from "@angular/router";

@Component({
  selector:"side-menu",
  styleUrls:["./side-menu.component.scss"],
  templateUrl:"./side-menu.component.html"
})
export class SideMenuComponent{
  @Input() sideMenu:MenuServiceNs.MenuAuthorizedItemModel;
  @Input() width:string;
  @Input() isCollapsed:boolean;
  @Output() isCollapsedChange:EventEmitter<boolean>;

  selectedItem:string;

  constructor(public router:Router){
    this.isCollapsedChange = new EventEmitter();
    this.isCollapsed = false;
    this.width = "210px";
    this.sideMenu = {url:"",name:"",children:[],auths:[]};

    this.router.events
      .subscribe((event:NavigationEnd) => {
        if(event instanceof  NavigationEnd){
          this.selectedItem = event.urlAfterRedirects;
        }
      });
  }
  public toggleCollapsed(){
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);
  }
  public navigate(url:string){
    this.selectedItem = url;
    this.router.navigateByUrl(url);
  }
}
