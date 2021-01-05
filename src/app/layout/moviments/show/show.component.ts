import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  ) { }

  ngOnInit() {
    this.getCompanies();
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.getMoviment();
  }

  getMoviment(){
    this.loading = true;
    this.movimentsSrv.moviment(this.id).subscribe(
      data => {
        this.loading = false;
        this.moviment = data;
      }, error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ',error);
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

}
