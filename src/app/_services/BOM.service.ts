import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BomName } from '../_models/BomName';
import { BomList } from '../_models/BomList';
import { xBomList } from '../_models/xBomList';

@Injectable({
  providedIn: 'root'
})
export class BOMService {
  baseUrl = environment.apiUrl;
  
constructor(private http: HttpClient) { }

public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
  /* read workbook */
  const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

  /* grab first sheet */
  const wsname: string = wb.SheetNames[0];
  const ws: XLSX.WorkSheet = wb.Sheets[wsname];

  /* save data */
  const data = (XLSX.utils.sheet_to_json(ws, { header: 1 })) as XLSX.AOA2SheetOpts;

  return data;
}

UploadBom(model: any) {
  return this.http.post(this.baseUrl + 'bom', model);
}

GetBomNames(): Observable<BomName[]>{
  return this.http.get<BomName[]>(this.baseUrl + 'bom');
}

deleteBom(bomName: string) {
  return this.http.delete(this.baseUrl + 'bom/' + bomName);
}
GetBomList(name: string): Observable<BomList[]>{
  return this.http.get<BomList[]>(this.baseUrl + 'bom/' + name);
}
GetxBomList(name: string, xQty: number): Observable<xBomList[]>{
  return this.http.get<xBomList[]>(this.baseUrl + 'bom/' + name + '/check/' + xQty);
}
}
