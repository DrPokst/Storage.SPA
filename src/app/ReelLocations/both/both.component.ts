import { Component, OnInit } from '@angular/core';
import { ReelService } from 'src/app/_services/reel.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { history } from 'src/app/_models/history';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-both',
  templateUrl: './both.component.html',
  styleUrls: ['./both.component.css']
})
export class BothComponent implements OnInit {
  historyy: history[];
  selectedhistory: History;
  componentParams: any = {};
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 20;
  id: number;

  constructor(private reelService: ReelService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.GetHistory();
  }


  GetHistory() {
    this.reelService.getHistory(this.pageNumber, this.pageSize, this.componentParams).subscribe(
      (res: PaginatedResult<history[]>) => {
      this.historyy = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    this.pageNumber = this.pagination.currentPage;
    this.GetHistory();
}
}
