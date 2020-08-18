import { Component, OnInit, Input } from '@angular/core';
import { Reels } from 'src/app/_models/Reels';

@Component({
  selector: 'app-reel-card',
  templateUrl: './reel-card.component.html',
  styleUrls: ['./reel-card.component.css']
})
export class ReelCardComponent implements OnInit {
  @Input() reel: Reels;
  
  constructor() { }

  ngOnInit(){
  }

 
}
