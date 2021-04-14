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
  SizeList = [
    { value: "", display: " " },
    { value: "0201", display: "0201" },
    { value: "0402", display: "0402" },
    { value: "0603", display: "0603" },
    { value: "0805", display: "0805" },
    { value: "1206", display: "1206" },
    { value: "1210", display: "1210" },
    { value: "2010", display: "2010" },
    { value: "2512", display: "2512" },
    { value: "14-SOIC", display: "14-SOIC" },
    { value: "14-TSSOP", display: "14-TSSOP" },
    { value: "20-DIP", display: "20-DIP" },
    { value: "20-LSSOP", display: "20-LSSOP" },
    { value: "20-SOIC", display: "20-SOIC" },
    { value: "20-SSOP", display: "20-SSOP" },
    { value: "20-TSSOP", display: "20-TSSOP" },
    { value: "20-VFQFN", display: "20-VFQFN" },
  ];
  TypeList = [
    { value: "", display: " " },
    { value: "CAP", display: "CAP" },
    { value: "RES", display: "RES" },
    { value: "IC", display: "IC" },
    { value: "DIODE", display: "DIODE" },
    { value: "CONN", display: "CONN" },
  ];
  componentParams: any = {};
  pagination: Pagination;

  constructor(
    private componentService: ComponentService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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
