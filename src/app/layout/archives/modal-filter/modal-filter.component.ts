import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      status: this.fb.control(''),
      endDate: this.fb.control(null),
      initDate: this.fb.control(null),
      finalCurrent: this.fb.control(null),
      final: this.fb.control(null),
      finalIntermediate: this.fb.control(null),
  });
  }

  close(){
    this.activeModal.close('Sair');
  }

  help(){}

  getArchive(){}
}
