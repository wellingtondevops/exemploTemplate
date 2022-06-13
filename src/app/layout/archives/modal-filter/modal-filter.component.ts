import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { findIndex } from 'rxjs/operators';
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
  faseList = [];
  dropdownSettings = {};
  selectedItemsS = [];
  selectedItemsF = [];

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

    this.faseList = [
      { _id: 1, name: 'CORRENTE', value: 'finalCurrent' },
      { _id: 2, name: 'INTERMEDIÁRIO', value: 'finalIntermediate' },
    ];
   }

  ngOnInit() {
    console.log('COELHINHO DA PASCOA, OQ TRAZES PRA MIM? ', this.form);
    const archive = JSON.parse(this.localStorageSrv.get('archive'));

    this.dateSent = archive.initDate ? archive.initDate : this.dateSent;

    this.searchForm = this.fb.group({
      company: this.fb.control(this.form.company, Validators.required),
      departament: this.fb.control(this.form.departament, [Validators.required]),
      status: this.fb.control([]),
      location: this.fb.control(this.form.location, Validators.required),
      storehouse: this.fb.control(this.form.storehouse, [Validators.required]),
      doct: this.fb.control(this.form.doct, Validators.required),
      search: this.fb.control(this.form.search, Validators.required),
      endDate: this.fb.control({value: null, disabled: !this.dateSent}),
      initDate: this.fb.control(null),
      finalCurrent: this.fb.control(null),
      final: this.fb.control(null),
      finalIntermediate: this.fb.control(null),
      fases: this.fb.control(null)
    });

    

    if (archive && archive.company) {
      this.selectedItemsF = archive.fases;
      this.selectedItemsS = archive.status;

      const statusArquivo = this.selectedItemsS.findIndex(element => element == 'ATIVO');

      if (statusArquivo >= 0) {
        this.selectedItemsS[statusArquivo] = 'ARQUIVO'; 
        console.log(this.selectedItemsS);
      }

      this.searchForm.patchValue({
        status: archive.status,
        endDate: archive.endDate,
        initDate: archive.initDate,
        final: archive.final,
        finalCurrent: archive.finalCurrent,
        finalIntermediate: archive.finalIntermediate,
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
            fases: null,
            final: null,
            finalIntermediate: null,
            finalCurrent: null
        });
        this.localStorageSrv.save('archive', this.searchForm.value);
        this.changeDate();

        this.selectedItemsF = [];
        this.selectedItemsS = [];
        console.log('ARQUIVITOS: ', JSON.parse(this.localStorageSrv.get('archive')));
    }

  help(){
    console.log('HELP!')
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
  onItemSelectFase(item: any) {
    console.log('onItemSelect', item);
    console.log('onItemSelect? ', this.selectedItemsF);
  }

  onSelectAllStatus(items: any) {
    console.log('onSelectAll', items);
  }

  onSelectAllFase(items: any) {
    console.log('onSelectAll', items);
  }

  submit(){
    const current = this.selectedItemsF.findIndex(element => element.value === 'finalCurrent');
    const intermediate = this.selectedItemsF.findIndex(element => element.value === 'finalIntermediate');

    const statusArquivo = this.selectedItemsS.findIndex(element => element == 'ARQUIVO');

    if (statusArquivo >= 0) {
      this.selectedItemsS[statusArquivo] = 'ATIVO'; 
      console.log(this.selectedItemsS);
    }

    const teste = this.searchForm.patchValue({
      status: this.selectedItemsS,
      finalCurrent: current >= 0 ? true : false,
      finalIntermediate: intermediate >= 0 ? true : false,
      fases: this.selectedItemsF
    })

    this.localStorageSrv.save('archive', this.searchForm.value);
    console.log('PESQUISE: ', JSON.parse(this.localStorageSrv.get('archive')));

    this.activeModal.close('Pesquisar');
  }
}
