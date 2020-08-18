import { Component, OnInit } from '@angular/core';
import { ReelService } from 'src/app/_services/reel.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { history } from 'src/app/_models/history';

@Component({
  selector: 'app-both',
  templateUrl: './both.component.html',
  styleUrls: ['./both.component.css']
})
export class BothComponent implements OnInit {
  historyy: history[];

  constructor(private reelService: ReelService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.GetHistory();
  }


  GetHistory() {
    this.reelService.getHistory().subscribe((history: history[])=>{
      this.historyy = history;
      
    }, error => {
      this.alertify.error(error);
    });
  }
}
