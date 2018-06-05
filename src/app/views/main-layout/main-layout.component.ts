import { Component,ChangeDetectorRef,enableProdMode} from "@angular/core";
import { Router,NavigationEnd} from "@angular/router";
import { ShowMessageService } from "../../widget/show-message/show-message";
import { MenuServiceNs } from "../../core/common-services/menu.service";
import { UserServiceNs } from "../../core/common-services/user.service";
import "rxjs/add/operator/filter";

enableProdMode();
@Component({
  selector:"main-layout",
  styleUrls:["./main-layout.component.scss"],
  templateUrl:"./main-layout.component.html"
})
export class MainLayoutComponent{


  hideSideMenu:boolean;
  mainMenu:MenuServiceNs.MenuAuthorizedItemModel[];
  sideMenu:MenuServiceNs.MenuAuthorizedItemModel;
  selectedItem:string;
  selectedIndex:number;
  username:string;

  constructor(private messageService:ShowMessageService,private detectorRef:ChangeDetectorRef,
                private menuService:MenuServiceNs.MenuService,public router:Router,public userService:UserServiceNs.UserService
  ){
    this.selectedIndex = null;
    this.mainMenu = [];
    this.sideMenu = {name:"",url:"",children:[],auths:[]};
    this.hideSideMenu =true;


    this.menuService.menuNavChange.subscribe((presentMenu:MenuServiceNs.MenuAuthorizedItemModel[]) => {
      if(presentMenu.length === 0){
        return;
      }
      this.sideMenu = presentMenu[0];
      this.hideSideMenu = false;
      this.selectedItem = this.sideMenu.url;
    })
  }


  public topNavigate(url:string,index:number){

    //一级菜单路由必须是绝对路径
    this.router.navigateByUrl(url)
      .then(() => {
        this.hideSideMenu = false;
      });


  }
  public navigateUserInfo(){
    this.router.navigateByUrl("/main/personal/personalInfo");
  }
  public navigatePassword(){
    this.router.navigateByUrl("/main/personal/modifyPwd");
  }
  public logOut(){
    this.userService.logout().subscribe(() => {
      this.router.navigateByUrl("/login")
    },(error:any) => {
      console.log(error);
      this.router.navigateByUrl("/login")
    })
  }
  ngOnInit(){
    this.userService.getLogin().subscribe((resData:UserServiceNs.UfastHttpAnyResModel) => {
      if(resData.code === 0){
        this.username = resData.value.name;
      }else{
        this.messageService.showAlertMessage("",resData.message,"warning");
      }
    },(error:any) => {
      this.messageService.showAlertMessage("",error.message,"error");
    });
  }
  ngAfterViewInit(){

    this.menuService.getMenuAuthorized()
      .subscribe((menuData:MenuServiceNs.UfastHttpAnyResModel) => {

        if(menuData.code !== 0){
          this.messageService.showAlertMessage(menuData.message,"","warning");
          return;
        }
        this.mainMenu = menuData.value;
         this.detectorRef.detectChanges();
      });

  }

}
