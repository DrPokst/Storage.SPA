import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import Observable from "zen-observable";
import { variable } from "@angular/compiler/src/output/output_ast";
import { map } from "rxjs/operators";
import { Components } from "src/app/_models/components";
import { DomSanitizer } from "@angular/platform-browser";
import { OctopartService } from "src/app/_services/octopart.service";
import { Data } from "src/app/_models/octopart/octopart";


@Component({
  selector: "app-info-octopart",
  templateUrl: "./info-octopart.component.html",
  styleUrls: ["./info-octopart.component.css"],
})
export class InfoOctopartComponent implements OnInit {
  loading: boolean;
  @Input() components: Components;
  sanitizedUrl: any;
  info: Data;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private octopart: OctopartService) {}

  ngOnInit(): void {
    this.get_info(this.components.mnf);
    }

  get_info(mnf: string) {
    this.octopart.getInfo(this.components.mnf).subscribe((info: Data) => {
      this.info = info;
    }, error => {

    });
  }
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}
}
