import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
  animations: [routerTransition()]
})
export class ModalContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
