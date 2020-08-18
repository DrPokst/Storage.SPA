import { Component, OnInit } from '@angular/core';
import { ReelService } from 'src/app/_services/reel.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Reels } from 'src/app/_models/Reels';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-put-reel',
  templateUrl: './put-reel.component.html',
  styleUrls: ['./put-reel.component.css']
})
export class PutReelComponent implements OnInit {
  reels: Reels;
  editForm: NgForm;
  model: any = {};

  constructor(private reelService: ReelService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  
  SetLocation() {
    this.reelService.SetLocation(this.model).subscribe(()=>{
      this.alertify.success('sekmingai uzregistruota');
    }, error => {
      this.alertify.error(error);
    });
    console.log(this.model);
  }

}
