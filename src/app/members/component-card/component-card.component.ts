import { Component, OnInit, Input } from '@angular/core';
import { Components } from 'src/app/_models/components';

@Component({
  selector: 'app-component-card',
  templateUrl: './component-card.component.html',
  styleUrls: ['./component-card.component.css']
})
export class ComponentCardComponent implements OnInit {
  @Input() components: Components;
  constructor() { }

  ngOnInit() {
  }

}
