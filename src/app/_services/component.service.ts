import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Components } from '../_models/components';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getMnfs(): Observable<Components[]>{
  return this.http.get<Components[]>(this.baseUrl + 'search/all');
}
getComponents(page?, itempsPerPage?, componentParams?): Observable<PaginatedResult<Components[]>>{
  const paginatedResult: PaginatedResult<Components[]> = new PaginatedResult<Components[]>();
  let params = new HttpParams();

  if (page != null && itempsPerPage != null)
  {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itempsPerPage);
  }

  if (componentParams != null)
  {
    if (componentParams.Type != null) {
      params = params.append('Type', componentParams.Type);
    }
    if (componentParams.Size != null) {
      params = params.append('Size', componentParams.Size);
    }
    if (componentParams.Mnf != null) {
      params = params.append('Mnf', componentParams.Mnf);
    }
    if (componentParams.BuhNr != null) {
      params = params.append('BuhNr', componentParams.BuhNr);
    }
    if (componentParams.Nominal != null) {
      params = params.append('Nominal', componentParams.Nominal);
    }
    if (componentParams.OrderBy != null) {
      params = params.append('orderBy', componentParams.OrderBy);
    }
  }

  return this.http.get<Components[]>(this.baseUrl + 'search', {observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
        }
        return paginatedResult;
      })
    )
}

getComponent(id): Observable<Components>{
  return this.http.get<Components>(this.baseUrl + 'search/' + id);
}
getComponentMnf(mnf): Observable<Components>{
  return this.http.get<Components>(this.baseUrl + 'search/' + mnf);
}

updateComponent(id: number, component: Components){
  return this.http.put(this.baseUrl + 'search/' + id, component);
}

registerComponent(model: any){
  return this.http.post(this.baseUrl + 'search/registercomponent', model);
}

deletePhoto(componentId: number, id: number){
  return this.http.delete(this.baseUrl + 'search/' + componentId + '/photos/' + id);
}

deleteComponent(componentId: NumberConstructor){
  return this.http.delete(this.baseUrl + 'search/' + componentId);
}
}
