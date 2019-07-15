import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [routerTransition()]
})
export class EditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
