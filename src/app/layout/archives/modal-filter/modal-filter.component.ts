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
  statusList = [];
  faseList = [];
  dropdownSettings = {};

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) {
    this.statusList = [
      { _id: 1, name: 'ARQUIVO', value: 'ARQUIVO' },
      { _id: 2, name: 'BAIXADO', value: 'BAIXADO' },
      { _id: 3, name: 'EMPRESTADO', value: 'EMPRESTADO' },
    ];

    this.faseList = [
      { _id: 1, name: 'CORRENTE', value: 'finalCurrent' },
      { _id: 2, name: 'INTERMEDIÁRIO', value: 'finalIntermediate' },
    ];
   }

  ngOnInit() {
    this.searchForm = this.fb.group({
      status: this.fb.control(''),
      endDate: this.fb.control(null),
      initDate: this.fb.control(null),
      finalCurrent: this.fb.control(null),
      final: this.fb.control(null),
      finalIntermediate: this.fb.control(null),
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'name',
      selectAllText: 'Marcar Todos',
      unSelectAllText: 'Desmarcar Todos',
      // itemsShowLimit: All,
      allowSearchFilter: false
    };
  }

  close(){
    this.activeModal.close('Sair');
  }

  help(){
    console.log('HELP!')
  }

  checkSelection(){}

  getArchive(){}

  onItemSelectStatus(item: any) {
    console.log('onItemSelect', item);
  }
  onItemSelectFase(item: any) {
    console.log('onItemSelect', item);
  }

  onSelectAllStatus(items: any) {
    console.log('onSelectAll', items);
  }

  onSelectAllFase(items: any) {
    console.log('onSelectAll', items);
  }
}
