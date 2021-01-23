import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CompaniesList, Company } from 'src/app/models/company';
import { routerTransition } from 'src/app/router.animations';
import { MovimentsService } from 'src/app/services/moviments/moviments.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import _ from 'lodash';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { DepartamentList } from 'src/app/models/departament';
import { WarningMessagesService } from 'src/app/utils/warning-messages/warning-messages.service';
import { DocumentList } from 'src/app/models/document';
import { StorehousesList } from 'src/app/models/storehouse';
import { ArchivesList } from 'src/app/models/archive';
import { Page } from 'src/app/models/page';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { SaveLocal } from 'src/app/storage/saveLocal';
import { SelectionType } from 'src/app/models/selection.types'
import { ColumnMode } from 'src/app/models/column-mode.types'

@Component({
  selector: 'app-search-archives',
  templateUrl: './search-archives.component.html',
  styleUrls: ['./search-archives.component.scss'],
  animations: [routerTransition()]
})
export class SearchArchivesComponent implements OnInit {
  searchForm: FormGroup;
  id: String;
  companies: CompaniesList;
  departaments: DepartamentList;
  loading: Boolean = false;
  documents: DocumentList;
  storehouses: StorehousesList;
  archives: ArchivesList = {
    _links: {
      currentPage: 0,
      foundItems: 0,
      next: '',
      self: '',
      totalPage: 0
    },
    items: []
  };
  selected: any = []
  page = new Page();

  constructor(
    private localStorageSrv: SaveLocal,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private route: ActivatedRoute,
    private movimentsSrc: MovimentsService,
    private fb: FormBuilder,
    private warningMsg: WarningMessagesService,
    private utilCase: CaseInsensitive,
    private pipes: Pipes
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      company: this.fb.control({ value: null, disabled: true }),
      departament: this.fb.control(null),
      location: this.fb.control(null),
      storehouse: this.fb.control(null),
      doct: this.fb.control(null),
      search: this.fb.control(null),
      initDate: this.fb.control(null),
      endDate: this.fb.control(null)
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.getCompany();
    this.getDepartaments();
    this.getStorehouse();
    this.getDocuments();
  }

  get companyIpt() {
    return this.searchForm.get('company');
  }

  formatter = (x: { name: string }) => x.name;

  clear() {
    this.localStorageSrv.clear('search-archive');
    this.searchForm.patchValue({
      departament: null,
      location: null,
      storehouse: null,
      doct: null,
      initDate: null,
      endDate: null,
      search: null
    });
  }

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
        let res;
        if (departament.length < 2) { []; } else { res = _.filter(this.departaments, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(departament.toLowerCase())) > -1).slice(0, 10); }
        return res;
      })
    )

  getDocuments() {
    this.movimentsSrc.documents(this.id).subscribe(data => {
      this.documents = data.items;
    }, error => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
      this.loading = false;
    })
  }

  searchDoct = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(doct => {
        let res;
        if (doct.length < 2) { []; } else { res = _.filter(this.documents, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(doct.toLowerCase())) > -1).slice(0, 10); }
        return res;
      })
    )

  getStorehouse() {
    this.movimentsSrc.storehouses(this.id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(`ERROR: ${error}`);
    })
  }

  searchStorehouse = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(storehouse => {
        let res;
        if (storehouse.length < 2) { []; } else { res = _.filter(this.storehouses, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(storehouse.toLowerCase())) > -1).slice(0, 10); }
        return res;
      })
    )

  returnId(object) {
    const result = _.filter(this.searchForm.value[object], function (value, key) {
      if (key === '_id') { return value; }
    })[0];
    return result;
  }

  getSearchArchives() {
    this.setPageArchives({ offset: 0 });
  }

  setPageArchives(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;
    const newSearch = {
      departament: null,
      location: null,
      storehouse: null,
      doct: null,
      initDate: null,
      endDate: null,
      search: null
    };
    this.localStorageSrv.save('search-archive', this.searchForm.value);
    this.searchForm.value.departament ? newSearch.departament = this.returnId('departament') : null;
    this.searchForm.value.location ? newSearch.location = this.searchForm.value.name : null;
    this.searchForm.value.storehouse ? newSearch.storehouse = this.returnId('departament') : null;
    this.searchForm.value.doct ? newSearch.doct = this.returnId('departament') : null;
    this.searchForm.value.initDate ? newSearch.initDate = this.searchForm.value.initDate : null;
    this.searchForm.value.endDate ? newSearch.endDate = this.searchForm.value.endDate : null;
    this.searchForm.value.search ? newSearch.search = this.searchForm.value.search : null;

    const searchValue = _.omitBy(newSearch, _.isNil);

    this.movimentsSrc.searchArchives(searchValue, this.id, this.page).subscribe(data => {
      this.loading = false;
      this.archives = data;
      this.page.pageNumber = data._links.currentPage;
      this.page.totalElements = data._links.foundItems;
      this.page.size = data._links.totalPage;
    }, error => {
      this.errorMsg.errorMessages(error);
      this.loading = false;
      console.log(`ERROR: ${error}`)
    })
  }

  onSelect({ selected }) {
    let disabledList = []

    selected.forEach((item, index) => {
      if (item.indDemand) {
        disabledList.push(index)
      }
    })

    disabledList.reverse().forEach(item => {
      selected.splice(item, 1)
    })

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log(this.selected)
  }
}
