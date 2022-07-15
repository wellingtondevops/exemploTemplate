import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from 'src/app/router.animations';
import { SaveLocal } from 'src/app/storage/saveLocal';

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
  dropdownSettings = {};
  selectedItemsS = [];

  dateSent;
  dateReceived;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private localStorageSrv: SaveLocal,
  ) {
    this.statusList = [
        { _id: 1, name: 'ARQUIVO', value: 'ARQUIVO' },
        { _id: 2, name: 'BAIXADO', value: 'BAIXADO' },
        { _id: 3, name: 'EMPRESTADO', value: 'EMPRESTADO' },
      ];
  }

  ngOnInit() {
    const volume = JSON.parse(this.localStorageSrv.get('volume'));

    this.dateSent = volume.initDate ? volume.initDate : this.dateSent;

    this.searchForm = this.fb.group({
      company: this.fb.control(this.form.company, Validators.required),
      departament: this.fb.control(this.form.departament, [Validators.required]),
      status: this.fb.control([]),
      location: this.fb.control(this.form.location, Validators.required),
      storehouse: this.fb.control(this.form.storehouse, [Validators.required]),
      search: this.fb.control(this.form.search, Validators.required),
      endDate: this.fb.control({value: null, disabled: !this.dateSent}),
      initDate: this.fb.control(null),
      reference: this.fb.control(null),
      guardType: this.fb.control(null),
      records: this.fb.control(null),
      closeBox: this.fb.control(null),
    });

    if (volume && volume.company) {
        this.selectedItemsS = volume.status;

        const statusVolume = this.selectedItemsS.findIndex(element => element == 'ATIVO');

        if (statusVolume >= 0) {
          this.selectedItemsS[statusVolume] = 'ARQUIVO';
        }

        this.searchForm.patchValue({
          status: volume.status,
          endDate: volume.endDate,
          initDate: volume.initDate,
        });
      }

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

  clear() {
    this.searchForm.patchValue({
        status: [],
        endDate: null,
        initDate: null,
    });
    this.localStorageSrv.save('volume', this.searchForm.value);
    this.changeDate();

    this.selectedItemsS = [];
}

  changeDate() {
    const initialDate = this.searchForm.get('initDate').value;

    if (initialDate) {
      this.dateSent = new Date(initialDate).toISOString().slice(0, 10);
      this.searchForm.controls['endDate'].enable();
    } else {
      this.searchForm.get('endDate').setValue(null);
      this.searchForm.controls['endDate'].disable();
    }

    this.dateReceived = this.dateSent;
  }

  onItemSelectStatus(item: any) {
    console.log('onItemSelect ', item);
    console.log('onItemSelect? ', this.selectedItemsS);
  }

  onSelectAllStatus(items: any) {
    console.log('onSelectAll', items);
  }

  submit(){
    // var current;
    // var intermediate;
    var statusArquivo;

    // if (this.selectedItemsF) {
    //   current = this.selectedItemsF.findIndex(element => element.name === 'CORRENTE');
    //   intermediate = this.selectedItemsF.findIndex(element => element.name === 'INTERMEDIÁRIO');
    // }

    if (this.selectedItemsS) {
      statusArquivo = this.selectedItemsS.findIndex(element => element == 'ARQUIVO');
    }

    if (statusArquivo >= 0) {
      this.selectedItemsS[statusArquivo] = 'ATIVO';
    }

    this.searchForm.patchValue({
      status: this.selectedItemsS,
      // finalCurrent: current >= 0 ? true : false,
      // finalIntermediate: intermediate >= 0 ? true : false,
    })

    this.localStorageSrv.save('volume', this.searchForm.value);

    this.activeModal.close('Pesquisar');
  }


}
