import { Component, OnInit } from "@angular/core";
import { Components } from "../../_models/components";
import { AlertifyService } from "../../_services/alertify.service";
import { ComponentService } from "../../_services/component.service";
import { ActivatedRoute } from "@angular/router";
import { Pagination, PaginatedResult } from "src/app/_models/pagination";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"],
})
export class MemberListComponent implements OnInit {
  components: Components[];
  SizeList : string[];
  TypeList: string[];
  componentParams: any = {};
  pagination: Pagination;

  constructor(
    private componentService: ComponentService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadComponentTypes();
    this.loadComponentSizes();
    this.route.data.subscribe((data) => {
      this.components = data["components"].result;
      this.pagination = data["components"].pagination;
    });

    this.componentParams.Size = "";
    this.componentParams.Type = "";
    this.componentParams.orderBy = "id";

  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    this.loadComponents();
  }
  resetFilter() {
    this.componentParams.Size = "";
    this.componentParams.Type = "";
    this.componentParams.Mnf = "";
    this.componentParams.Nominal = "";
    this.componentParams.BuhNr = "";
    this.loadComponents();
  }
  loadComponentTypes(){
    this.componentService
      .getComponentsTypes().subscribe((list: string[]) => {
          this.TypeList = list;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
  loadComponentSizes(){
    this.componentService
      .getComponentsSizes().subscribe((list: string[]) => {
          this.SizeList = list;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
  loadComponents() {
    this.componentService
      .getComponents(
        this.pagination.currentPage,
        this.pagination.itempsPerPage,
        this.componentParams
      )
      .subscribe(
        (res: PaginatedResult<Components[]>) => {
          this.components = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
