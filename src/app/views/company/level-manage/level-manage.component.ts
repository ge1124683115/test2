import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup,FormBuilder} from "@angular/forms";

import { ShowMessageService } from "../../../widget/show-message/show-message";
import { CompanyServiceNs } from "../../../core/trans/company.service";
import { ScepterServiceNs } from "../../../core/common-services/scepter.service";
import { MenuServiceNs } from "../../../core/common-services/menu.service";
import { environment } from "../../../../environments/environment";

export enum TabPageType{
  MainPage = 0,
  AddPage,
  EditPage,
  SettingPage
};

@Component({
  selector: 'app-scepter',
  templateUrl: './level-manage.component.html',
  styleUrls: ['./level-manage.component.scss']
})
export class LevelManageComponent implements OnInit {

  tabPageIndex:number;
  tabPageType:TabPageType;
  levelDataList:CompanyServiceNs.LevelItemModel[];
  levelTableConfig:any;
  selectedLevelIdList:string[];
  editLevelNo:string;
  targetLevel:CompanyServiceNs.LevelItemModel;

  setMenuLevelName:string;
  levelForm:FormGroup;
  disableEditDefault:boolean;

  roleDataList:any[];

  authTree:MenuServiceNs.MenuAuthorizedItemModel[];

  authCodeObj:any;
  menuCodeObj:any;
  menuIndeterminateObj:any;

  constructor(private messageService:ShowMessageService,private levelService:CompanyServiceNs.CompanyService,
                private formBuilder:FormBuilder,private roleScepterService:ScepterServiceNs.ScepterService,
                private menuService:MenuServiceNs.MenuService
  ) {
    this.tabPageType = TabPageType.MainPage;
    this.tabPageIndex = 0;

    this.levelDataList = [];
    this.selectedLevelIdList = [];

    this.levelTableConfig = {
      allChecked: false,
      loading:false,
      pageNum:1,
      total:0,
      pageSize:20,
      header:[{
        name:"名称",
        field:"levelName",
        width:"230px"
      },{
        name:"价格(元)",
        field:"price",
        width:"100px"
      },{
        name:"描述",
        field:"remark",
        width:"500px"
      },{
        name:"天数",
        field:"levelDays",
        width:"100px"
      }]
    };
    this.roleDataList = [];
    this.disableEditDefault = false;

    this.setMenuLevelName = "";

    this.authCodeObj = {};
    this.menuCodeObj = {};
    this.menuIndeterminateObj = {};

    this.authTree = [{
      auths:[],
      name:"",
      url:"",
      children:[]
    }];

  }

  public levelTabChange(){
    //用户点击标签页切换
    if(this.tabPageType !== TabPageType.MainPage){
      if(this.tabPageIndex === 0){
        this.toggleMainPage();
      }
    }
  }
  public addOrEditLevel(type:number,levelItem:CompanyServiceNs.LevelItemModel){
    this.tabPageType = type;
    this.tabPageIndex = 1;

    if(type === TabPageType.EditPage){
      this.editLevelNo = levelItem.levelNo;
      this.levelService.getLevelDetail(levelItem.levelNo).subscribe((resData:any) => {
        if(resData.code !== 0){
          this.messageService.showAlertMessage("",resData.message,"error");
          return;
        }
        if(resData.value.defaulted === 1){
          this.disableEditDefault = true;
        }
        let tempObj = {
          levelName:resData.value.levelName,
          price:resData.value.price/100,
          remark:resData.value.remark,
          levelDays:resData.value.levelDays,
          defaulted:resData.value.defaulted + ""
        };
        let tempList = resData.value.plaLevelRoleNumVOS || [];

        tempList.forEach((item,index) => {
          tempObj[item.roleId] = item.number;
        });
        this.levelForm.patchValue(tempObj);
      },(error:any) => {
        this.messageService.showAlertMessage("",error.message,"error");
      });



    }else if(type === TabPageType.AddPage){
      this.levelForm.patchValue({
        defaulted:"0"
      });
    }else{
      return;
    }
  }
  public getRoleList(){
    this.roleScepterService.getRoles().subscribe((resData:ScepterServiceNs.GetRoleResModel) => {
      if(resData.code !== 0){
        this.messageService.showAlertMessage("",resData.message,"warning");
        return;
      }
      let tempList = [];
      resData.value.forEach((item,index) => {
        if(item.id === "1"){
          return;
        }
        let temp = {
          roleId:item.id,
          roleName:item.name,
          number:0,
        };
        this.levelForm.addControl(temp.roleId,this.formBuilder.control(temp.number,[Validators.required,Validators.min(0),Validators.max(99999999999)]));
        tempList.push(temp);
      });
      this.roleDataList = tempList;
    },(error:any) => {
      this.messageService.showAlertMessage("",error.message,"error");
    });
  }
  public setDefaultLevel(item:CompanyServiceNs.LevelItemModel){
    let data = {
      levelNo:item.levelNo,
      defaulted:1
    };
    this.levelService.updateLevel(data).subscribe((resData:any) => {
      if(resData.code !== 0){
        this.messageService.showAlertMessage("",resData.message,"error");
        return;
      }
      this.messageService.showToastMessage("操作成功","success");
      this.getLevelList();
    },(error:any) => {
      this.messageService.showAlertMessage("",error.message,"error");
    });
  }
  public deleteLevel(idList?:string[]){
    idList = idList || this.selectedLevelIdList;
    if(idList.length === 0){
      this.messageService.showToastMessage("请选择需要删除的行","info");
      return;
    }
    this.messageService.showAlertMessage("","您确定要删除码？","confirm")
      .afterClose.subscribe((type:string) => {
        if(type !== "onOk"){
          return;
        }
        this.levelService.deleteLevels(idList).subscribe((resData:CompanyServiceNs.UfastHttpAnyResModel) => {
          if(resData.code === 0){
            this.messageService.showToastMessage("操作成功","success");
            this.getLevelList();
          }else{
            this.messageService.showAlertMessage("",resData.message,"error");
          }
        },(error:any) => {
          this.messageService.showAlertMessage("",error.message,"error");
        });
      });
  }
  public toggleMainPage(){
    this.tabPageType = TabPageType.MainPage;
    this.tabPageIndex = 0;



    this.levelForm.reset();
    this.roleDataList.forEach((item,index) => {
      item.number = 0 ;
    });
    this.menuCodeObj = {};
    this.authCodeObj = {};
    this.disableEditDefault = false;
  }
  public getLevelList(pageNum?:number){
    pageNum = pageNum || this.levelTableConfig.pageNum
    let filter = {
      pageNum:pageNum || this.levelTableConfig.pageNum,
      pageSize:this.levelTableConfig.pageSize,
      filters:{}
    };
    this.levelTableConfig.loading = true;
    this.levelService.queryScepterLevelList(filter).subscribe((resData:CompanyServiceNs.UfastHttpAnyResModel) => {
      this.levelTableConfig.loading = false;
      if(resData.code !== 0){
        this.messageService.showAlertMessage("",resData.message,"warning");
        return
      }
      this.levelDataList = resData.value.list || [];
      this.levelTableConfig.total = resData.value.total;
    },(error:any) => {
      this.levelTableConfig.loading = false;
      this.messageService.showAlertMessage("",error.message,"error");
    })
  }
  public checkLevelTableAll(value:boolean){
    this.selectedLevelIdList = [];
    for(let i=0,len=this.levelDataList.length;i < len;i++){
      if(this.levelDataList[i].defaulted === 1){
        continue;
      }
      this.levelDataList[i].checked = value;
      if(value){
        this.selectedLevelIdList.push(this.levelDataList[i].levelNo);
      }
    }
  }
  public checkLevelTableSingle(value:boolean,item:any){
    if(value){
      this.selectedLevelIdList.push(item.levelNo);
      if(this.selectedLevelIdList.length === this.levelDataList.length - 1){
        this.levelTableConfig.allChecked = true;
      }
    }else{
      this.levelTableConfig.allChecked = false;
      this.deleteIdSelected(item.levelNo);
    }
  }
  private deleteIdSelected(id:string){
    for(let i=0,len=this.selectedLevelIdList.length; i < len;i++){
      if(this.selectedLevelIdList[i] === id){
        this.selectedLevelIdList.splice(i,1);
        break;
      }
    }
  }
  public editOrAddSubmit(){
    for(let key in this.levelForm.controls){
      this.levelForm.controls[key].markAsDirty();
      this.levelForm.controls[key].updateValueAndValidity();
    }
    if(this.levelForm.invalid){
      return;
    }
    let submitData = {
      levelNo:this.editLevelNo || undefined,
      levelName:this.levelForm.value.levelName,
      price:this.levelForm.value.price * 100,
      remark:this.levelForm.value.remark,
      levelDays:this.levelForm.value.levelDays,
      plaLevelRoleNumVOS:this.roleDataList,
      defaulted:parseInt(this.levelForm.value.defaulted)
    };

    let observe = null;
    if(this.tabPageType === TabPageType.AddPage){
      observe = this.levelService.insertLevel(submitData);
    }else if(this.tabPageType === TabPageType.EditPage){
      observe = this.levelService.updateLevel(submitData);
    }else{
      return;
    }
    observe.subscribe((resData:CompanyServiceNs.UfastHttpAnyResModel) => {
      if(resData.code !== 0){
        this.messageService.showAlertMessage("",resData.message,"error");
        return;
      }
      this.messageService.showToastMessage("操作成功","success");
      this.toggleMainPage();
      this.getLevelList();
    },(error:any) => {
      this.messageService.showAlertMessage("",error.message,"error");
    });

  }
  public setLevelMenu(target:any){
    this.tabPageType = TabPageType.SettingPage;
    this.tabPageIndex = 2;
    this.targetLevel = target;
    this.setMenuLevelName = target.levelName;

    this.getLevelConfig(this.targetLevel.levelNo);
  }
  private getMenuAuthTree(){
    this.menuService.getListMenuBySite(environment.otherData.companySite).subscribe((resData:any) => {
      if(resData.code !== 0){
        this.messageService.showAlertMessage("",resData.message,"error");
        return;
      }
      this.authTree = resData.value;
    },(error:any) => {
      this.messageService.showAlertMessage("",error.message,"error");
    });
  }
  private getLevelConfig(levelNo:string){
    this.levelService.getLevelConfig(levelNo).subscribe((resData:any) => {
      if(resData.code !== 0){
        this.messageService.showAlertMessage("",resData.message,"error");
        return;
      }
      for(let i=0,len=resData.value.menuIds.length;i < len;i++){
        this.menuCodeObj[resData.value.menuIds[i]] = true;
      }
      for(let i=0,len=resData.value.authIds.length;i < len;i++){
        this.authCodeObj[resData.value.authIds[i]] = true;
      }
      for(let i=0,len=resData.value.length;i < len;i++){
        this.initAuthCheckAll(resData.value[i]);
      }
    },(error:any) => {
      this.messageService.showAlertMessage("",error.message,"error");
    });
  }
  private initAuthCheckAll(nodeTree:MenuServiceNs.MenuAuthorizedItemModel){
    if(!nodeTree.children || nodeTree.children.length === 0){
      return;
    }
    let prev:boolean = this.menuCodeObj[nodeTree.children[0].id] || false;

    for(let index=0,len = nodeTree.children.length;index < len;index++){
      this.initAuthCheckAll(nodeTree.children[index]);
      this.menuCodeObj[nodeTree.children[index].id] = this.menuCodeObj[nodeTree.children[index].id] || false;
      if(prev !== this.menuCodeObj[nodeTree.children[index].id]){

        this.menuIndeterminateObj[nodeTree.id] = true;
        break;
      }
      prev = this.menuCodeObj[nodeTree.children[index].id];
    }
  }
  /**
   * menuNodes:目标节点到最外层父节点
   * **/
  public checkAllMenuState(value:boolean,menuNodes:ScepterServiceNs.MenuShownItemModel[]){

    let length:number = menuNodes.length;


    if(!value){
      this.menuIndeterminateObj[menuNodes[0].id] = value;
    }

    this.checkChildMenu(menuNodes[0],value);

    for(let index=1;index < length;index++){
      this.checkSiblingMenu(menuNodes[index]);
    }

  }
  public checkAllAuthState(value:boolean,menuNodes:ScepterServiceNs.MenuShownItemModel[]){
    if(value){
      this.menuCodeObj[menuNodes[0].id] = true;
    }

    for(let index=1,len = menuNodes.length;index < len;index++){
      this.checkSiblingMenu(menuNodes[index]);
    }
  }
  /**遍历兄弟节点**/
  private checkSiblingMenu(parentNode:ScepterServiceNs.MenuShownItemModel){


    let prev:boolean = this.menuCodeObj[parentNode.children[0].id] || false,
      indeterminate:boolean = false,
      index=0,
      len = parentNode.children.length;

    this.menuCodeObj[parentNode.id] = false;

    for(;index < len;index ++){
      this.menuCodeObj[parentNode.children[index].id] = this.menuCodeObj[parentNode.children[index].id] || false;
      if(!indeterminate && prev !== this.menuCodeObj[parentNode.children[index].id]){
        this.menuIndeterminateObj[parentNode.id] = true;
        this.menuCodeObj[parentNode.id] = true;
        indeterminate = true;
        break;
      }
      prev = this.menuCodeObj[parentNode.children[index].id];
    }

    if(index === len){
      if(this.menuCodeObj[parentNode.children[0].id]){
        this.menuCodeObj[parentNode.id] = true;
      }else{
        this.menuCodeObj[parentNode.id] = false;
      }
      this.menuIndeterminateObj[parentNode.id] = false;
    }


  }
  /**遍历子节点**/
  private checkChildMenu(node:ScepterServiceNs.MenuShownItemModel,value){
    if(!node.children || node.children.length === 0){
      return;
    }
    for(let index=0,len = node.children.length;index < len;index++){
      this.menuCodeObj[node.children[index].id] = value;
      this.checkChildMenu(node.children[index],value);
    }
  }
  public setAuthSubmit(){
    let reqData = {
      authIds:[],
      menuIds:[],
      tempId:this.targetLevel.levelNo,
    };
    for(let keyMenu in this.menuCodeObj){
      if(this.menuCodeObj[keyMenu]){
        reqData.menuIds.push(parseInt(keyMenu));
      }
    }
    for(let keyAuth in this.authCodeObj){
      if(this.authCodeObj[keyAuth]){
        reqData.authIds.push(parseInt(keyAuth));
      }
    }
    this.levelService.setLevelConfig(reqData)
      .subscribe((resData:ScepterServiceNs.ScepterResModelT<any>) => {
        if(resData.code !== 0){
          this.messageService.showAlertMessage("",resData.message,"warning");
          return;
        }
        this.messageService.showToastMessage("设置成功","success");
        this.toggleMainPage();
      },(error) => {
        this.messageService.showAlertMessage("",error.message,"error");
      });
  }
  ngOnInit() {
    this.getLevelList();
    this.getMenuAuthTree();
    this.levelForm = this.formBuilder.group({
      levelName:[null,[Validators.required]],
      price:[null,[Validators.required,Validators.max(9999999999999.99)]],
      remark:[null,[]],
      levelDays:[null,[Validators.required,Validators.max(99999999999)]],
      defaulted:[null]
    });
    this.getRoleList();
  }
}
