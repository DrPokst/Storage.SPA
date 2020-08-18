import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OdataService {
  


constructor(private http: HttpClient) { }

GetOData(model: any){
  
  return this.http.get( 'Company(' + "Light%20Conversion%2C%20UAB" + ')/Itemlist(' + model + ')/');
}

}