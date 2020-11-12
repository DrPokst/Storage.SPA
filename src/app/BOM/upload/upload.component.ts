import { Component, Input, OnInit } from '@angular/core';
import { BOM } from 'src/app/_models/BOM';
import { Components } from 'src/app/_models/components';
import { BOMService } from 'src/app/_services/BOM.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  importBOM: BOM[] = [];
  ChechMatch1 = false;
  @Input() components: Components;
  

  constructor(private BOMSrv: BOMService) { }

  ngOnInit(): void {
    
  }
  onFileChange(evt: any) {
   

  }
}  
