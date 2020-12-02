import { Component, OnInit, Input } from '@angular/core';
import * as faker from 'faker';
import { BOM } from '../_models/BOM';
import { BOMService } from '../_services/BOM.service';
import { Components } from '../_models/components';
import { BomName } from '../_models/BomName';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-BOM',
  templateUrl: './BOM.component.html',
  styleUrls: ['./BOM.component.css']
})
export class BOMComponent implements OnInit {
  bomNames: BomName[]
 
  constructor(private router: Router, private bomService: BOMService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.GetBomNames();
  }

  GetBomNames()
  {
    this.bomService.GetBomNames().subscribe((bomNames: BomName[]) => {
      this.bomNames = bomNames;
    }, error => {
      console.log(error);
    });
  }
  deleteBom(name: string){
    this.alertify.confirm('Are you sure want to delete this reel?', ()=> {
      this.bomService.deleteBom(name).subscribe(() => {
        this.alertify.success('BOM has been deleted');
        this.ngOnInit();
        this.router.navigate(['/bom']);
      }, error => {
        this.alertify.error('Failed to delete');
      });
    });
  }

}
