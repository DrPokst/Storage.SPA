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
 
  constructor() { }

  ngOnInit(): void {
  }


}
