import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { BomName } from 'src/app/_models/BomName';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css']
})
export class CreateModalComponent implements OnInit {
  bomNames: BomName[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
