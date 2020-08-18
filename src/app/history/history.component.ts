import { Component, OnInit, Input } from '@angular/core';
import { ReelService } from '../_services/reel.service';
import { history } from 'src/app/_models/history';
import { AlertifyService } from '../_services/alertify.service';
import { Components } from 'src/app/_models/components';
import { ComponentService } from '../_services/component.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  historyy: history[];
  @Input() components: Components;
  
  constructor(private componentService: ComponentService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.loadComponent()
  }

  loadComponent() {
    this.componentService
      .getComponent(this.route.snapshot.params["id"])
      .subscribe(
        (components: Components) => {
          this.components = components;
          this.historyy = this.components.history;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

}
