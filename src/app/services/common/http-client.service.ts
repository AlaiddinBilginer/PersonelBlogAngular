import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) { }

  private buildUrl(requestParameters: Partial<RequestParameters>, id?: string): string {
    if (requestParameters.fullEndpoint)
      return requestParameters.fullEndpoint;
  
    let url = `${requestParameters.baseUrl ?? this.baseUrl}/${requestParameters.controller}`;
  
    if (requestParameters.action)
      url += `/${requestParameters.action}`;
  
    if (id) 
      url += `/${id}`;
  
    if (requestParameters.queryString)
      url += `?${requestParameters.queryString}`;
  
    return url;
  }

  get<T>(requestParameters: Partial<RequestParameters>, id?: string): Observable<T> {
    const url = this.buildUrl(requestParameters, id);
    return this.httpClient.get<T>(url, { headers: requestParameters.headers });
  }
  
  post<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    const url = this.buildUrl(requestParameters);
    return this.httpClient.post<T>(url, body, { headers: requestParameters.headers });
  }

  put<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    const url = this.buildUrl(requestParameters);
    return this.httpClient.put<T>(url, body, { headers: requestParameters.headers });
  }

  delete<T>(requestParameters: Partial<RequestParameters>, id: string): Observable<T> {
    const url = this.buildUrl(requestParameters, id);
    return this.httpClient.delete<T>(url, { headers: requestParameters.headers });
  }

}

export class RequestParameters {
  controller: string;
  action?: string;
  queryString?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndpoint?: string;
}
