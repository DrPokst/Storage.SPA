import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { BomList } from 'src/app/_models/BomList';
import { xBomList } from 'src/app/_models/xBomList';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BOMService } from 'src/app/_services/BOM.service';
import { ReelService } from 'src/app/_services/reel.service';
import Swal from 'sweetalert2';

export interface UsersData {
  name: string;
  id: number;
}

const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, name: 'Artificial Intelligence'},
  {id: 1560608796014, name: 'Machine Learning'},
  {id: 1560608787815, name: 'Robotic Process Automation'},
  {id: 1560608805101, name: 'Blockchain'}
];

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
  displayedColumns: string[] = ['buhNr', 'manufPartNr', 'componentasId', 'QTY', 'action'];
  xdisplayedColumns: string[] = ['xQTY', 'xcomponentasId', 'truksta']
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(private router: Router, private bomService: BOMService,
              private alertify: AlertifyService, private route: ActivatedRoute, private reelService: ReelService, public dialog: MatDialog) { }

  ngOnInit(): void {


    this.registerForm = new FormGroup(
      {
        xQTY: new FormControl("1")
      }
    );
    this.GetBomList();
  }

  async updateRowData(line: BomList){

    const { value: numeris } = await Swal.fire({
      title: 'Komponento keitimas',
      input: 'text',
      inputLabel: 'Įveskite naują buhalterinis nr.',
      inputValue: line.buhNr,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    })

    if (numeris) {
      line.buhNr = numeris;
      this.bomService.UpdateList(line).subscribe((bomList: BomList[]) => {
        Swal.fire({
          icon: 'success',
          title: 'Pakeista!',
          showConfirmButton: false,
          timer: 1500
        })

      this.GetBomList();
      this.submit();
      }, error => {
        this.alertify.error('Nerastas buhalterinis nr. ');
      });
    }
  }
  deleteRowData(line: BomList){
    Swal.fire({
      title: 'Ar tikrai norite ištrinti BOM eilitę?',
      text: "Ištrintos ilutės nebesugražinsite!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Taip, ištrinti!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bomService.DeleteList(line.id).subscribe((bomList: BomList[]) => {
          this.GetBomList();
          this.submit();
          Swal.fire({
            icon: 'success',
            title: 'Ištrinta',
            showConfirmButton: false,
            timer: 1500
          })

        }, error => {
          console.log(error);
        });
      }
    })
  }

  GetBomList()
  {
    this.submit();
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
    }, error => {
      this.alertify.error(error);
    });
    this.check = true;
  }

  TurnOnLed(id: number){
    this.reelService.TurnOnLed(id).subscribe(()=>{
      this.alertify.success('sekmingai uzdegta');
    }, error => {
      this.alertify.error(error);
    });
  }


}
