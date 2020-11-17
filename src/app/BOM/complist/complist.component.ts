import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { BomList } from 'src/app/_models/BomList';
import { xBomList } from 'src/app/_models/xBomList';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BOMService } from 'src/app/_services/BOM.service';

@Component({
  selector: 'app-complist',
  templateUrl: './complist.component.html',
  styleUrls: ['./complist.component.css']
})
export class ComplistComponent implements OnInit {
  bomList: BomList[];
  xbomList: xBomList[];
  registerForm: FormGroup;
  model: any = {};
  check = false;

  constructor(private router: Router, private bomService: BOMService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.GetBomList();
    this.registerForm = new FormGroup(
      {
        xQTY: new FormControl()
      }
    );
  }

  GetBomList()
  {
    this.bomService.GetBomList(this.route.snapshot.params['name']).subscribe((bomList: BomList[]) => {
      this.bomList = bomList;
    }, error => {
      console.log(error);
    });
  }

  submit(){
    this.bomService.GetxBomList(this.route.snapshot.params['name'], this.registerForm.get('xQTY').value)
                   .subscribe((xbomList: xBomList[]) => {
      this.xbomList = xbomList;
      this.alertify.success('info sekmingai gauta');
    }, error => {
      this.alertify.error(error);
    });
    this.check = true;
  }


}
