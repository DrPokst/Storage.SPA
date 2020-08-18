import { Component, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/_services/component.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Reels } from 'src/app/_models/Reels';
import { ReelService } from 'src/app/_services/reel.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-reels-list',
  templateUrl: './reels-list.component.html',
  styleUrls: ['./reels-list.component.css']
})
export class ReelsListComponent implements OnInit {
  reels: Reels[];
  selectedreel: Reels;
  componentParams: any = {};
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 20;
  id: number;

  constructor(private reelService: ReelService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadReels();
    }
  pageChanged(event: any): void {
      this.pagination.currentPage = event.page;
      console.log(this.pagination.currentPage);
      this.pageNumber = this.pagination.currentPage;
      this.loadReels();
  }
  printf() {
    window.print();
  }
  loadReels(){
    this.reelService.getReels(this.pageNumber, this.pageSize, this.componentParams).subscribe(
      (res: PaginatedResult<Reels[]>) => {
      this.reels = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  onSelect(reel: Reels): void {
    this.selectedreel = reel;
  }

  TurnOnLed(id: number){
    this.reelService.TurnOnLed(id).subscribe(()=>{
      this.alertify.success('sekmingai uzdegta');
    }, error => {
      this.alertify.error(error);
    });
    console.log(id);
    
  }
}
