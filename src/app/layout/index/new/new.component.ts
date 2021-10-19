import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/models/page';
import { routerTransition } from 'src/app/router.animations';
import { BatchesService } from 'src/app/services/batches/batches.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { Document } from 'src/app/models/document';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SaveLocal } from '../../../storage/saveLocal';
import _ from 'lodash';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { merge, Observable, Subject } from 'rxjs';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { NgbTabset, NgbTypeahead, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { WarningMessagesService } from 'src/app/utils/warning-messages/warning-messages.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { Volume, VolumeList } from 'src/app/models/volume';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
    animations: [routerTransition()],
    providers: [
        NgbTabset
    ]
})
export class NewComponent implements OnInit {
    @ViewChild('tabs') private tabs:NgbTabset;
    @ViewChild('instanceDocument') instanceDocument: NgbTypeahead;
    @ViewChild('instanceDepartament') instanceDepartament: NgbTypeahead;


    companies: any;
    public loading: Boolean = false;
    id: string;
    page = new Page();
    batch: any;
    image: any;
    document: Document;
    checkboxForm: FormArray;
    items: FormArray;
    batchImages: any;
    valuesStorage: any;
    searchForm: FormGroup;
    departaments: any;
    storehouses: any;
    closeModal: string;
    documents: any;
    focusDocument$ = new Subject<string>();
    clickDocument$ = new Subject<string>();
    focusDepartament$ = new Subject<string>();
    clickDepartament$ = new Subject<string>();
    indexs: any = [];
    volumes: Volume[];
    columns = [
        { name: 'Documento', prop: 'doct.name' },
        { name: 'Departamento', prop: 'departament.name' },
        { name: 'Depósito', prop: 'storehouse.name' },
        { name: 'Posição', prop: 'location', width: 70 },
        { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }
    ];
    urlFile: any = '';
    isPdf = false;

    constructor(
        private route: ActivatedRoute,
        private batchesSrv: BatchesService,
        private documentSrv: DocumentsService,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private storehousesSrv: StorehousesService,
        private departamentsSrv: DepartamentsService,
        private companiesSrv: CompaniesService,
        private documentsSrv: DocumentsService,
        private localStorageSrv: SaveLocal,
        private utilCase: CaseInsensitive,
        private warningMsg: WarningMessagesService,
        private pipes: Pipes,
        private _route: Router,
        config: NgbModalConfig,
        private modalService: NgbModal

        ) {
            config.backdrop = 'static';
            config.keyboard = false;

        }


    ngOnInit() {
        this.searchForm = this.fb.group({
            company: this.fb.control({ value: null, disabled: true }),
            doct: this.fb.control({ value: null, disabled: true }),
            departament: this.fb.control(null),
            storehouse: this.fb.control(null),
            location: this.fb.control(''),
        });
        this.id = this.route.snapshot.paramMap.get('id');
        this.getBatch();
        this.getCompanies();

        const index = JSON.parse(this.localStorageSrv.get('index'));
        this.setDataIndexForm(index);

    }

    setDataIndexForm(index) {
        if (index) {
            this.searchForm.patchValue({
                storehouse: index.storehouse,
                departament: index.departament,
                location: index.location,
                doct: index.doct
            });
            // this.selectedCompany(archive.company._id);
        }
    }

    formatter = (x: { name: string }) => x.name;

    get company() {
        return this.searchForm.get('company');
    }

    ngOnDestroy() {
        this.localStorageSrv.clear(this.id);
    }

    getBatchImages(pageInfo = null, size = 24) {
        this.loading = true;
        if (pageInfo) {
            this.page.pageNumber = pageInfo;
        }

        this.batchesSrv.batchImages(this.id, this.page, size).subscribe(data => {
            this.loading = false;
            this.batchImages = data.items;
            this.page.totalElements = data._links.foundItems;
            this.page.size = data._links.totalPage;
        }, error => {
            this.loading = false;
            this.errorMsg.errorMessages(error)
        });
    }

    getBatch() {
        this.page.pageNumber = 1
        this.batchesSrv.batch(this.id).subscribe(data => {
            this.batch = data
            this.searchForm.patchValue({ company: data.company, doct: data.doct });
            this.getDocument()
            this.getDocuments(data.company._id)
            this.getDepartaments(data.company._id)
            this.getStoreHouses();

        }, error => {
            console.log('ERROR: ', error);
        });
        this.batchesSrv.imagens(this.id, this.page, 1).subscribe(data => {
            this.image = data.items[0];
            if (data.items.length >= 1) {
                this.urlFile = data.items[0].url;
                this.urlFile.indexOf('.pdf') !== -1 ? this.isPdf = true : '';
                this.getBatchImages();
            }
            else
            {
                this.getBatchImages();
                    setTimeout(function(){$('#open')[0].click()}, 700);


            }
        }, error => {
            console.log('ERROR: ', error);
        });
    }

    getDocument() {
        this.documentSrv.document(this.batch.doct._id).subscribe(data => {
            this.document = data;
            this.valuesStorage = JSON.parse(this.localStorageSrv.get(this.batch._id));
            if (this.document.label) {
                var items = []
                this.document.label.map((item, key) => {
                    items.push(new FormControl())
                })

                if (this.valuesStorage) {
                    items = []
                    this.valuesStorage.map((item, i) => {
                        items.push(new FormControl(item))
                    })
                }
                this.checkboxForm = new FormArray(items)
            }
        }, error => {
            console.log('ERROR: ', error)
        })
    }

    createItem(): FormGroup {
        return this.fb.group({
            checkbox: '',
        });
    }

    addItem(): void {
        this.items = this.checkboxForm.get('items') as FormArray;
        this.items.push(this.createItem());
    }

    createDocument(data) {
        this.loading = true;

        const valueCheckBox = _.values(this.checkboxForm.value)
        const tag = _.values(data);
        let memoryInput = [];
        valueCheckBox.map((item, i) => {
            if (item) {
                memoryInput.push(tag[i]);
            } else {
                memoryInput.push('')
            }
        })

        this.localStorageSrv.save(this.id, memoryInput);

        this.batchesSrv.batchIndex(this.id, { picture: this.image._id, tag: tag }).subscribe(data => {
            this.successMsgSrv.successMessages('Imagem indexada com sucesso.');
            this.getBatch()
            this.loading = false;
        }, error => {
            this.loading = false;
            this.errorMsg.errorMessages(error);
            console.log('ERROR: ', error);
        });
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

    selectedCompany(e) {
        if (e && e.item && e.item._id) {
            this.getDepartaments(e.item._id);
        } else {
            this.getDepartaments(e);
        }
    }

    searchCompany = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(company => {
                let res = [];
                if (company.length < 2) { []; } else { res = _.filter(this.companies, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10); }
                return res;
            })
        )

    getDepartaments(company_id) {
        this.departamentsSrv.searchDepartaments(company_id).subscribe(
            data => {
                this.departaments = data.items;
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
                this.loading = false;
            }
        );
    }

    searchDepartament = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickDepartament$.pipe(filter(() => !this.instanceDepartament.isPopupOpen()));
        const inputFocus$ = this.focusDepartament$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(departament => (departament === '' ? this.departaments
                : _.filter(this.departaments, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(departament.toLowerCase())) > -1).slice(0, 10)
            )));
    }

    getStoreHouses() {
        this.storehousesSrv.searchStorehouses().subscribe(
            data => {
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
                let res;
                if (storehouse.length < 2) { []; } else { res = _.filter(this.storehouses, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(storehouse.toLowerCase())) > -1).slice(0, 10); }
                return res;
            })
        )

    getDocuments(company_id) {
        this.documentsSrv.searchDocuments(company_id).subscribe(
            data => {
                this.documents = data.items;
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
                this.loading = false;
            }
        );
    }

    searchDocument = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickDocument$.pipe(filter(() => !this.instanceDocument.isPopupOpen()));
        const inputFocus$ = this.focusDocument$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(document => (document === '' ? this.documents
                : _.filter(this.documents, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(document.toLowerCase())) > -1).slice(0, 10)
            )));
    }

    setPage(pageInfo) {
        this.loading = true;
        if (pageInfo && pageInfo.offset) {
            this.page.pageNumber = pageInfo.offset;
        } else {
            pageInfo = { offset: 0 },
                this.page.pageNumber = pageInfo.offset;
        }

        this.localStorageSrv.save('index', this.searchForm.value);

        const newSearch = {
            storehouse: null,
            departament: null,
            location: null,
        };

        this.searchForm.value.storehouse ? newSearch.storehouse = this.returnId('storehouse') : null;
        this.searchForm.value.departament ? newSearch.departament = this.returnId('departament') : null;
        newSearch.location = this.searchForm.value.location;

        const searchValue = _.omitBy(newSearch, _.isNil);

        this.batchesSrv.volumes(this.batch._id, this.page, searchValue).subscribe(data => {
            if (data.items.length > 0) {
                this.volumes = data.items;
                this.page.pageNumber = data._links.currentPage - 1;
                this.page.totalElements = data._links.foundItems;
                this.page.size = data._links.totalPage;
            }

            this.loading = false;
            console.log('asdsdadsasda',this.page.totalElements);
        }, error => {
            console.log('ERROR: ', error);
            this.loading = false;
            this.errorMsg.errorMessages(error);
        });
    }

    returnId(object) {
        const result = _.filter(this.searchForm.value[object], function (value, key) {
            if (key === '_id') { return value; }
        })[0];
        return result;
    }

    getVolume(item) {
        this.batchesSrv.addVolume(this.id, item._id).subscribe(data => {
            this.getBatch();
            this.tabs.select('dados');
            // this._route.navigate(['/index', this.id]);
        }, error => {
            console.log('ERROR: ', error);
            this.loading = false;
            this.errorMsg.errorMessages(error);
        });
    }

    open(content) {
        this.modalService.open(content);
    }

    doTheBack = function() {
            window.history.back();
    };

}

