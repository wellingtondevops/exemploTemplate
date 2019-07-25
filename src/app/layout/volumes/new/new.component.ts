import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { CompaniesList, Company } from 'src/app/models/company';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from 'src/app/router.animations';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { StorehousesList, Storehouse } from 'src/app/models/storehouse';
import { debounceTime, distinctUntilChanged, map, reduce } from 'rxjs/operators';
import { Observable } from 'rxjs';
import _ from 'lodash';
import { VolumeTypeEnum } from 'src/app/models/volume.type.enum';

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
  companies: CompaniesList;
  volumeForm: FormGroup;
  company: Company;
  storeHouses: any = [];
  volumeTypeList: any = [];
  storeHouse: Storehouse;

  constructor(
    private storeHousesSrv: StorehousesService,
    private companiesSrv: CompaniesService,
    private errorMsg: ErrorMessagesService,
    private fb: FormBuilder,
  ) {

    this.volumeTypeList = VolumeTypeEnum;

    this.volumeForm = this.fb.group({
      storehouse: this.fb.control('', [Validators.required]),
      company: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      guardType: this.fb.control('', [Validators.required]),
      volumeType: this.fb.control('', [Validators.required])
    });
  }

  get volumeType() { return this.volumeForm.get('volumeType'); }

  ngOnInit() {
    this.getCompanies();
    this.getStoreHouses();
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

  selectEvent(item) {
    console.log('selectEvent', item);
    this.company = item;
    // do something with selected item
  }

  onChangeSearch(val: string) {
    console.log('onChangeSearch', val);
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    console.log('onFocused', e);
    // do something when input is focused
  }

  onFocusedStoreHouse(e) {
    console.log('onFocused', e);
    // do something when input is focused
  }

  selectStoreHouse(item) {
    console.log('selectStoreHouse', item);
    this.storeHouse = item;
  }

  onChangeSearchStoreHouse(val: string){
    console.log('onChangeSearchStoreHouse', val);
  }

  returnId(object) {
    this.volumeForm.value[object] = _.filter(this.volumeForm.value[object], function(value, key) {
      if(key === '_id') return value;
    })[0];
  }

  postVolume() {
    this.returnId('company')
    this.returnId('storehouse')
    console.log('volumeForm', this.volumeForm.value)
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
    map(company => company.length < 2 ? []
      : _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10)),
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