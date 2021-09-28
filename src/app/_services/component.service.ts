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
  return this.http.get<Components[]>(this.baseUrl + 'component/all');
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

  return this.http.get<Components[]>(this.baseUrl + 'component', {observe: 'response', params})
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
  return this.http.get<Components>(this.baseUrl + 'component/' + id);


}
getComponentMnf(mnf): Observable<Components>{
  return this.http.get<Components>(this.baseUrl + 'component/mnf/' + mnf);
}
getComponentsTypes(): Observable<string[]>{
  return this.http.get<string[]>(this.baseUrl + 'component/componenttypes');
}
getComponentsSizes(): Observable<string[]>{
  return this.http.get<string[]>(this.baseUrl + 'component/componentsizes');
}
updateComponent(id: number, component: Components){
  return this.http.put(this.baseUrl + 'component/' + id, component);
}

registerComponent(model: any){
  return this.http.post(this.baseUrl + 'component/registercomponent', model);
}
fastregisterComponent(model: any){
  return this.http.post(this.baseUrl + 'component/registercomponent/short', model);
}

deletePhoto(componentId: number, id: number){
  return this.http.delete(this.baseUrl + "search/" + componentId + "/photos/" + id);
}
setMainPhoto(componentId: number, id: any){
  return this.http.get(this.baseUrl + "search/" + componentId + "/photos/setmain/" + id);
}

deleteComponent(componentId: NumberConstructor){
  return this.http.delete(this.baseUrl + 'component/' + componentId);
}
}
