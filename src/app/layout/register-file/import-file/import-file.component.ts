import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import * as XLSX from 'ts-xlsx';
import { Observable, Subject, merge } from 'rxjs';
import { routerTransition } from 'src/app/router.animations';
import { Doctype } from 'src/app/models/doctype';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { RegistersService } from 'src/app/services/registers/registers.service';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
const url = environment.apiUrl;
import _ from 'lodash';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { FilesService } from 'src/app/services/files/files.service';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';

@Component({
    selector: 'app-import-file',
    templateUrl: './import-file.component.html',
    styleUrls: ['./import-file.component.scss'],
    animations: [routerTransition()]
})
export class ImportFileComponent implements OnInit {
    @ViewChild('instanceCompany', ) instanceCompany: NgbTypeahead;
    @ViewChild('instanceDepartament') instanceDepartament: NgbTypeahead;
    @ViewChild('instanceStorehouse', ) instanceStorehouse: NgbTypeahead;
    @ViewChild('instanceDocument', ) instanceDocument: NgbTypeahead;

    file: File | null = null;
    files: [File] | null = null;
    importFileForm: FormGroup;
    uploadResponse: any = { status: 'progress', message: 0 };
    nameFileXls: string;
    nameFile: string;
    savedFile = false;
    errorUpload: boolean = null;
    arrayBuffer: any;
    loading: Boolean = false;
    company_id: string;
    storeHouse_id: string;
    document: any;
    labels: any = [];
    workbook: any;
    departaments: any = [];
    columns: any = [];
    errorsToPostArchive: any = [];
    openCardStatus = false;
    urlErrors: string;
    importedSuccess = 0;
    errorsImported = 0;
    companies: any = {
        _links: {
            self: '',
            totalPage: 0,
            currentPage: 1,
            foundItems: 0,
            next: ''
        },
        items: []
    };
    rowsFile: any = [];
    storeHouses: any = [];
    typeDocuments: any = [];
    focusCompany$ = new Subject<string>();
    clickCompany$ = new Subject<string>();
    focusDepartament$ = new Subject<string>();
    clickDepartament$ = new Subject<string>();
    focusStorehouse$ = new Subject<string>();
    clickStorehouse$ = new Subject<string>();
    clickDocument$ = new Subject<string>();
    focusDocument$ = new Subject<string>();

    constructor(
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private companiesSrv: CompaniesService,
        private storeHousesSrv: StorehousesService,
        private volumesSrv: VolumesService,
        private documentsSrv: DocumentsService,
        private registerSrv: RegistersService,
        private departamentsSrv: DepartamentsService,
        private archivesSrv: ArquivesService,
        private filesSrv: FilesService,
        private utilCase: CaseInsensitive,
        private introService: IntroJsService,
    ) {
        this.importFileForm = this.fb.group({
            company: this.fb.control('', [Validators.required]),
            storehouse: this.fb.control('', [Validators.required]),
            doct: this.fb.control('', [Validators.required]),
            departament: this.fb.control('', [Validators.required]),
            retroDate: this.fb.control(false)
        });
    }

    ngOnInit() {
        this.getCompanies();
        this.getStoreHouses();
    }
    get company() {
        return this.importFileForm.get('company');
    }
    get storehouse() {
        return this.importFileForm.get('storehouse');
    }
    get departament() {
        return this.importFileForm.get('departament');
    }
    get doct() {
        return this.importFileForm.get('doct');
    }
    get retroDate() {
        return this.importFileForm.get('retroDate');
    }

    formatter = (x: { name: string }) => x.name;

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

    getTypeDocuments(company_id) {
        this.documentsSrv.searchDocuments(company_id).subscribe(
            data => {
                this.typeDocuments = data.items;
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
                this.loading = false;
            }
        );
    }

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

    getStoreHouses() {
        this.storeHousesSrv.searchStorehousesNoVirtual().subscribe(
            data => {
                this.loading = false;
                this.storeHouses = data.items;
            },
            error => {
                // this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
                this.loading = false;
            }
        );
    }

    checkLengthColumnsAndLabels(column_array_length, label_array_length) {
        // Add 1 por conta da localizacao (numero da caixa)
        label_array_length += 1;
        if (column_array_length === label_array_length) { return true; }
        return false;
    }

    // file select
    @HostListener('change', ['$event.target.files']) emitFiles(event: any = null) {
        if (event) {
            this.nameFileXls = event.item(0).name;
            const file = event && event.item(0);
            if (!file.name.match(/\.(xls|xlsx|XLS|XLSX)$/)) {
                // this.removeFile();
                const error = {
                    status: 404,
                    message: 'Formato de arquivo não suportado.'
                };
                this.errorMsg.showError(error);

            } else {
                this.file = file;
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    this.arrayBuffer = fileReader.result;
                    const data = new Uint8Array(this.arrayBuffer);
                    const arr = new Array();
                    for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
                    const bstr = arr.join('');
                    const workbook = XLSX.read(bstr, { type: 'binary' });
                    // nome da aba
                    const first_sheet_name = workbook.SheetNames[0];
                    // nome das colunas (primeira linha)
                    // console.log(first_row)
                    const worksheet = workbook.Sheets[first_sheet_name];
                    // console.log('worksheet',worksheet);
                    const item = XLSX.utils.sheet_to_json(worksheet, { raw: true });
                    item.map(row => {
                        this.rowsFile.push(row);
                    });
                };
                fileReader.readAsArrayBuffer(this.file);
            }
        }
    }

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
                    res = _.filter(this.storeHouses,
                        v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(storehouse.toLowerCase())) > -1).slice(0, 10);
                }
                return res;
            }));
    }

    searchTypeDocument = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickDocument$.pipe(filter(() => !this.instanceDocument.isPopupOpen()));
        const inputFocus$ = this.focusDocument$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(typeDocuments => {
                let res;
                if (typeDocuments.length < 0) {
                    [];
                } else {
                    res = _.filter(this.typeDocuments,
                        v =>
                            (this.utilCase.replaceSpecialChars(v.name)
                            .toLowerCase().indexOf(typeDocuments.toLowerCase())) > -1).slice(0, 10);
                }
                return res;
            })
        );
    }
    // text$.pipe(
    //     debounceTime(200),
    //     distinctUntilChanged(),
    //     map(typeDocument => {
    //         let res;
    //         if (typeDocument.length < ) { []; } else { res = _.filter(this.typeDocuments, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(typeDocument.toLowerCase())) > -1).slice(0, 10); }
    //         return res;
    //     })
    // )

    selectedCompany(e) {
        this.getTypeDocuments(e.item._id);
        this.getDepartaments(e.item._id);
    }

    searchCompany = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickCompany$.pipe(filter(() => !this.instanceCompany.isPopupOpen()));
        const inputFocus$ = this.focusCompany$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(company => {
                let res = [];
                if (company.length < 0) {
                    [];
                } else {
                    res = _.filter(this.companies,
                        v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10);
                }
                return res;
            })
        );
    }

    selectTypeDocument(company_id) {
        this.loading = true;
        this.documentsSrv.document(company_id).subscribe(data => {
            this.document = data;
            this.document.label.map(item => {
                this.labels.push(item.namefield);
            });
            this.loading = false;
        }, error => {
            console.log('ERROR: ', error);
            this.errorMsg.errorMessages(error);
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


    checkColumnsAndLabels(columns, labels) {
        columns.map(item => {
            const contain = _.indexOf(labels, item);
            if (contain === 0) { return false; }
        });
        return true;
    }

    returnId(object) {
        return _.filter(this.importFileForm.value[object], function (value, key) {
            if (key === '_id') { return value; }
        })[0];
    }

    postImportArchive() {
        const company = this.returnId('company');
        const storehouse = this.returnId('storehouse');
        const departament = this.returnId('departament');
        const doct = this.returnId('doct');
        const retroDate = this.importFileForm.get('retroDate').value;

        console.log('RETROATIVA: ', retroDate);
        this.submit(company, storehouse, departament, doct, retroDate);
    }

    submit(company, storehouse, departament, doct, retroDate) {
        // this.loading = true;
        console.log(company, storehouse, departament, doct, retroDate);
        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('company', company);
        formData.append('storehouse', storehouse);
        formData.append('departament', departament);
        formData.append('doct', doct);
        formData.append('retroDate', retroDate);

        this.archivesSrv.import(formData).subscribe(data => {
            console.log(data);
            if (data.status && data.status === 'progress') {
                this.uploadResponse.message = data.message;
                this.uploadResponse.status = data.status;
                this.errorUpload = false;
            }
            if (Array(data)) {
                this.savedFile = true;
                this.successMsgSrv.successMessages('Upload realizado com sucesso.');
                this.clearForm();
            }
        }, error => {
            this.loading = false;
            //      this.uploadResponse.message = 10;
            //    this.errorUpload = true;
            this.errorMsg.errorMessages(error);
            console.log('ERROR ', error);
        });
    }

    getVolume(location) {
        const page = {
            pageNumber: 0
        };
        return new Promise((resolve, reject) => {
            this.volumesSrv.searchVolumes(location, page).subscribe(res => {
                const getVolume = res.items[0];
                if (res.items[0] && location.location === getVolume.location) {
                    // location = getVolume._id;
                    return resolve(getVolume._id);
                } else {
                    this.loading = false;
                    this.errorMsg.showError({ message: `O volume ${location.location} não foi encontrado, cadastre o volume.`, status: 404 });
                    return reject('Volume não encontrado');
                }
            }, (error) => {
                console.log(`ERROR`, error);
                this.loading = false;
                return reject(error);

            });
        });
    }

    postArchiveNew(archives) {
        this.loading = true;
        this.archivesSrv.import(archives).subscribe(data => {
            this.loading = false;
        });
    }

    closeModalImport(data) {
        this.openCardStatus = data;
    }
    clearForm() {
        // this.archivesSrv.clear('position');
        this.importFileForm.patchValue({
            company: null,
            storehouse: null,
            departament: null,
            doct: null,
        });
    }

    help() {
        this.introService.importArchives();
    }

    /* async postArquive(data) {
      this.loading = true;
      const volume = data.LOCALIZACAO;
      const newRow = _.omit(data, ['LOCALIZACAO']);

      const volume_id = await this.getVolume({ location: data.LOCALIZACAO });
      if (volume_id) {
        const checkColumnsAndLabelsLength = this.checkLengthColumnsAndLabels(this.columns.length, this.labels.length);
        if (!checkColumnsAndLabelsLength) {
          this.loading = false
          return this.errorMsg.showError({ message: 'As colunas não corresponde aos dados do documento, verifique o arquivo importado', status: 404 });
        }
        const checkColumnsAndLabels = this.checkColumnsAndLabels(this.columns, this.labels);
        if (!checkColumnsAndLabels) {
          this.loading = false
          return this.errorMsg.showError({ message: 'As colunas não corresponde aos dados do documento, verifique o arquivo importado', status: 404 });
        }

        const tag = _.values(newRow);
        let uniqueness = '';
        const labelsTrueLength = _.filter(this.document.label, ['uniq', true]);
        this.document.label.map((label, i) => {
          if (label.uniq) {
            if (i === (labelsTrueLength.length - 1)) {
              uniqueness += `${tag[i]}`;
            } else {
              uniqueness += `${tag[i]}-`;
            }
          }
        });
        const { company, doct, storehouse, departament } = this.importFileForm.value;
        this.archivesSrv.newArchive({ tag, company, departament, doct, storehouse, uniqueness, volume: volume_id }).subscribe(res => {
          if (res._id) {
            this.successMsgSrv.successMessages('Arquivo indexado com sucesso.');
          }
        }, error => {
          this.errorMsg.errorMessages(error);
          console.log('ERROR: ', error);
          this.errorsToPostArchive.push(error);
        });
        this.loading = false
      }
    } */
}
