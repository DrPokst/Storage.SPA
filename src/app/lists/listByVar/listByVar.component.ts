import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Reels } from 'src/app/_models/Reels';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ReelService } from 'src/app/_services/reel.service';

@Component({
  selector: 'app-listByVar',
  templateUrl: './listByVar.component.html',
  styleUrls: ['./listByVar.component.scss']
})
export class ListByVarComponent implements OnInit {
  @Input() location = '';
  @Input() events: Observable<void>;
  reels: Reels[];
  list: any;
  private eventsSubscription: Subscription;
  displayedColumns: string[] = ['id', 'CMnf', 'componentasId', 'qty'];

  constructor(private reelService: ReelService, private alertify: AlertifyService) { }

  ngOnInit() {
    console.log(this.location);
    this.eventsSubscription = this.events.subscribe(() => this.loadReels());
  }

  loadReels(){
    this.reelService.getReelsLocation(this.location).subscribe((reelList: Reels[]) => {
      this.reels = reelList;
      console.log(this.reels[0].cMnf)
    }, error => {
    });
  }
}
