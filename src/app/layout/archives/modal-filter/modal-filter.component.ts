import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.scss'],
  animations: [routerTransition()]
})
export class ModalFilterComponent implements OnInit {
  @Input() public form;

  loading: Boolean = false;
  searchForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  close(){
    this.activeModal.close('Sair');
  }

  help(){}

  getArchive(){}
}
