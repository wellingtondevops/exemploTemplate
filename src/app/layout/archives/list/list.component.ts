import { Component, OnInit, ViewChild, ɵConsole, Pipe, PipeTransform } from '@angular/core';
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
import { WarningMessagesService } from 'src/app/utils/warning-messages/warning-messages.service';

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
    private documentsSrv: DocumentsService,
    private warningMsg: WarningMessagesService
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
      search: this.fb.control(''),
      endDate: this.fb.control(''),
      initDate: this.fb.control('')
    });

    this.statusList = StatusVolumeEnum;
    console.log(this.statusList);
    this.getCompanies();
    // this.getDepartaments();
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
    var searchValue = _.omitBy(this.searchForm.value, _.isNil);
    this.archiveSrv.archives(this.page, null, searchValue).subscribe(data => {
      console.log('setPage', data);
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
        var res = [];
        if (company.length < 2) [];
        else res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
        if(res.length > 0) {
          this.getDepartaments(res[0]._id);
        }
        return res;
      })
    );

    getDepartaments(company_id) {
      this.departamentsSrv.searchDepartaments(company_id).subscribe(
        data => {
          // console.log('departament', data);
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
        console.log(departament);
        if(this.searchForm.value.company === '' || this.searchForm.value.company._id === 'undefined'){
          this.warningMsg.showWarning('Selecione uma empresa.', 4000);
          return
        };
        var res;
        if (departament.length < 2) [];
        else res = _.filter(this.departaments, v => v.name.toLowerCase().indexOf(departament.toLowerCase()) > -1).slice(0, 10);
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
        else res = _.filter(this.storehouses, v => v.name.toLowerCase().indexOf(storehouse.toLowerCase()) > -1).slice(0, 10);
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
        else res = _.filter(this.documents, v => v.name.toLowerCase().indexOf(document.toLowerCase()) > -1).slice(0, 10);
        return res;
      })
    );
}
<<<<<<< HEAD

=======
>>>>>>> f03f86d892d89efcda8849810c399ea416a722cb
@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
      const keys = Object.keys(data);
      return keys.slice(keys.length / 2);
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> f03f86d892d89efcda8849810c399ea416a722cb
