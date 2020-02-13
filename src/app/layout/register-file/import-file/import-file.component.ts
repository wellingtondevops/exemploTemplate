import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import * as XLSX from 'ts-xlsx';
import { Observable } from 'rxjs';
import { routerTransition } from 'src/app/router.animations';
import { Doctype } from 'src/app/models/doctype';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { DoctypesService } from 'src/app/services/doctypes/doctypes.service';
import { RegistersService } from 'src/app/services/registers/registers.service';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import _ from 'lodash';
import { ArquivesService } from 'src/app/services/archives/archives.service';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.scss'],
  animations: [routerTransition()]
})
export class ImportFileComponent implements OnInit {
  file: File | null = null;
  importFileForm: FormGroup;
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
  typeDocuments: Doctype[];

  constructor(
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private companiesSrv: CompaniesService,
    private storeHousesSrv: StorehousesService,
    private volumesSrv: VolumesService,
    private documentsSrv: DocumentsService,
    private registerSrv: RegistersService,
    private doctypesSrv: DoctypesService,
    private departamentsSrv: DepartamentsService,
    private archivesSrv: ArquivesService,
  ) {
    this.importFileForm = this.fb.group({
      company: this.fb.control('', [Validators.required]),
      storehouse: this.fb.control('', [Validators.required]),
      doct: this.fb.control('', [Validators.required]),
      departament: this.fb.control('', [Validators.required])
    })
  }

  ngOnInit() {
    this.getCompanies();
    this.getTypeDocuments();
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

  getTypeDocuments() {
    this.doctypesSrv.listdocts().subscribe(data => {
      this.typeDocuments = data.items;
    })
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
    this.storeHousesSrv.searchStorehouses().subscribe(
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
    if (column_array_length === label_array_length) return true;
    return false;
  }

  // file select
  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList = null) {
    this.loading = true;
    if (event) {
      // this.nameFile = event.item(0).name;
      const file = event && event.item(0);
      if (!file.name.match(/\.(xls|xlsx|XLS|XLSX)$/)) {
        // this.removeFile();
        var error = {
          status: 404,
          message: 'Formato de arquivo não suportado.'
        }
        this.errorMsg.showError(error);

      } else {
        this.file = file;
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, { type: "binary" });
          // nome da aba
          var first_sheet_name = workbook.SheetNames[0];
          // nome das colunas (primeira linha)
          var first_row = workbook.SheetNames[1];
          // console.log(first_row)
          var worksheet = workbook.Sheets[first_sheet_name];
          //console.log('worksheet',worksheet);
          this.columns = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
          // I want to get top row only.
          // console.log(XLSX.utils.decode_row('A1')); 
          this.workbook = worksheet;
          var item = XLSX.utils.sheet_to_json(worksheet, { raw: true })
          item.map(row => {
            this.rowsFile.push(row);
          })
        }
        fileReader.readAsArrayBuffer(this.file);
      }
    }
    this.loading = false;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(storehouse =>
        storehouse.length < 2
          ? []
          : _.filter(this.storeHouses, v => v.name.toLowerCase().indexOf(storehouse.toLowerCase()) > -1).slice(0, 10)
      )
    );

  searchTypeDocument = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(typeDocument => {
        var res;
        if (typeDocument.length < 2) [];
        else res = _.filter(this.typeDocuments, v => v.name.toLowerCase().indexOf(typeDocument.toLowerCase()) > -1).slice(0, 10);
        return res;
      })
    );

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        var res = [];
        if (company.length < 2) [];
        else res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
        if (res.length > 0) {
          this.getDepartaments(res[0]._id);
        }
        return res;
      })
    );

  selectTypeDocument(data) {
    this.loading = true;
    this.documentsSrv.document(data.item._id).subscribe(data => {
      this.document = data;
      this.document.label.map(item => {
        this.labels.push(item.namefield);
      })
      this.loading = false;
    }, error => {
      console.log('ERROR: ', error);
      this.errorMsg.errorMessages(error);
    })
  }

  searchDepartament = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(departament =>
        departament.length < 2
          ? []
          : _.filter(this.departaments, v => v.name.toLowerCase().indexOf(departament.toLowerCase()) > -1).slice(0, 10)
      )
    );


  checkColumnsAndLabels(columns, labels) {
    columns.map(item => {
      var contain = _.indexOf(labels, item);
      if (contain === 0) return false;
    });
    return true;
  }

  returnId(object) {
    this.importFileForm.value[object] = _.filter(this.importFileForm.value[object], function (value, key) {
      if (key === '_id') return value;
    })[0];
  }

  postImportArchive() {

    this.returnId('company');
    this.returnId('storehouse');
    this.returnId('departament');
    this.returnId('doct');
    this.rowsFile.map(item => {
      this.postArquive(item);
    })
  }

  getVolume(location) {
    var page = {
      pageNumber: 0
    }
    return new Promise((resolve, reject) => {
      this.volumesSrv.searchVolumes(location, page).subscribe(res => {
        var getVolume = res.items[0]
        if (res.items[0] && location.location === getVolume.location) {
          // location = getVolume._id;
          return resolve(getVolume._id)
        } else {
          this.loading = false;
          this.errorMsg.showError({ message: `O volume ${location.location} não foi encontrado, cadastre o volume.`, status: 404 });
          return reject('Volume não encontrado');
        }
      }, (error) => {
        console.log(`ERROR`, error);
        this.loading = false;
        return reject(error)
        
      })
    })
  }

  async postArquive(data) {
    this.loading = true;
    let volume = data.LOCALIZACAO;
    var newRow = _.omit(data, ['LOCALIZACAO']);

    var volume_id = await this.getVolume({location: data.LOCALIZACAO});
    if (volume_id) {
      var checkColumnsAndLabelsLength = this.checkLengthColumnsAndLabels(this.columns.length, this.labels.length);
      if (!checkColumnsAndLabelsLength) return this.errorMsg.showError({ message: 'As colunas não corresponde aos dados do documento, verifique o arquivo importado', status: 404 });
      var checkColumnsAndLabels = this.checkColumnsAndLabels(this.columns, this.labels);
      if (!checkColumnsAndLabels) return this.errorMsg.showError({ message: 'As colunas não corresponde aos dados do documento, verifique o arquivo importado', status: 404 });

      const tag = _.values(newRow);
      let uniqueness = '';
      let labelsTrueLength = _.filter(this.document.label, ['uniq', true])
      this.document.label.map((label, i) => {
        if (label.uniq) {
          if (i === (labelsTrueLength.length - 1)) {
            uniqueness += `${tag[i]}`
          } else {
            uniqueness += `${tag[i]}-`
          }
        }
      })
      const { company, doct, storehouse, departament } = this.importFileForm.value;
       this.archivesSrv.newArchive({ tag, company, departament, doct, storehouse, uniqueness, volume: volume_id }).subscribe(res => {
        if (res._id) {
          this.loading = false;
          this.successMsgSrv.successMessages('Arquivo indexado com sucesso.');
        }
      }, error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
        this.errorsToPostArchive.push(error);
      })
    }
  }
}
