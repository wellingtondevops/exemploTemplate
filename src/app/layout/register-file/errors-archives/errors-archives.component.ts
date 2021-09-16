import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Page } from 'src/app/models/page';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { environment } from '../../../../environments/environment';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { SaveLocal } from 'src/app/storage/saveLocal';
const url = environment.apiUrl;

@Component({
  selector: 'app-errors-archives',
  templateUrl: './errors-archives.component.html',
  styleUrls: ['./errors-archives.component.scss'],
  animations: [routerTransition()]
})
export class ErrorsArchivesComponent implements OnInit {
  @ViewChild('myTable', { static: true }) table: any;
  searchForm: FormGroup;
  page = new Page();
  loading: Boolean = false;
  errorsArchives: any[];

  constructor(
    private _route: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private archivesSrv: ArquivesService,
    private errorMsg: ErrorMessagesService,
    private localStorageSrv: SaveLocal
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      sheet: this.fb.control('', Validators.required),
      endDate: this.fb.control(''),
      initDate: this.fb.control(''),
    });
    const archiveSearch = JSON.parse(this.localStorageSrv.get('archiveSearchError'));
    if(archiveSearch && archiveSearch.sheet){
      this.searchForm.patchValue({
        sheet: archiveSearch.sheet,
        initDate: archiveSearch.initDate,
        endDate: archiveSearch.endDate
      })
    }
  }

  get sheet() {
    return this.searchForm.get('sheet');
  }

  getErrors() {
    this.setPage({ offset: 0 })
  }

  setPage(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;

    this.archivesSrv.searchImportErrors(this.searchForm.value, this.page).subscribe(
      data => {
        this.errorsArchives = data.items;
        this.page.pageNumber = data._links.currentPage;
        this.page.totalElements = data._links.foundItems;
        this.page.size = data._links.totalPage;
        this.loading = false;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
        this.loading = false;
      }
    );
  }

  getFile(id) {
    window.location.href = `${url}/sheetarchives/excel/${id}`
  }

  clear(){
    this.localStorageSrv.clear('archiveSearchError');
    this.searchForm.patchValue({
      sheet: null,
      endDate: null,
      initDate: null
    })
  }

}
