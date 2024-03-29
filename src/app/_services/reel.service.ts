import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reels } from '../_models/Reels';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { history } from '../_models/history';

@Injectable({
  providedIn: 'root'
})
export class ReelService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getReels(page?, itempsPerPage?, componentParams?): Observable<PaginatedResult<Reels[]>> {
    const paginatedResult: PaginatedResult<Reels[]> = new PaginatedResult<Reels[]>();
    let params = new HttpParams();

    if (page != null && itempsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itempsPerPage);
    }

    if (componentParams != null) {
      if (componentParams.CMnf != null) {
        params = params.append('CMnf', componentParams.CMnf);
      }
      if (componentParams.OrderBy != null) {
        params = params.append('orderBy', componentParams.OrderBy);
      }
    }

    return this.http.get<Reels[]>(this.baseUrl + 'reel', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }
          return paginatedResult;
        })
      );
  }

  getHistory(page?, itempsPerPage?, componentParams?): Observable<PaginatedResult<history[]>> {
    const paginatedResult: PaginatedResult<history[]> = new PaginatedResult<history[]>();
    let params = new HttpParams();

    if (page != null && itempsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itempsPerPage);
    }

    if (componentParams != null) {
      if (componentParams.CMnf != null) {
        params = params.append('CMnf', componentParams.CMnf);
      }
      if (componentParams.OrderBy != null) {
        params = params.append('orderBy', componentParams.OrderBy);
      }
    }

    return this.http.get<history[]>(this.baseUrl + 'location/history', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }
          return paginatedResult;
        })
      );
  }
  getReel(id): Observable<Reels> {
    return this.http.get<Reels>(this.baseUrl + 'reel/' + id);
  }
  getReelMnf(mnf): Observable<Reels> {
    return this.http.get<Reels>(this.baseUrl + 'reel/PagalMnf/' + mnf);
  }
  getReelsLocation(location): Observable<Reels[]> {
    return this.http.get<Reels[]>(this.baseUrl + 'reel/ListByLocation/' + location);
  }
  updateReel(id: number, reel: Reels) {
    return this.http.put(this.baseUrl + 'reel/' + id, reel);
  }
  registerReel(model: any) {
    return this.http.post(this.baseUrl + 'reel/registerreel', model);
  }
  registerReelWithLocation(model: any) {
    return this.http.post(this.baseUrl + 'reel/registerreel/stringlocation', model);
  }
  TakeOut(model: any) {
    return this.http.post(this.baseUrl + 'location', model);
  }
  SetLocation(model: any) {
    return this.http.post(this.baseUrl + 'location/put', model);
  }
  SetLocationWithLocation(model: any) {
    return this.http.post(this.baseUrl + 'location/put/withlocation', model);
  }
  ResetLocation(model: any) {
    return this.http.post(this.baseUrl + 'location/take', model);
  }
  TurnOnLed(id) {
    return this.http.put(this.baseUrl + 'led/on/' + id, id);
  }
  TurnOffLed(id) {
    return this.http.put(this.baseUrl + 'led/off/' + id, id);
  }
  TurnOnAll(color: any) {
    return this.http.put(this.baseUrl + 'led/on/all/' + color, color);
  }
  TurnOffAll() {
    return this.http.put(this.baseUrl + 'led/off/all', true);
  }
  deleteReel(reelId: NumberConstructor) {
    return this.http.delete(this.baseUrl + 'reel/' + reelId);
  }
}
