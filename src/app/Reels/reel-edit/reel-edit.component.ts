import { Component, OnInit, Input } from '@angular/core';
import { Reels } from 'src/app/_models/Reels';
import { ReelService } from 'src/app/_services/reel.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reel-edit',
  templateUrl: './reel-edit.component.html',
  styleUrls: ['./reel-edit.component.css']
})
export class ReelEditComponent implements OnInit {
  reel: Reels;
  editForm: NgForm;

  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private reelService: ReelService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit(){
    this.getReel();
  }

  getReel(){
    this.reelService.getReel(this.route.snapshot.params['id']).subscribe((reels: Reels) =>{
      this.reel = reels;
    }, error => {
      this.alertify.error(error);
    });
  }
  deleteR(){

    this.alertify.confirm('Are you sure want to delete this reel?', ()=> {
      this.reelService.deleteReel(this.route.snapshot.params["id"]).subscribe(() => {
        this.alertify.success('Reel has been deleted');
      }, error => {
        this.alertify.error('Failed to deltete');
      });
    });
  }
  updateReel() {
    this.reelService.updateReel(this.reel.id, this.reel).subscribe(next => {
      this.alertify.success('Pakeista sekmingai');
      this.editForm.reset(this.reel);
    }, error => {
      this.alertify.error(error);
    });
    
  }

}
