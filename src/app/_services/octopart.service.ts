import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular/apollo';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Search } from '../_models/octopart/search';

@Injectable({
  providedIn: 'root'
})
export class OctopartService {
  baseUrl = environment.apiUrl;
  que: any;
  constructor(private http: HttpClient, private apollo: Apollo) { }

  registerComponent(model: Search){
    localStorage.setItem('token', '7be19da2-7329-4e35-83a3-61a97d1bb694');

    return this.http.post(this.baseUrl + 'https://octopart.com/api/v4/endpoint', model);

  }

}
