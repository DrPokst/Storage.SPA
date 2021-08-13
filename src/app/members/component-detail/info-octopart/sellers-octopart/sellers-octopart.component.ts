import { Component, Input, OnInit } from '@angular/core';
import { Data } from 'src/app/_models/octopart/octopart';

@Component({
  selector: 'app-sellers-octopart',
  templateUrl: './sellers-octopart.component.html',
  styleUrls: ['./sellers-octopart.component.css']
})
export class SellersOctopartComponent implements OnInit {
  @Input() info: Data;

  constructor() { }

  ngOnInit(): void {
  }

}
