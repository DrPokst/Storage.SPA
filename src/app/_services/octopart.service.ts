import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Data } from '../_models/octopart/octopart';

@Injectable({
  providedIn: 'root'
})
export class OctopartService {
  baseUrl = environment.apiUrl;
  que: any;
  constructor(private http: HttpClient) { }

  getInfo(mnf){
    return this.http.get<Data>(this.baseUrl + 'component/octopart/' + mnf);
  }

}
