import { Component, OnInit } from '@angular/core';

import { CompanyServiceNs } from "../../../core/trans/company.service";
import { ShowMessageService } from "../../../widget/show-message/show-message";
import { environment } from "../../../../environments/environment";

export enum TabPageType{
  MainPage = 0,
  AuditPage,
  DetailPage
};


@Component({
  selector: 'app-info-manage',
  templateUrl: './info-manage.component.html',
  styleUrls: ['./info-manage.component.scss']
})
export class InfoManageComponent implements OnInit {

  tabPageIndex:number;

  companyTableConfig:any;
  companyDataList:CompanyServiceNs.CompanyModel[];
  companyDetail:CompanyServiceNs.CompanyModel;

  photoBaseUrl:string = environment.baseUrl.dev + "/cpyPhoto/loadImage?path=";
  pageType:number;

  constructor(private companyService:CompanyServiceNs.CompanyService,private message:ShowMessageService) {
    this.companyDataList = [];
    this.pageType=TabPageType.MainPage;
    this.companyTableConfig = {
      loading:false,
      pageNum:1,
      total:0,
      pageSize:20,
      header:[
        {
          name:"企业名称",
          field:"orgName",
          width:"200px"

        },{
          name:"企业编号",
          field:"orgId",
          width:"150px"
        },{
          name:"地址",
          field:"orgAddress",
          width:"230px"
        },{
          name:"手机",
          field:"orgPhone",
          width:"100px"
        },{
          name:"等级",
          field:"levelName",
          width:"200px"
        },{
          name:"锁定状态",
          field:"lockStatus",
          width:"100px"
        },{
          name:"审核状态",
          field:"status",
          width:"100px",
          fieldPipe:(status:number) => {
            if(status === 0){
              return "待审核";
            }else if(status === 1){
              return "审核通过";
            }else{
              return "审核未通过"
            }
          }
        }
      ]
    };
    this.companyDetail = {
      orgId:"",
      cpyLevelVO:{
        plaLevelVO:{}
      },
      cpyRouteVOS:[]
    };
  }
  public updateLock(item:CompanyServiceNs.CompanyModel){
    let message = item.lockStatus === 1 ? "解锁":"锁定";
    this.message.showAlertMessage("",`确定要${message}'${item.orgName}'吗?`,"confirm").afterClose.subscribe((type:string) => {
      if(type !== "onOk"){
        return;
      }
      this.companyService.companyLockOrUnlock(item.orgId,item.lockStatus).subscribe((resData:any) => {
        if(resData.code === 0){
          this.message.showToastMessage("操作成功","success");
          item.lockStatus = 1 - item.lockStatus;
        }else{
          this.message.showAlertMessage("",resData.message,"error");
        }
      },(error:any) => {
        this.message.showAlertMessage("",error.message,"error");
      });
    });
  }
  public toggleAuditTab(item:CompanyServiceNs.CompanyModel,type:number){
    if(type === TabPageType.AuditPage && item.status === 1){
      return;
    }
    this.tabPageIndex = TabPageType.AuditPage;
    this.pageType = type;
    this.getCompanyDetail(item.orgId);
  }
  public tabChange(index:number){
    if(index === TabPageType.MainPage){
      this.toggleMainPage();
    }
  }
  public getCompanyList(pageNum?:number){
    let filter:any = {
      filter:{},
      pageSize:this.companyTableConfig.pageSize,
      pageNum:pageNum || this.companyTableConfig.pageNum
    };
    this.companyTableConfig.loading = true;
    this.companyService.getCompanyBasicList(filter).subscribe((resData:CompanyServiceNs.UfastHttpAnyResModel) => {
      this.companyTableConfig.loading = false;
      if(resData.code !== 0){
        this.message.showAlertMessage("",resData.message,"error");
        return;
      }
      this.companyTableConfig.total = resData.value.total;
      this.companyDataList = resData.value.list;

    },(error:any) => {
      this.companyTableConfig.loading = false;
      this.message.showAlertMessage("",error.message,"error");
    });
  }
  public toggleMainPage(){
    this.tabPageIndex = TabPageType.MainPage;
    this.companyDetail = {
      orgId:"",
      cpyLevelVO:{
        plaLevelVO:{}
      },
      cpyRouteVOS:[]
    };
  }
  private getCompanyDetail(orgId:string){
    this.companyService.getCompanyDetail(orgId).subscribe((resData:any) => {
      if(resData.code !== 0){
        this.message.showAlertMessage("",resData.message,"error");
        return;
      }
      this.companyDetail = resData.value;
    },(error:any) => {
      this.message.showAlertMessage("",error.message,"error");
    });
  }
  public submitAudit(status:number){
    let data = {
      status:status,
      orgId:this.companyDetail.orgId,
      aduitRemark:this.companyDetail.aduitRemark
    };
    this.companyService.auditCompany(data).subscribe((resData:any) => {
      if(resData.code !== 0){
        this.message.showAlertMessage("",resData.message,"error");
      }else{
        this.toggleMainPage();
        this.getCompanyList();
        this.message.showToastMessage("操作成功","success");
      }
    },(error:any) => {
      this.message.showAlertMessage("",error.message,"error");
    });
  }

  ngOnInit() {
    this.getCompanyList();
  }

}
