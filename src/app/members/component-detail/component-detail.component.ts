import { Component, OnInit, Input } from "@angular/core";
import { ComponentService } from "src/app/_services/component.service";
import { AlertifyService } from "src/app/_services/alertify.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Components } from "src/app/_models/components";
import { history } from "src/app/_models/history";
import { compOData } from "src/app/_models/compOData";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from "@kolkov/ngx-gallery";
import { CompareService } from "src/app/_services/compare.service";
import { Subscriber } from "rxjs";
import { Reels } from "src/app/_models/Reels";
import { ReelsListComponent } from "src/app/Reels/reels-list/reels-list.component";
import { Photo } from "src/app/_models/photo";
import { OdataService } from 'src/app/_services/odata.service';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: "app-component-detail",
  templateUrl: "./component-detail.component.html",
  styleUrls: ["./component-detail.component.css"],
})
export class ComponentDetailComponent implements OnInit {
  components: Components;
  history: history[];
  compodata: compOData;
  photos: Photo[];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  reels: Reels[];


  // tslint:disable-next-line: max-line-length
  constructor(
    private componentService: ComponentService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private compareService: CompareService,
    private odataService: OdataService,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.components = data["components"];
    });
    this.galleryOptions = [
      {
        width: "500px",
        height: "500px",
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    this.galleryImages = this.getImages();
  }

  loadComponent() {
    this.componentService
      .getComponent(this.route.snapshot.params["id"])
      .subscribe(
        (components: Components) => {
          this.components = components;
          this.history = this.components.history;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  getOData(){
    this.odataService.GetOData(this.components.buhNr).subscribe(
      (compodata: compOData) => {
        this.compodata = compodata;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.components.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description,
      });
    }

    return imageUrls;
  }

  printf() {
    window.print();
  }

  deleteC(){

    this.alertify.confirm('Are you sure want to delete this photo?', ()=> {
      this.componentService.deleteComponent(this.route.snapshot.params["id"]).subscribe(() => {
        this.alertify.success('Component has been deleted');
        this.router.navigate(['/members']);
      }, error => {
        this.alertify.error('Failed to deltete');
      });
    });
  }

}
