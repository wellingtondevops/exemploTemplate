import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
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
import { ArchivesList } from 'src/app/models/archive';
import { Page } from 'src/app/models/page';
import { DepartamentList } from 'src/app/models/departament';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { DocumentList } from 'src/app/models/document';
import { VolumeList } from 'src/app/models/volume';
import { WarningMessagesService } from 'src/app/utils/warning-messages/warning-messages.service';
import * as moment from 'moment';

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
    @ViewChild('instanceDepartament') instanceDepartament: NgbTypeahead;
    @ViewChild('instanceDocument',) instanceDocument: NgbTypeahead;
    @ViewChild('instanceStorehouse',) instanceStorehouse: NgbTypeahead;
    companies: any = [];
    movimentForm: FormGroup;
    serviceForm: FormGroup;
    processForm: FormGroup;
    archiveForm: FormGroup;
    volumeForm: FormGroup;
    company: Company;
    departaments: DepartamentList;
    documents: DocumentList;
    storehouses: any;
    id: String;
    moviment: Moviment;
    archives: ArchivesList;
    volumes: VolumeList;
    changeUp = false;
    hiddenReference: Boolean = true;
    public loading: Boolean = false;
    permissionEdit = false;
    permissionDelete = false;
    page = new Page();
    pageVolumes = new Page();
    pageArchives = new Page();
    selected: any = [];
    selectedVolumes: any = [];
    selectedArchives: any = [];
    services: any = [];
    servicesList: any = [];
    focusDepartament$ = new Subject<string>();
    clickDepartament$ = new Subject<string>();
    focusDocument$ = new Subject<string>();
    clickDocument$ = new Subject<string>();
    focusStorehouse$ = new Subject<string>();
    clickStorehouse$ = new Subject<string>();
    countMove = {
        box: 0,
        container: 0,
        mapoteca: 0,
        gaveta: 0,
        totalArchiveMove: 0
    };
    // isUsers = false;

    constructor(
        private route: ActivatedRoute,
        private storeHousesSrv: StorehousesService,
        private departamentsSrv: DepartamentsService,
        private movimentsSrv: MovimentsService,
        private companiesSrv: CompaniesService,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private warningMsg: WarningMessagesService,
        private fb: FormBuilder,
        private modalService: NgbModal,
        public modal: NgbActiveModal,
        private _route: Router,
        private utilCase: CaseInsensitive,
        private introService: IntroJsService,

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
            emergency: this.fb.control({ value: false, disabled: true }),
            moveVolume: this.fb.control({ value: false, disabled: true }),
            moveArchive: this.fb.control({ value: false, disabled: true }),
            digital: this.fb.control({ value: false }),
            delivery: this.fb.control({ value: false, disabled: true }),
            withdraw: this.fb.control({ value: false, disabled: true }),
            low: this.fb.control({ value: false, disabled: true }),
            loan: this.fb.control({ value: false, disabled: true }),
            nr: this.fb.control({ value: '' })
        });

        this.archiveForm = this.fb.group({
            document: this.fb.control(''),
            storehouse: this.fb.control(''),
            location: this.fb.control(''),
            search: this.fb.control('')
        });

        this.volumeForm = this.fb.group({
            storehouse: this.fb.control(''),
            departament: this.fb.control(''),
            location: this.fb.control(''),
            reference: this.fb.control('')
        });

        this.serviceForm = this.fb.group({
            servicesDemand: this.fb.array(this.services),
        });

        this.processForm = this.fb.group({
            process: this.fb.control(''),
            date: this.fb.control('')
        });
    }

    ngOnInit() {
        this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
        this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
        this.getCompanies();
        this.loading = true;
        this.id = this.route.snapshot.paramMap.get('id');
        this.getMoviment();
        this.getDepartaments();
        this.getStorehouses();
        this.getDocuments();
        this.getServices();
        this.addService();
        this.getCountMove();

    }

    createService(): FormGroup {
        return this.fb.group({
            quantityItem: this.fb.control('', Validators.required),
            itemValue: this.fb.control('', Validators.required),
            totalItem: this.fb.control('', Validators.required),
            item: ''// this.fb.control('', Validators.required)
        });
    }

    addService(): void {
        this.services = this.serviceForm.get('servicesDemand') as FormArray;
        this.services.push(this.createService());
    }

    removeService(e) {
        this.services.removeAt(e);
    }

    returnValueItem(serviceI) {
        // console.log(serviceI);
        serviceI.patchValue({
            quantityItem: serviceI.value.quantityItem,
            itemValue: serviceI.value.item.price ? serviceI.value.item.price.toFixed(2) : 0,
        });
    }

    returnTotal(serviceI: FormGroup) {
        const total = serviceI.value ? serviceI.value.item ? serviceI.value.item.price && serviceI.value.quantityItem ? serviceI.value.item.price * serviceI.value.quantityItem : 0 : 0 : 0;
        serviceI.patchValue({
            quantityItem: serviceI.value.quantityItem,
            totalItem: total ? total.toFixed(2) : 0,
            itemValue: serviceI.value.item.price ? serviceI.value.item.price.toFixed(2) : 0,
        });
    }

    getServices() {
        this.movimentsSrv.services(this.id).subscribe(data => {
            this.servicesList = data;
        }, error => {
            console.log('ERROR', error);
        });
    }

    formatterService = (x: { description: string }) => x.description;

    serviceIpt(i) {
        return (<FormGroup>this.serviceForm.get('servicesDemand')).controls[i].get('item');
    }

    quantityItemIpt(i) {
        return (<FormGroup>this.serviceForm.get('servicesDemand')).controls[i].get('quantityItem');
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
                    emergency: this.moviment.emergency ? 'Emergêncial' : '',
                    moveVolume: this.moviment.moveVolume ? 'Caixas' : '',
                    moveArchive: this.moviment.moveArchive ? 'Arquivos' : '',
                    digital: this.moviment.digital ? 'Digital' : '',
                    delivery: this.moviment.delivery ? 'Entrega' : '',
                    withdraw: this.moviment.withdraw ? 'Retirada' : '',
                    low: this.moviment.low ? 'Baixo' : '',
                    loan: this.moviment.loan ? 'Empréstimo' : '',
                    nr: this.moviment.nr
                });
            }, error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    delivery() {
        if (this.moviment.withdraw) {
            return 'Retirada';
        } else if (this.moviment.delivery) {
            return 'Entrega';
        } else {
            return 'Digital';
        }
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

    returnArchiveId(object) {
        const result = _.filter(this.archiveForm.value[object], function (value, key) {
            if (key === '_id') { return value; }
        })[0];
        return result;
    }

    searchItensArchives(pageInfo = null) {
        this.loading = true;

        if (pageInfo && pageInfo.offset) {
            this.pageArchives.pageNumber = pageInfo.offset;
        } else {
            this.pageArchives.pageNumber = 0;
        }


        const newSearch = {
            doct: null,
            storehouse: null,
            location: null,
            search: null
        };
        // this.localStorageSrv.save('moviment', this.searchForm.value);
        this.archiveForm.value.document ? newSearch.doct = this.returnArchiveId('document') : null;
        this.archiveForm.value.storehouse ? newSearch.storehouse = this.returnArchiveId('storehouse') : null;
        this.archiveForm.value.location ? newSearch.location = this.archiveForm.value.location : null;
        this.archiveForm.value.search ? newSearch.search = this.archiveForm.value.search : null;

        const searchValue = _.omitBy(newSearch, _.isNil);

        this.movimentsSrv.showItensArchives(this.id, searchValue, this.pageArchives).subscribe(data => {
            this.archives = data;
            this.pageArchives.pageNumber = data._links.currentPage;
            this.pageArchives.totalElements = data._links.foundItems;
            this.pageArchives.size = data._links.totalPage;
            this.loading = false;
        }, error => {
            this.loading = false;
            this.errorMsg.errorMessages(error);
            console.log('ERROR:', error);
        });
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

    getDocuments() {
        this.movimentsSrv.documents(this.id).subscribe(data => {
            this.documents = data.items;
        }, error => {
            this.errorMsg.errorMessages(error);
            console.log('ERROR: ', error);
            this.loading = false;
        });
    }

    /* onSelect({ selected }) {
      console.log(selected)
      selected.splice(0, this.selected.length);
      this.selected.push(...selected);
    } */

    onSelectVolumes({ selected }) {
        this.selectedVolumes = selected;
    }


    onSelectArchives({ selected }) {
        this.selectedArchives = selected;
    }

    getDepartaments() {
        this.movimentsSrv.departaments(this.id).subscribe(data => {
            this.departaments = data.items;
        }, error => {
            this.errorMsg.errorMessages(error);
            console.log('ERROR: ', error);
            this.loading = false;
        });
    }

    getStorehouses() {
        this.storeHousesSrv.searchStorehouses().subscribe(data => {
            this.storehouses = data.items;
        }, error => {
            this.errorMsg.errorMessages(error);
            console.log('ERROR: ', error);
            this.loading = false;
        });
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

    searchDocument = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickDocument$.pipe(filter(() => !this.instanceDocument.isPopupOpen()));
        const inputFocus$ = this.focusDocument$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(document => (document === '' ? this.documents
                : _.filter(this.documents, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(document.toLowerCase())) > -1).slice(0, 10)
            )));
    }

    searchService = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(service => {
                let res;
                if (service.length < 2) { []; } else { res = _.filter(this.servicesList, v => (this.utilCase.replaceSpecialChars(v.description).toLowerCase().indexOf(service.toLowerCase())) > -1).slice(0, 10); }
                return res;
            })
        )

    searchStorehouse = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickStorehouse$.pipe(filter(() => !this.instanceStorehouse.isPopupOpen()));
        const inputFocus$ = this.focusStorehouse$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(storehouse => {
                let res = [];
                if (storehouse.length < 0) {
                    [];
                } else {
                    res = _.filter(this.storehouses,
                        v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(storehouse.toLowerCase())) > -1).slice(0, 10);
                }
                return res;
            }));
    }

    showItensVolumes(pageInfo = null) {
        const selectedItens = [];
        this.loading = true;
        this.pageVolumes.pageNumber = pageInfo ? pageInfo.offset ? pageInfo.offset : 0 : 0;

        const volumeForm = {
            departament: this.volumeForm.value.departament ? this.volumeForm.value.departament._id : '',
            storehouse: this.volumeForm.value.storehouse ? this.volumeForm.value.storehouse._id : '',
            reference: this.volumeForm.value.reference ? this.volumeForm.value.reference : '',
            location: this.volumeForm.value.location ? this.volumeForm.value.location : '',
        };

        this.movimentsSrv.showItensVolumes(this.moviment._id, volumeForm, this.pageVolumes).subscribe(data => {

            this.loading = false;
            this.volumes = data;

            this.pageVolumes.pageNumber = data._links.currentPage;
            this.pageVolumes.totalElements = data._links.foundItems;
            this.pageVolumes.size = data._links.totalPage;
            this.selected = [];
            if (data.items.length === 0) {
                this.warningMsg.showWarning('Lista de Volumes vazia', 50000);
            }
        }, error => {
            this.loading = false;
            console.log('ERROR', error);
        });
    }

    removeVolumes() {
        const ids = [];
        this.selected = [];
        this.selectedVolumes.forEach(element => {
            ids.push(element._id);
        });
        this.movimentsSrv.removeMoviment(this.moviment._id, ids).subscribe(data => {
            this.showItensVolumes();
            this.selectedVolumes = [];
            this.successMsgSrv.successMessages(data.message);
        }, error => {
            console.log('ERROR: ', error);
        });
    }

    removeArchives() {
        const ids = [];
        this.selectedArchives.forEach(element => {
            ids.push(element._id);
        });
        this.movimentsSrv.removeMoviment(this.moviment._id, ids).subscribe(data => {



            this.selected = [];
            this.searchItensArchives();
            this.selectedArchives = [];
            this.successMsgSrv.successMessages(data.message);
        }, error => {
            console.log('ERROR: ', error);
        });
    }

    beforeChange(data) {
        if (data.nextId === 'tab2') {
            this.searchItensArchives();
        } else if (data.nextId === 'tab3') {
            this.showItensVolumes();
        }
    }

    processMoviment() {
        this.loading = true;
        const form = { servicesDemand: [], totalValueDemand: 0 };
        this.serviceForm.value.servicesDemand.map(item => {
            form.servicesDemand.push({
                item: item.item.description,
                quantityItem: item.quantityItem,
                itemValue: item.itemValue,
                totalItem: Number(item.totalItem)
            });
            form.totalValueDemand = form.totalValueDemand + Number(item.totalItem);
        });

        this.movimentsSrv.processMove(
            this.moviment._id, form
        ).subscribe(data => {
            this.getMoviment();
            this.loading = false;
            this.successMsgSrv.successMessages('Movimentação processada.');
        }, error => {
            this.loading = false;
            this.errorMsg.errorMessages(error);
            console.log('ERROR: ', error);
        });
    }

    getCountMove() {
        this.movimentsSrv.countMove(this.id).subscribe(data => {
            this.countMove = data;
        }, error => {
            console.log('ERROR: ', error);
            this.errorMsg.errorMessages(error);
        });
    }

    isCheckable(status) {
        console.log(status);
        let isCheckable = false;
        switch (status[0]) {
            case 'BAIXADO':
                isCheckable = true;
                break;
            case 'EMPRESTADO':
                isCheckable = false;
                break;
            case 'ATIVO':
                isCheckable = true;
                break;
        }
        return isCheckable;
    }


    extract() {
        const url = this._route.serializeUrl(
            this._route.createUrlTree(['/moviment-extract', this.moviment._id])
        );

        window.open(url, '_blank');
        // window.open(`/moviment-extract/${}`, '_blank')
    }

    devolutionOrLowArchives() {
        this.loading = true;
        const itens = [];
        this.selected = [];
        this.selectedArchives.map(item => {
            itens.push(item._id);
        });
        if (this.processForm.value.process === 'devolution') {
            this.movimentsSrv.devolutions(this.moviment._id, { itens: itens, dateAction: moment(this.processForm.value.date).format('DD/MM/YYYY') }).subscribe(
                data => {
                    console.log(data);
                    this.successMsgSrv.successMessages(data.message);
                    this.selected = [];
                    this.getMoviment();
                    this.searchItensArchives();
                    this.selectedArchives = [];
                    this.loading = false;
                }, error => {
                    this.loading = false;
                    console.log('ERROR: ', error);
                    this.errorMsg.errorMessages(error);
                }
            );
        } else if (this.processForm.value.process === 'low') {
            this.movimentsSrv.lows(this.moviment._id, { itens: itens, dateAction: moment(this.processForm.value.date).format('DD/MM/YYYY') }).subscribe(
                data => {
                    console.log(data);
                    this.successMsgSrv.successMessages(data.message);
                    this.selected = [];
                    this.getMoviment();
                    this.searchItensArchives();
                    this.loading = false;
                }, error => {
                    this.loading = false;
                    console.log('ERROR: ', error);
                    this.errorMsg.errorMessages(error);
                }
            );
        } else {
            this.warningMsg.showWarning('Selecione um tipo de processo.', 5000);
        }
    }

    devolutionOrLowVolumes() {
        this.loading = true;
        const itens = [];
        this.selected = [];
        this.selectedVolumes.map(item => {
            itens.push(item._id);
        });
        if (this.processForm.value.process === 'devolution') {
            this.movimentsSrv.devolutions(this.moviment._id, { itens: itens, dateAction: moment(this.processForm.value.date).format('DD/MM/YYYY') }).subscribe(
                data => {
                    console.log(data);
                    this.successMsgSrv.successMessages(data.message);
                    this.getMoviment();

                    this.loading = false;
                    this.selectedVolumes = [];
                    this.showItensVolumes();


                }, error => {
                    this.loading = false;
                    console.log('ERROR: ', error);
                    this.errorMsg.errorMessages(error);
                }
            );
        } else {
            this.movimentsSrv.lows(this.moviment._id, { itens: itens, dateAction: moment(this.processForm.value.date).format('DD/MM/YYYY') }).subscribe(
                data => {
                    this.selectedVolumes = [];
                    console.log(data);
                    this.successMsgSrv.successMessages(data.message);
                    this.getMoviment();
                    this.loading = false;
                    this.selectedVolumes = [];
                    this.showItensVolumes();

                }, error => {
                    this.loading = false;
                    console.log('ERROR: ', error);
                    this.errorMsg.errorMessages(error);
                }
            );
        }
    }

    help() {
        this.introService.ShowMoviments();
    }
}
