import { Component, Input, OnInit } from '@angular/core';
import { Data } from 'src/app/_models/octopart/octopart';

@Component({
  selector: 'app-tech-octopart',
  templateUrl: './tech-octopart.component.html',
  styleUrls: ['./tech-octopart.component.css']
})
export class TechOctopartComponent implements OnInit {
  @Input() info: Data;

  constructor() { }

  ngOnInit(): void {
  }

}
