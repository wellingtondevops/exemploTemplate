import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { routerTransition } from '../../../router.animations';
import { Archive } from 'src/app/models/archive';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Page } from 'src/app/models/page';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import _ from 'lodash';
import { StatusVolumeEnum } from 'src/app/models/status.volume.enum';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  @ViewChild('myTable') table: any;
  archives: Archive[];
  archivesCol: any[];
  page = new Page();
  loading: boolean = false;
  searchForm: FormGroup;
  companies: any = [];
  company_id: string;
  statusList: any = [];
  departaments: any = [];
  storehouses: any = [];
  documents: any = [];

  constructor(
    private archiveSrv: ArquivesService,
    private errorMsg: ErrorMessagesService,
    private _route: Router,
    private fb: FormBuilder,
    private companiesSrv: CompaniesService,
    private departamentsSrv: DepartamentsService,
    private storehousesSrv: StorehousesService,
    private documentsSrv: DocumentsService
  ) { }

  ngOnInit() {
    // this.setPage({ offset: 0 });
    this.searchForm = this.fb.group({
      company: this.fb.control('', Validators.required),
      departament: this.fb.control(''),
      status: this.fb.control(''),
      location: this.fb.control(''),
      storehouse: this.fb.control(''),
      doct: this.fb.control(''),
      search: this.fb.control('')
    });

    this.statusList = StatusVolumeEnum;
    console.log(this.statusList);
    this.getCompanies();
    this.getDepartaments();
    this.getStoreHouses();
    this.getDocuments();
  }

  formatter = (x: { name: string }) => x.name;
  
  get company() {
    return this.searchForm.get('company');
  }

/*   get departament() {
    return this.searchForm.get('departament');
  }

  get storehouse() {
    return this.searchForm.get('storehouse');
  } */

  setPage(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;

    this.archiveSrv.archives(this.page, null, this.searchForm.value.search).subscribe(data => {
      this.page.pageNumber = data._links.currentPage - 1;
      this.page.totalElements = data._links.foundItems;
      this.archives = data.items;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log('ERROR: ', error);
    });
  }

  toggleExpandRow(row) {
    // console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    // console.log('Detail Toggled', event);
  }

  showView(value) {
    if (value.type === 'click') {
      this._route.navigate(['/archives/get', value.row._id]);
    } else if (value.type === 'mouseenter') {
      this.toggleExpandRow(value.row)
    }
  }

  guardType(value) {
    let res = '';
    switch (value) {
      case 'GERENCIADA':
        res = 'G';
        break;
    }
    return res;
  }

  getArchive() {
    this.setPage({ offset: 0 })
  }

  getCompanies() {
    this.companiesSrv.searchCompanies().subscribe(
      data => {
        this.companies = data.items;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
        this.loading = false;
      }
    );
  }

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        var res;
        if (company.length < 2) [];
        else var res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
        return res;
      })
    );

    getDepartaments() {
      this.departamentsSrv.searchDepartaments().subscribe(
        data => {
          console.log(data);
          this.departaments = data.items;
        },
        error => {
          this.errorMsg.errorMessages(error);
          console.log('ERROR: ', error);
          this.loading = false;
        }
      );
    }

    searchDepartament = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(departament => {
        var res;
        if (departament.length < 2) [];
        else var res = _.filter(this.departaments, v => v.name.toLowerCase().indexOf(departament.toLowerCase()) > -1).slice(0, 10);
        return res;
      })
    );

    getStoreHouses() {
      this.storehousesSrv.searchStorehouses().subscribe(
        data => {
          console.log(data);
          this.storehouses = data.items;
        },
        error => {
          this.errorMsg.errorMessages(error);
          console.log('ERROR: ', error);
          this.loading = false;
        }
      );
    }

    searchStorehouse = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(storehouse => {
        var res;
        if (storehouse.length < 2) [];
        else var res = _.filter(this.storehouses, v => v.name.toLowerCase().indexOf(storehouse.toLowerCase()) > -1).slice(0, 10);
        return res;
      })
    );

    getDocuments() {
      this.documentsSrv.searchDocuments().subscribe(
        data => {
          console.log(data);
          this.documents = data.items;
        },
        error => {
          this.errorMsg.errorMessages(error);
          console.log('ERROR: ', error);
          this.loading = false;
        }
      );
    }

    searchDocument = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(document => {
        var res;
        if (document.length < 2) [];
        else var res = _.filter(this.documents, v => v.name.toLowerCase().indexOf(document.toLowerCase()) > -1).slice(0, 10);
        return res;
      })
    );
}
