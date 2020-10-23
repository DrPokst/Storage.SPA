import { Component, Inject, OnInit } from '@angular/core';
import { ReelService } from 'src/app/_services/reel.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Reels } from 'src/app/_models/Reels';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BothComponent } from '../both/both.component';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-put-reel',
  templateUrl: './put-reel.component.html',
  styleUrls: ['./put-reel.component.css']
})
export class PutReelComponent implements OnInit {
  reels: Reels;
  editForm: NgForm;
  model: any = {};

  constructor(public dialog: MatDialog,
              private reelService: ReelService,
              private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(DialogComponent);
  }
  SetLocation() {
    this.reelService.SetLocation(this.model).subscribe(() => {
      this.alertify.success('sekmingai uzregistruota');
      this.ngOnInit();
    }, error => {
      this.alertify.error(error);
    });
    console.log(this.model);
  }

}

