import { Component, OnInit, Input } from '@angular/core';
import * as faker from 'faker';
import { BOM } from '../_models/BOM';
import { BOMService } from '../_services/BOM.service';
import { Components } from '../_models/components';

@Component({
  selector: 'app-BOM',
  templateUrl: './BOM.component.html',
  styleUrls: ['./BOM.component.css']
})
export class BOMComponent implements OnInit {
  importBOM: BOM[] = [];
  ChechMatch1 = false;
  @Input() components: Components;
  

  constructor(private BOMSrv: BOMService) { }

  ngOnInit(): void {
    for (let index = 0; index < 10; index++){
      const bom = new BOM();
    }
  }
  onFileChange(evt: any) {
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data = this.BOMSrv.importFromFile(bstr) as any[];

      const header: string[] = Object.getOwnPropertyNames(new BOM());
      const importedData = data.slice(1, -1);

      this.importBOM = importedData.map(arr => {
        const obj = {};

        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return obj as BOM;

      });
    };
    reader.readAsBinaryString(target.files[0]);

  }

  FindMatch(){
    

  }
  


}
