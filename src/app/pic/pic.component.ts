import { Component, OnInit, Input } from '@angular/core';
import { Pic } from './pic.model';

@Component({
  selector: 'app-pic',
  templateUrl: './pic.component.html',
  styleUrls: ['./pic.component.scss']
})
export class PicComponent implements OnInit {

  @Input() picture: Pic;

  constructor() { }

  ngOnInit() {
    console.log(this.picture);
  }

}
