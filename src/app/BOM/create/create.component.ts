import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BomName } from 'src/app/_models/BomName';
import { CreateModalComponent } from '../create-modal/create-modal.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  bsModalRef: BsModalRef;
  @Input() bomNames: BomName[];
  
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  create(){
    const initialState = {
      bomNames: this.bomNames
    };
    this.bsModalRef = this.modalService.show(CreateModalComponent, {initialState});
    
  }

}
