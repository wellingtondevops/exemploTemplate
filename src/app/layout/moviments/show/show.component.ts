import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Company } from 'src/app/models/company';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { Moviment } from '../../../models/moviment';
import _ from 'lodash';
import { MovimentsService } from 'src/app/services/moviments/moviments.service';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

const MODALS = {
  focusFirst: NgbdModalConfirmComponent
};
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  animations: [routerTransition()]
})
export class ShowComponent implements OnInit {
  companies: any = [];
  movimentForm: FormGroup;
  company: Company;
  id: String;
  moviment: Moviment;
  changeUp = false;
  hiddenReference: Boolean = true;
  public loading: Boolean = false;
  permissionEdit = false;
  permissionDelete = false;
  // isUsers = false;

  constructor(
    private route: ActivatedRoute,
    private storeHousesSrv: StorehousesService,
    private departamentsSrv: DepartamentsService,
    private movimentsSrv: MovimentsService,
    private companiesSrv: CompaniesService,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    private _route: Router
  ) {
    this.movimentForm = this.fb.group({
      _id: this.fb.control(''),
      company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      requester: this.fb.control({ value: '', disabled: true }),
      author: this.fb.control({ value: '', disabled: true }),
      demandDate: this.fb.control({ value: '' }),
      itens: this.fb.control({ value: '' }),
      processed: this.fb.control({ value: false }),
      title: this.fb.control({ value: '' }),
      demand: this.fb.control({ value: false }),
      normal: this.fb.control({ value: false, disabled: true }),
      emergency: this.fb.control({ value: false }),
      moveVolume: this.fb.control({ value: false, disabled: true }),
      moveArchive: this.fb.control({ value: false }),
      digital: this.fb.control({ value: false }),
      delivery: this.fb.control({ value: false, disabled: true }),
      withdraw: this.fb.control({ value: false }),
      low: this.fb.control({ value: false }),
      loan: this.fb.control({ value: false, disabled: true }),
      nr: this.fb.control({ value: '' })
    });
  }

  ngOnInit() {
    this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
    this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
    this.getCompanies();
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.getMoviment();
  }
  get companyIpt() {
    return this.movimentForm.get('company');
  }

  getMoviment() {
    this.loading = true;
    this.movimentsSrv.moviment(this.id).subscribe(
      data => {
        this.loading = false;
        this.moviment = data;
        this.movimentForm.patchValue({
          _id: this.moviment._id,
          company: this.moviment.company,
          requester: this.moviment.requester.name,
          author: this.moviment.author,
          demandDate: this.moviment.demandDate,
          itens: this.moviment.itens,
          processed: this.moviment.processed,
          title: this.moviment.title,
          demand: this.moviment.demand,
          normal: this.moviment.normal ? 'Normal' : '',
          emergency: this.moviment.emergency,
          moveVolume: this.moviment.moveVolume ? 'Caixas' : '',
          moveArchive: this.moviment.moveArchive ? 'Arquivos' : '',
          digital: this.moviment.digital,
          delivery: this.moviment.delivery ? 'Entrega' : '',
          withdraw: this.moviment.withdraw,
          low: this.moviment.low,
          loan: this.moviment.loan ? 'Empréstimo' : '',
          nr: this.moviment.nr
        });
      }, error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    )
  }

  getCompanies() {
    this.companiesSrv.companies(null).subscribe(
      data => {
        this.companies = data.items;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

  formatter = (x: { name: string }) => x.name;

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        let res;
        if (company.length < 2) {
          [];
        } else {
          res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
        }
        return res;
      })
    )

  delete(moviment) {
    this.movimentsSrv.deleteMoviment(moviment).subscribe(
      response => {
        this.successMsgSrv.successMessages('Movimento deletado com sucesso.');
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }

  editMoviment(moviment) {
    this._route.navigate(['/moviments/edit', moviment]);
  }

  open(name: string, storeHouse) {
    const modalRef = this.modalService.open(MODALS[name]);
    modalRef.componentInstance.item = storeHouse;
    modalRef.componentInstance.data = {
      msgConfirmDelete: 'Movimento foi deletado com sucesso.',
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o Movimento?',
      msgQuestionDeleteTwo: 'Todas as informações associadas ao movimento serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe(item => {
      this.delete(item);
    });
  }

}
