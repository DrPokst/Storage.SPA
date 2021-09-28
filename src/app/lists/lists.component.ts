import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  currentLocation: any = null;
  eventsSubject: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() {
  }

  submit(event: any){
    this.currentLocation = event.target.value;
    this.eventsSubject.next();
  }


}
