import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reels } from '../_models/Reels';
import { ReelsListComponent } from '../Reels/reels-list/reels-list.component';

@Injectable({
  providedIn: 'root'
})
export class CompareService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }


getCompare(id): Observable<Reels[]>{
  return this.http.get<Reels[]>(this.baseUrl + 'comparise/' + id);
}

}
