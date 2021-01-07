import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Company } from 'src/app/models/company';
import { Moviment } from 'src/app/models/moviment';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { MovimentsService } from 'src/app/services/moviments/moviments.service';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import _ from 'lodash';
import { RequestersService } from 'src/app/services/requesters/requesters.service';
import { Requester, RequesterSearchList } from 'src/app/models/requester';

const MODALS = {
  focusFirst: NgbdModalConfirmComponent
};
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  animations: [routerTransition()]
})
export class NewComponent implements OnInit {
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
  requesters: any;
  requester: any;
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
    private _route: Router,
    private requesterSrv: RequestersService
  ) {
    this.movimentForm = this.fb.group({
      company: this.fb.control(null, [Validators.required]),
      requester: this.fb.control(null, [Validators.required]),
      deadline: this.fb.control(null, [Validators.required]),
      move: this.fb.control(null, [Validators.required]),
      deliveryFormat: this.fb.control(null, [Validators.required]),
      moveNature: this.fb.control(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.getCompanies();
  }
  
  get companyIpt() {
    return this.movimentForm.get('company');
  }

  get requesterIpt() {
    return this.movimentForm.get('requester');
  }

  get deadlineIpt() {
    return this.movimentForm.get('deadline');
  }

  get deliveryFormatIpt() {
    return this.movimentForm.get('deliveryFormat');
  }

  get moveIpt() {
    return this.movimentForm.get('move');
  }

  get moveNatureIpt() {
    return this.movimentForm.get('moveNature');
  }

  newMoviment() {
    let newMoviment = {
      company: this.movimentForm.value.company._id,
      requester: this.movimentForm.value.requester._id,
      loan: this.movimentForm.value.moveNature === 'loan' ? true : false,
      low: this.movimentForm.value.moveNature === 'low' ? true : false,
      withdraw: this.movimentForm.value.delivery === 'withdraw' ? true : false,
      delivery: this.movimentForm.value.delivery === 'delivery' ? true : false,
      digital: this.movimentForm.value.delivery === 'digital' ? true : false,
      moveArchive: this.movimentForm.value.move === 'moveArchive' ? true : false,
      moveVolume: this.movimentForm.value.move === 'moveVolume' ? true : false,
      emergency: this.movimentForm.value.deadline === 'emergency' ? true : false,
      normal: this.movimentForm.value.deadline === 'normal' ? true : false
    }
    newMoviment = _.omitBy(newMoviment, _.isNil);

    this.movimentsSrv.newMoviment(newMoviment).subscribe(
      data => {
        this.loading = false;
        this.moviment = data;
        this.successMsgSrv.successMessages('Movimentação cadastrado com sucesso.');
        this._route.navigate(['/moviments'])
      }, error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    )
  }

  

  getCompanies() {
    this.companiesSrv.searchCompanies().subscribe(
      data => {
        this.companies = data.items;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

  getRequesters(company) {
    this.requesterSrv.listRequesterByCompany(company).subscribe(
      data => {
        this.requesters = data.items;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

  getCompany(company) {
    console.log(company)
    this.getRequesters(company.item._id);
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

    searchRequester = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(requester => {
        let res;
        if (requester.length < 2) {
          [];
        } else {
          res = _.filter(this.requesters, v => v.name.toLowerCase().indexOf(requester.toLowerCase()) > -1).slice(0, 10);
        }
        return res;
      })
    )

}
