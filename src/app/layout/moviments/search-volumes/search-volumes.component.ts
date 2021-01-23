import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CompaniesList } from 'src/app/models/company';
import { DepartamentList } from 'src/app/models/departament';
import { MovimentsService } from 'src/app/services/moviments/moviments.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { WarningMessagesService } from 'src/app/utils/warning-messages/warning-messages.service';
import _ from 'lodash';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-search-volumes',
  templateUrl: './search-volumes.component.html',
  styleUrls: ['./search-volumes.component.scss'],
  animations: [routerTransition()]
})
export class SearchVolumesComponent implements OnInit {
  searchForm: FormGroup;
  id: String;
  companies: CompaniesList;
  departaments: DepartamentList;
  loading: Boolean = false;

  constructor(
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private route: ActivatedRoute,
    private movimentsSrc: MovimentsService,
    private fb: FormBuilder,
    private warningMsg: WarningMessagesService,
    private utilCase: CaseInsensitive
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      company: this.fb.control({ value: null, disabled: true }),
      departament: this.fb.control(null),
      location: this.fb.control(false),
      storehouse: this.fb.control(false),
      doct: this.fb.control(null),
      search: this.fb.control(null),
      initDate: this.fb.control(null),
      endDate: this.fb.control(null)
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.getCompany();
    this.getDepartaments();
  }

  get companyIpt() {
    return this.searchForm.get('company');
  }

  formatter = (x: { name: string }) => x.name;

  getCompany() {
    this.movimentsSrc.company(this.id).subscribe(data => {
      this.companies = data.items;
      this.searchForm.patchValue({
        company: data.items[0]
      })
    }, error => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
      this.loading = false;
    })
  }

  getDepartaments() {
    this.movimentsSrc.departaments(this.id).subscribe(data => {
      this.departaments = data.items;
    }, error => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
      this.loading = false;
    })
  }

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

  searchDepartament = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(departament => {
        if (this.searchForm.value.company === '' || this.searchForm.value.company._id === 'undefined') {
          this.warningMsg.showWarning('Selecione uma empresa.', 4000);
          return;
        }
        let res;
        if (departament.length < 2) { []; } else { res = _.filter(this.departaments, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(departament.toLowerCase())) > -1).slice(0, 10); }
        return res;
      })
    )
}
