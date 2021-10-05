import { Component, OnInit, HostListener, Pipe, PipeTransform } from '@angular/core';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import * as XLSX from 'ts-xlsx';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Storehouse } from 'src/app/models/storehouse';
import { VolumeTypeEnum } from 'src/app/models/volume.type.enum';
import { GuardyTypeVolumeEnum } from 'src/app/models/guardtype.volume.enum';
import { StatusVolumeEnum } from 'src/app/models/status.volume.enum';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { routerTransition } from 'src/app/router.animations';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
const url = environment.apiUrl;
import _ from 'lodash';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';


@Component({
  selector: 'app-import-volume',
  templateUrl: './import-volume.component.html',
  styleUrls: ['./import-volume.component.scss'],
  animations: [routerTransition()]
})
export class ImportVolumeComponent implements OnInit {
  file: File | null = null;
  nameFile: string;
  arrayBuffer: any;
  companies: any = [];
  volumeForm: FormGroup;
  storeHouses: any = [];
  volumeTypeList: any = [];
  guardTypeList: any = [];
  statusList: any = [];
  storeHouse: Storehouse;
  departaments: any = [];
  loading: Boolean = true;
  rowsFile: any = [];
  hiddenReference = true;
  openCardStatus: boolean = false;
  uploadResponse: any = { status: 'progress', message: 0 };
  savedFile = false;
  errorUpload: boolean = null;
  urlErrors: string;
  importedSuccess: number = 0;
  errorsImported: number = 0;

  constructor(
    private errorMsg: ErrorMessagesService,
    private storeHousesSrv: StorehousesService,
    private departamentsSrv: DepartamentsService,
    private volumesSrv: VolumesService,
    private companiesSrv: CompaniesService,
    private successMsgSrv: SuccessMessagesService,
    private fb: FormBuilder,
    private utilCase: CaseInsensitive
  ) {
    this.statusList = StatusVolumeEnum;
    this.volumeTypeList = VolumeTypeEnum;
    this.guardTypeList = GuardyTypeVolumeEnum;

    this.volumeForm = this.fb.group({
      storehouse: this.fb.control('', [Validators.required]),
      company: this.fb.control('', [Validators.required]),
      guardType: this.fb.control('', [Validators.required]),
      volumeType: this.fb.control('', [Validators.required]),
      departament: this.fb.control(null),
      volumes: this.fb.control(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.getCompanies();
    this.getStoreHouses();
  }
  get volumes() {
    return this.volumeForm.get('volumes');
  }
  get volumeType() {
    return this.volumeForm.get('volumeType');
  }
  get guardType() {
    return this.volumeForm.get('guardType');
  }
  get description() {
    return this.volumeForm.get('description');
  }
  get storehouse() {
    return this.volumeForm.get('storehouse');
  }
  get departament() {
    return this.volumeForm.get('departament');
  }
  get company() {
    return this.volumeForm.get('company');
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList = null) {
    if (event) {
      this.nameFile = event.item(0).name;
      const file = event && event.item(0);
      if (!file.name.match(/\.(xls|xlsx|XLS|XLSX)$/)) {
        this.removeFile();
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
          for (let i = 0; i != data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
          const bstr = arr.join('');
          const workbook = XLSX.read(bstr, { type: 'binary' });
          const first_sheet_name = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[first_sheet_name];
          const item = XLSX.utils.sheet_to_json(worksheet, { raw: true });
          item.map(row => {
            this.rowsFile.push(row);
          });
        };
        fileReader.readAsArrayBuffer(this.file);
      }
    }
  }


  returnId(object) {
    return _.filter(this.volumeForm.value[object], function (value, key) {
      if (key === '_id') { return value; }
    })[0];
  }

  postVolume() {
    this.loading = true;
    const company = this.returnId('company');
    const storehouse = this.returnId('storehouse');
    const departament = this.returnId('departament');
    const volumeType = this.volumeForm.value.volumeType;
    const guardType = this.volumeForm.value.guardType;


    this.submit(company, storehouse, departament, volumeType, guardType);
    this.loading = false;

  }
  submit(company, storehouse, departament, volumeType, guardType) {
    const formData = new FormData();
      formData.append('file', this.file);
    formData.append('storehouse', storehouse);
    formData.append('departament', departament);
    formData.append('company', company);
    formData.append('volumeType', volumeType);
    formData.append('guardType', guardType);

    console.log(formData);
    this.volumesSrv.import(formData).subscribe(data => {
      console.log(data);
      if (data.status && data.status === 'progress') {
        this.uploadResponse.message = data.message;
        this.uploadResponse.status = data.status;
        this.errorUpload = false;
      }
      if (Array(data)) {
        this.savedFile = true;
        this.successMsgSrv.successMessages('Upload realizado com sucesso.');
      }
    }, error => {
      this.loading = false;
      this.uploadResponse.message = 10;
      this.uploadResponse.status = 'progress';
      this.errorUpload = true;
      this.errorMsg.errorMessages(error);
      console.log('ERROR ', error);
    });
    }

  changeGuardType() {
    switch (this.volumeForm.value.guardType) {
      case 'SIMPLES':
        this.hiddenReference = false;
        break;
      case 'GERENCIADA':
        this.hiddenReference = true;
        break;
    }
  }

  removeFile() {
    // this.host.nativeElement.value = '';
    this.file = null;
    this.nameFile = null;
  }

  selectedCompany(e) {
    if (e && e.item && e.item._id) {
      this.getDepartament(e.item._id);
    } else {
      this.getDepartament(e);
    }
  }

  getCompanies() {
    this.companiesSrv.searchCompanies().subscribe(
      data => {
        this.companies = data.items;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

  closeModalImport(data) {
    console.log('closeModalImport', data)
    this.openCardStatus = data;
  }

  getStoreHouses() {
    this.storeHousesSrv.searchStorehouses().subscribe(
      data => {
        this.loading = false;
        this.storeHouses = data.items;
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

  getDepartament(id) {
    this.departamentsSrv.searchDepartaments(id).subscribe(
      data => {
        this.departaments = data.items;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(storehouse =>
        storehouse.length < 2
          ? []
          : _.filter(this.storeHouses, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(storehouse.toLowerCase())) > -1).slice(0, 10)
      )
    )

  formatter = (x: { name: string }) => x.name;

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        let res;
        if (company.length < 2) {
          res = [];
        } else {
          res = _.filter(this.companies, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10);
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
        if (departament.length < 2) {
          res = [];
        } else {
          res = _.filter(this.departaments, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(departament.toLowerCase())) > -1).slice(0, 10);
        }
        return res;
      })
    )
}
/* @Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    const keys = Object.keys(data);
    return keys.slice(keys.length / 2);
  }
} */
