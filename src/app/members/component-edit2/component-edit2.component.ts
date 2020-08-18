import { Component, OnInit, Input } from '@angular/core';
import { Components } from 'src/app/_models/components';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ComponentService } from 'src/app/_services/component.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../node_modules/@service-work/is-loading';
import { filter } from 'rxjs/operators';
import { Reels } from 'src/app/_models/Reels';
import { CompareService } from 'src/app/_services/compare.service';

@Component({
  selector: 'app-component-edit2',
  templateUrl: './component-edit2.component.html',
  styleUrls: ['./component-edit2.component.css']
})
export class ComponentEdit2Component implements OnInit {
  @Input() components: Components;
  editForm: NgForm;
  reels: Observable<Reels[]>;

  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = false;
    }
  }

  constructor(private route: ActivatedRoute, private router: Router, private alertify: AlertifyService, 
    private componentsService: ComponentService, private comareService: CompareService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.components = data['components'];
    });


  }
  updateComponents() {
    this.componentsService.updateComponent(this.components.id, this.components).subscribe(next => {
      this.alertify.success('Pakeista sekmingai');
      this.editForm.reset(this.components);
    }, error => {
      this.alertify.error(error);
    });

  }
}
