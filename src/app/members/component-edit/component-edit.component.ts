import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Components } from 'src/app/_models/components';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { ComponentService } from 'src/app/_services/component.service';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-component-edit',
  templateUrl: './component-edit.component.html',
  styleUrls: ['./component-edit.component.css']
})

export class ComponentEditComponent implements OnInit {
  @ViewChild('editForm', { static: true })
  editForm: NgForm;
  components: Components;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  
  constructor(private route: ActivatedRoute, private alertify: AlertifyService, 
    private componentsService: ComponentService) { }
  ngOnInit() {
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

