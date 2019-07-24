import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { CompaniesList, Company } from 'src/app/models/company';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from 'src/app/router.animations';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { StorehousesList, Storehouse } from 'src/app/models/storehouse';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  storeHouses: StorehousesList;
  storeHouse: Storehouse;

  constructor(
    private storeHousesSrv: StorehousesService,
    private companiesSrv: CompaniesService,
    private errorMsg: ErrorMessagesService,
    private fb: FormBuilder,
  ) {
    this.volumeForm = this.fb.group({
      companie: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      guardType: this.fb.control('', [Validators.required]),
      volumeType: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit() {
    this.getCompanies();
    this.getStoreHouses();
  }

  getCompanies() {
    this.companiesSrv.companies(null).subscribe(data => {
      this.companies = data;
    }, (error) => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    });
  }

  getStoreHouses() {
    this.storeHousesSrv.storeHouses(null).subscribe(data => {
      this.storeHouses = data;
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

  postVolume() {
    console.log('company', this.company)
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )
}
