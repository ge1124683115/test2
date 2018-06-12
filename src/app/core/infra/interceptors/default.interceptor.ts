import { Injectable,Injector } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient,HttpInterceptor,HttpRequest,HttpHandler,HttpEvent,HttpEventType,HttpErrorResponse,HttpResponse } from "@angular/common/http";
import { Observable} from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/of";
import { catchError,switchMap } from "rxjs/operators";
import { LoginModalService } from "../../../widget/login-modal/login-modal";
import { NzModalRef } from "ng-zorro-antd";
import { environment } from "../../../../environments/environment";

@Injectable()
export class DefaultInterceptor implements HttpInterceptor{
  constructor(){

  }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{

    return next.handle(req).pipe(catchError(this.handleError));
  }
  private handleError(error:HttpErrorResponse){
    let status = error.status;
    let errMsg = '';

    if (status === 0) {
      errMsg = "网络出现未知的错误，请检查您的网络。"
    }
    if (status >= 300 && status < 400) {
      errMsg = '请求被服务器重定向，状态码为' + status;
    }
    if (status >= 400 && status < 500) {
      errMsg = '客户端出错，可能是发送的数据有误，状态码为' + status;
    }
    if (status >= 500) {
      errMsg = '服务器发生错误，状态码为' + status;
    }
    return Observable.throw({
      code:status,
      message:errMsg
    });

  }
}
@Injectable()
export class UfastCodeInterceptor implements HttpInterceptor{

  loginModalCtrl:NzModalRef;
  loginModalService:LoginModalService;

  constructor(private injector:Injector,private http:HttpClient,private router:Router){
    this.loginModalCtrl = null;
  }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    //添加site头
    let newReq = req.clone({
      headers:req.headers.append("x-from-site",environment.otherData.sysSite)
    });
    return next.handle(newReq)
      .pipe(this.ufastCode2(req));
  }

  /** code：2 拦截器  **/
  private ufastCode2(req:HttpRequest<any>):any{
    return switchMap((event:HttpResponse<any>) => {

      let onCancel = (observer:any)=>{};

      if(event.type !== HttpEventType.Response || (event.body.code+"") !== "2"){
        return Observable.of(event);
      }
      this.loginModalService = this.injector.get(LoginModalService);
      if(this.loginModalCtrl === null){
        //this.loginModalCtrl = this.loginModalService.showLoginModal();
      }

      //重定义observable
      let observable = Observable.create((observer) => {
        this.loginModalCtrl.afterClose.subscribe((type:string) => {
          if(type === "onOk"){
            this.http.request(req)
                .subscribe((data:any) => {
                  observer.next(data);
                });
              this.loginModalCtrl = null;
          }else{
              this.loginModalCtrl = null;
              observer.next(event);

              this.router.navigateByUrl("/login");
          }
        });

      });

      return observable;
    });

  }
}
