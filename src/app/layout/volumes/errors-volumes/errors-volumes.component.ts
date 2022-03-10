import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Page } from 'src/app/models/page';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { environment } from '../../../../environments/environment';
import { SaveLocal } from 'src/app/storage/saveLocal';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
const url = environment.apiUrl;

@Component({
    selector: 'app-errors-volumes',
    templateUrl: './errors-volumes.component.html',
    styleUrls: ['./errors-volumes.component.scss'],
    animations: [routerTransition()]
})
export class ErrorsVolumesComponent implements OnInit {
    @ViewChild('myTable',) table: any;
    searchForm: FormGroup;
    page = new Page();
    loading: Boolean = false;
    errorsVolumes: any[];
    dateSent;
    dateReceived;

    constructor(
        private _route: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private volumeSrv: VolumesService,
        private errorMsg: ErrorMessagesService,
        private localStorageSrv: SaveLocal,
        private introService: IntroJsService,
    ) { }

    ngOnInit() {
        this.searchForm = this.fb.group({
            sheet: this.fb.control(null, Validators.required),
            endDate: this.fb.control(''),
            initDate: this.fb.control(''),
        });
        const volumeSearch = JSON.parse(this.localStorageSrv.get('volumeSearchError'));
        if (volumeSearch && volumeSearch.sheet) {
            this.searchForm.patchValue({
                sheet: volumeSearch.sheet,
                initDate: volumeSearch.initDate,
                endDate: volumeSearch.endDate
            });
        }
        this.getErrors();
        this.searchForm.patchValue({ endDate: null });
    }

    get sheet() {
        return this.searchForm.get('sheet');
    }

    getErrors() {
        this.setPage({ offset: 0 });
    }

    setPage(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;
        this.localStorageSrv.save('volumeSearchError', this.searchForm.value);


        this.volumeSrv.searchSheetErrorsVolumes(this.searchForm.value, this.page).subscribe(
            data => {
                this.errorsVolumes = data.items;
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
        window.location.href = `${url}/sheetvolumes/excel/${id}`;
    }

    clear() {
        this.localStorageSrv.clear('volumeSearchError');
        this.searchForm.patchValue({
            sheet: null,
            endDate: null,
            initDate: null
        });
    }

    changeDate() {
        this.dateSent =
            new Date(this.dateSent).toISOString().slice(0, 10);

        console.log(this.dateSent);
        this.dateReceived = this.dateSent;
    }

    help() {
        this.introService.volumeErrors();
    }
}
