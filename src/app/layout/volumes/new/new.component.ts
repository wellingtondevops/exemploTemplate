import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { CompaniesList, Company } from 'src/app/models/company';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from 'src/app/router.animations';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { StorehousesList, Storehouse } from 'src/app/models/storehouse';
import { debounceTime, distinctUntilChanged, map, reduce, tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import _ from 'lodash';
import { VolumeTypeEnum } from 'src/app/models/volume.type.enum';
import { GuardyTypeVolumeEnum } from 'src/app/models/guardtype.volume.enum';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  animations: [routerTransition()]
})
export class NewComponent implements OnInit {
  companies: any = [];
  volumeForm: FormGroup;
  company: Company;
  storeHouses: any = [];
  volumeTypeList: any = [];
  guardTypeList: any = [];
  storeHouse: Storehouse;
  departaments: any = [];

  constructor(
    private storeHousesSrv: StorehousesService,
    private departamentsSrv: DepartamentsService,
    private volumesSrv: VolumesService,
    private companiesSrv: CompaniesService,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private fb: FormBuilder,
  ) {

    this.volumeTypeList = VolumeTypeEnum;
    this.guardTypeList = GuardyTypeVolumeEnum;

    this.volumeForm = this.fb.group({
      storehouse: this.fb.control('', [Validators.required]),
      company: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      guardType: this.fb.control('', [Validators.required]),
      volumeType: this.fb.control('', [Validators.required]),
      departament: this.fb.control('', [Validators.required]),
      uniqueField: this.fb.control(''),
      location: this.fb.control('', [Validators.required])
    });
  }

  get description() { return this.volumeForm.get('description'); }
  get location() { return this.volumeForm.get('location'); }
  get volumeType() { return this.volumeForm.get('volumeType'); }
  get guardType() { return this.volumeForm.get('guardType'); }

  ngOnInit() {
    this.getCompanies();
    this.getStoreHouses();
  }

  returnUniqField(){
    return `${this.volumeForm.value.storeHouse}${this.volumeForm.value.company}`
  }

  getCompanies() {
    this.companiesSrv.companies(null).subscribe(data => {
      this.companies = data.items;
    }, (error) => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    });
  }

  getStoreHouses() {
    this.storeHousesSrv.storeHouses(null).subscribe(data => {
      this.storeHouses = data.items;
    }, (error) => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    });
  }

  getDepartament(id){
    this.departamentsSrv.departaments(null, id).subscribe(data => {
      console.log('departaments',data)
      this.departaments = data.items;
    }, (error) => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    });
  }

  returnId(object) {
    this.volumeForm.value[object] = _.filter(this.volumeForm.value[object], function(value, key) {
      if(key === '_id') return value;
    })[0];
  }

  postVolume() {
    this.returnId('company')
    this.returnId('storehouse')
    this.volumeForm.value.uniqueField = this.returnUniqField();
    console.log('volumeForm', this.volumeForm.value)
    this.volumesSrv.newVolume(this.volumeForm.value).subscribe(
      data => {
        if (data._id) {
          this.successMsgSrv.successMessages('Usuário cadastrado com sucesso.');
        }
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      });
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(storehouse => storehouse.length < 2 ? []
      : _.filter(this.storeHouses, v => v.name.toLowerCase().indexOf(storehouse.toLowerCase()) > -1).slice(0, 10))
  )

  formatter = (x: {name: string}) => x.name;

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        var res;
        if(company.length < 2) [] 
        else var res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10)
        this.getDepartament(this.volumeForm.value.company._id)
        return res;
      })
    )


  searchDepartament = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(departament => departament.length < 2 ? []
      : _.filter(this.departaments, v => v.name.toLowerCase().indexOf(departament.toLowerCase()) > -1).slice(0, 10))
  )
  
}
@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    const keys = Object.keys(data);
    return keys.slice(keys.length / 2);
  }
}