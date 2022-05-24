import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {

  @Input() public dep;
  
  constructor() { }

  ngOnInit() {
    console.log("PRIMEIRO TESTE: ", this.dep);
  }

}
