import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reels } from 'src/app/_models/Reels';
import { ReelService } from 'src/app/_services/reel.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-take-reel',
  templateUrl: './take-reel.component.html',
  styleUrls: ['./take-reel.component.css']
})
export class TakeReelComponent implements OnInit {
  model: any = {};
  @Output() history: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private reelService: ReelService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  SetLocation() {
    this.reelService.SetLocation(this.model).subscribe(()=>{
      this.alertify.success('sekmingai uzregistruota');
      this.history.emit(true);
    }, error => {
      this.alertify.error(error);
    });
    console.log(this.model);
  }

}
