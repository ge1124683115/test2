import { Injectable } from "@angular/core";
import { HttpClient,HttpParams,HttpHeaders,HttpEventType,HttpRequest,HttpEvent,HttpProgressEvent} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../../../environments/environment";

export namespace HttpUtilNs {
  export interface UfastHttpRes{
    code:number;
    message:string;
  }
  export interface UfastHttpResT<T>{
    code:number;
    message:string;
    value:T
  }
  @Injectable()
  export class HttpUtilService {
    constructor(private http: HttpClient) {

    }

    public getFullUrl(baseUrlName: string, path: string): string {

      return environment.baseUrl[baseUrlName] + path;
    }

    private setOptions(params?: HttpParams, headers?: HttpHeaders,
                       observe: "body" | "event" = "body",
                       reportProgress: boolean = false) {
      let options: any = {
        headers: headers,
        params: params,
        observe: observe,
        reportProgress: reportProgress
      };
      return options;
    }

    public get<T>(baseUrlName: string, path: string, params?: HttpParams, headers?: HttpHeaders):Observable<any> {

      return this.http.get<T>(this.getFullUrl(baseUrlName, path), this.setOptions(params, headers))
    }

    public post<T>(baseUrlName: string, path: string, body?: any, params?: HttpParams, headers?: HttpHeaders):Observable<any>{

      return this.http.post<T>(this.getFullUrl(baseUrlName, path), body, this.setOptions(params, headers));
    }

    public put<T>(baseUrlName: string, path: string, body?: any, params?: HttpParams, headers?: HttpHeaders):Observable<any>{

      return this.http.put<T>(this.getFullUrl(baseUrlName, path), body, this.setOptions(params, headers));
    }

    public delete<T>(baseUrlName: string, path: string, params?: HttpParams, headers?: HttpHeaders):Observable<any>{

      return this.http.delete<T>(this.getFullUrl(baseUrlName, path), this.setOptions(params, headers));
    }

    public head<T>(baseUrlName: string, path: string, params?: HttpParams, headers?: HttpHeaders):Observable<any>{

      return this.http.head<T>(this.getFullUrl(baseUrlName, path), this.setOptions(params, headers));
    }

    public options<T>(baseUrlName: string, path: string, params?: HttpParams, headers?: HttpHeaders){

      return this.http.options<T>(this.getFullUrl(baseUrlName, path), this.setOptions(params, headers));
    }

  }
}



