import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public minDate: Date = new Date ("01/01/2020");
    public maxDate: Date = new Date ("08/27/2020");
    public value: Date = new Date ("04/15/2020");
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
